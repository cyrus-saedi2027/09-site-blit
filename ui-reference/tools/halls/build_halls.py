#!/usr/bin/env python3
"""
Builds the site's halls library from the «halls package» (150 halls with seat maps and map positions) and the list of cities.

  python3 -I build_halls.py <package dir> <cities-source.json> <out dir>

Writes into <out dir>:
  halls-data.js        the data the page embeds (GEO_DATA, HALLS_DATA, PLANS_JSON)
  halls-report.txt     what was checked and what was found (outliers, merged halls, zones)

What it does (the owner's rules, README «قواعد صاحب پروژه»):
  1. A hall without coordinates has no location (loc = null): no guessed position is ever made.
  2. Cities do not depend on halls or events: the whole city list is written, plus the five extra cities (رویان، زیراب،
     کلارآباد، طبل، کیش) as ordinary cities; a city that has a hall in the package is matched by its slug.
  3. Capacity = the seats of the map without the «outside_capacity» ones.
  4. One hall, several maps: halls that the package lists twice (same_hall_other_plans) become ONE hall with several layouts.
  5. The notes printed on a map and the «symbolic seat numbers» flag are kept (a symbolic section is sold by count).
Every layout is encoded in runs (about ten times smaller) and decoded again here: the build stops if a single cell differs.
"""
import json, glob, os, re, sys, math, collections

PK, CITIES_SRC, OUT = sys.argv[1].rstrip('/') + '/', sys.argv[2], sys.argv[3].rstrip('/') + '/'
os.makedirs(OUT, exist_ok=True)
rep = []
def say(*a):
    s = ' '.join(str(x) for x in a); rep.append(s); print(s)

# ───────────────────────────── the packages
halls_raw = {}
for f in glob.glob(PK + 'provinces/*/*/*/hall.json'):
    h = json.load(open(f, encoding='utf-8')); halls_raw[h['id']] = h
geo = json.load(open(PK + 'geo-tree.json', encoding='utf-8'))
nowloc = json.load(open(PK + 'halls-without-location.json', encoding='utf-8'))
extra_src = json.load(open(PK + 'new-cities-needed.json', encoding='utf-8'))
src = json.load(open(CITIES_SRC, encoding='utf-8'))
assert len(halls_raw) == 150, len(halls_raw)

# ───────────────────────────── provinces and cities
ALPHA = 'آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی'
def pkey(s):
    s = s.replace('‌', ' ').replace('ي', 'ی').replace('ك', 'ک')
    return [ALPHA.find(c) if c in ALPHA else (-1 if c == ' ' else 99) for c in s]
provinces = [(p['slug'], p['name']) for p in src['provinces']]
pidx = {s: i for i, (s, _) in enumerate(provinces)}
cities = {}                                    # slug -> dict
for c in src['cities']:
    cities[c['slug']] = {'slug': c['slug'], 'name': c['name'], 'p': pidx[c['province']], 'extra': 0, 'county': None}
assert len(cities) == len(src['cities'])
norm = lambda s: s.replace('‌', '').replace('ي', 'ی').replace('ك', 'ک').replace(' ', '').replace('-', '')
by_pname = collections.defaultdict(list)
for c in cities.values(): by_pname[(c['p'], norm(c['name']))].append(c)
pkg_cities = {}                                # package city slug -> (province slug, record)
for pv in geo['provinces']:
    for c in pv['cities']:
        pkg_cities[c['slug']] = (pv['slug'], c)
for h in halls_raw.values():
    pkg_cities[h['city']['slug']] = (h['province']['slug'], h['city'])
# the package's city is a county under another name (its Wikipedia title changed since the package's slug was made)
COUNTY_ALIAS = {'shahin-shahr-and-meymeh': 'شاهین\u200cشهر و میمه'}
matched, added = [], []
for slug, (pslug, c) in sorted(pkg_cities.items()):
    pi = pidx[pslug]
    if slug in cities:                          # same slug: the package's name wins (what the halls' site calls the place)
        rec = cities[slug]
        if norm(rec['name']) != norm(c['name']): rec['county'] = rec['name']; rec['name'] = c['name']
        matched.append(slug); continue
    if c.get('in_county_list'):                 # the county's own name differs (ماهشهر / بندر ماهشهر, قیدار / خدابنده)
        cn = c.get('county_name') or COUNTY_ALIAS.get(slug) or c['name']
        hit = by_pname.get((pi, norm(cn))) or by_pname.get((pi, norm(c['name'])))
        assert hit and len(hit) == 1, ('no county for', c)
        rec = hit[0]; del cities[rec['slug']]
        rec.update({'slug': slug, 'county': rec['name'] if norm(rec['name']) != norm(c['name']) else None, 'name': c['name']})
        cities[slug] = rec; matched.append(slug); continue
    cities[slug] = {'slug': slug, 'name': c['name'], 'p': pi, 'extra': 1, 'county': None}; added.append(slug)
say('cities: %d (counties %d, extra %d) — package cities matched by slug/county: %d, added as extra: %s' % (len(cities), len(cities) - len(added), len(added), len(matched), ' '.join(added)))
assert sorted(added) == sorted(c['slug'] for c in extra_src['cities']), ('the extra cities differ', added)
city_list = sorted(cities.values(), key=lambda c: (c['p'], pkey(c['name'])))

# ───────────────────────────── seats and layouts
def seats_in(rows, out):
    for row in rows:
        for c in row['cells']:
            if c['t'] == 'seat': out.append(c)
            elif c['t'] == 'block': seats_in(c['table']['rows'], out)
    return out

def class_of(name, order):
    n = name.strip(); low = n.lower()
    if n == 'خارج ظرفیت': return 'X'
    if 'vip' in low or 'ویژه' in n: return 'V'
    m = re.match(r'^(?:(?:همکف|بالکن)\s+)?([A-Za-z])\d*(?:\s|$)', n)   # «A», «همکف B2», «A وسط»: the letter is the class
    if m: return 'ABCDEFGH'[min('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.index(m.group(1).upper()), 7)]
    if n.startswith('همکف'): return 'A'
    if n.startswith('بالکن'): return 'C'
    if n.startswith('ورودی'): return 'D'
    return 'ABCDEFGH'[min(order, 7)]

def enc_rows(rows, zidx, label):
    out = []
    for row in rows:
        cells = row['cells']
        rs = [c.get('r') for c in cells if c['t'] == 'seat']
        rd = collections.Counter(rs).most_common(1)[0][0] if rs else None
        toks, i = [], 0
        while i < len(cells):
            c = cells[i]; t = c['t']
            if t == 'seat':
                n0, k0 = int(c['n']), c['k']
                assert str(n0) == c['n'], ('seat number', c['n'])
                fl = (1 if c.get('vip') else 0) | (2 if c.get('p') else 0) | (4 if c.get('outside_capacity') else 0)
                zi = zidx[c.get('pl') or label]
                run = [n0, 1, 1, k0, zi, fl, c.get('r')]; j = i + 1
                while j < len(cells) and cells[j]['t'] == 'seat':
                    d = cells[j]; dn = int(d['n']) - (n0 + (run[1] - 1) * run[2])
                    if str(int(d['n'])) != d['n']: break
                    dfl = (1 if d.get('vip') else 0) | (2 if d.get('p') else 0) | (4 if d.get('outside_capacity') else 0)
                    if (d.get('pl') or label) != (c.get('pl') or label) or dfl != fl or d.get('r') != c.get('r'): break
                    if run[1] == 1:
                        dirn = int(d['n']) - n0
                        if dirn not in (1, -1) or d['k'] - k0 != dirn: break
                        run[2] = dirn
                    else:
                        if int(d['n']) != n0 + run[1] * run[2] or d['k'] != k0 + run[1] * run[2]: break
                    run[1] += 1; j += 1
                tok = [0, run[0], run[1], run[2], run[3], run[4], run[5]]
                if run[6] != rd: tok.append(run[6])
                toks.append(tok); i = j; continue
            if t == 'gap':
                cls, st = c.get('cls', []), c.get('style')
                if not st and cls in ([], ['half-cell']):
                    half = 1 if cls else 0; j = i + 1
                    while j < len(cells) and cells[j]['t'] == 'gap' and not cells[j].get('style') and cells[j].get('cls', []) == cls: j += 1
                    toks.append([1, j - i, half]); i = j; continue
            if t == 'rowlabel' and not c.get('cls') and not c.get('style'):
                toks.append([2, c['n']]); i += 1; continue
            if t == 'block':
                toks.append([5, enc_rows(c['table']['rows'], zidx, label), c.get('style', ''), c.get('cls', [])]); i += 1; continue
            toks.append([6, c]); i += 1
        row_o = [toks, row.get('cls', []), rd]
        while row_o and row_o[-1] in ([], None): row_o.pop()
        out.append(row_o)
    return out

def dec_rows(rows, zones, label):
    out = []
    for r in rows:
        toks, cls, rd = r[0], (r[1] if len(r) > 1 else []), (r[2] if len(r) > 2 else None)
        cells = []
        for t in toks:
            k = t[0]
            if k == 0:
                rr = t[7] if len(t) > 7 else rd
                for q in range(t[2]):
                    c = {'t': 'seat', 'n': str(t[1] + q * t[3]), 'k': t[4] + q * t[3]}
                    if rr is not None: c['r'] = rr
                    zn = zones[t[5]]
                    if zn != label: c['pl'] = zn
                    if t[6] & 1: c['vip'] = True
                    if t[6] & 2: c['p'] = True
                    if t[6] & 4: c['outside_capacity'] = True
                    cells.append(c)
            elif k == 1:
                for q in range(t[1]):
                    cells.append({'t': 'gap', 'cls': ['half-cell']} if t[2] else {'t': 'gap'})
            elif k == 2: cells.append({'t': 'rowlabel', 'n': t[1]})
            elif k == 5:
                c = {'t': 'block', 'table': {'rows': dec_rows(t[1], zones, label)}}
                if t[2]: c['style'] = t[2]
                if t[3]: c['cls'] = t[3]
                cells.append(c)
            else: cells.append(t[1])
        o = {'cells': cells}
        if cls: o['cls'] = cls
        out.append(o)
    return out

def same(a, b, path=''):
    """the original cell lists and the decoded ones must be equal (dict key order aside); a seat's «pl» may be missing in one when it is the section's own label"""
    if type(a) != type(b): return False
    if isinstance(a, dict): return a.keys() == b.keys() and all(same(a[k], b[k], path + '/' + k) for k in a)
    if isinstance(a, list): return len(a) == len(b) and all(same(x, y) for x, y in zip(a, b))
    return a == b

# ───────────────────────────── the halls: merged where the package lists a hall twice
parent = {i: i for i in halls_raw}
def find(x):
    while parent[x] != x: parent[x] = parent[parent[x]]; x = parent[x]
    return x
for h in halls_raw.values():
    for o in h['same_hall_other_plans']:
        assert o in halls_raw, ('same_hall_other_plans', h['id'], o)
        parent[find(o)] = find(h['id'])
groups = collections.defaultdict(list)
for i in halls_raw: groups[find(i)].append(i)
primary = {}
for g in groups.values():
    g.sort()
    for i in g: primary[i] = g[0]
merged = [g for g in groups.values() if len(g) > 1]
say('halls: %d entries in the package -> %d halls (%d with more than one layout: %s)' % (len(halls_raw), len(groups), len(merged), '; '.join('+'.join(map(str, g)) for g in merged)))

all_keys = set(); total_seats = 0; total_outside = 0; layout_blob = {}; halls_out = []; sec_total = 0; run_total = 0
for gid in sorted(groups, key=lambda g: min(groups[g])):
    ids = sorted(groups[gid]); P = halls_raw[ids[0]]
    # one list of zones for the whole hall (a seat's «pl», or its section's label); in the order they first appear
    zone_names = []
    def zi_of(n):
        if n not in zone_names: zone_names.append(n)
        return zone_names.index(n)
    layouts = []
    for hid in ids:
        h = halls_raw[hid]
        for s in h['sections']:
            for c in seats_in(s['layout']['rows'], []): zi_of(c.get('pl') or s['label'])
    zidx = {n: i for i, n in enumerate(zone_names)}
    for hid in ids:
        h = halls_raw[hid]; secs = []; seats_n = outside_n = 0
        for s in h['sections']:
            ss = seats_in(s['layout']['rows'], [])
            for c in ss:
                assert c['k'] not in all_keys, ('duplicate seat key', c['k']); all_keys.add(c['k'])
            seats_n += len(ss); outside_n += sum(1 for c in ss if c.get('outside_capacity'))
            enc = enc_rows(s['layout']['rows'], zidx, s['label'])
            back = dec_rows(enc, zone_names, s['label'])
            # the decoder drops «pl» when it equals the section's label; do the same to the original before comparing
            def strip_pl(rows):
                for r in rows:
                    for c in r['cells']:
                        if c['t'] == 'seat' and c.get('pl') == s['label']: del c['pl']
                        if c['t'] == 'block': strip_pl(c['table']['rows'])
            import copy; orig = copy.deepcopy(s['layout']['rows']); strip_pl(orig)
            assert same(orig, back), ('round trip failed', hid, s['index'])
            run_total += sum(1 for r in enc for t in r[0] if t[0] == 0)
            secs.append([s['label'], 1 if s.get('symbolic_seat_numbers') else 0, s.get('notes') or [], enc])
            sec_total += 1
        cap = h['capacity']
        assert cap['counted_from_plan'] == seats_n and cap['outside_capacity_seats'] == outside_n and cap['counted_in_capacity'] == seats_n - outside_n, ('capacity', hid, cap, seats_n, outside_n)
        total_seats += seats_n; total_outside += outside_n
        layouts.append({'id': hid, 'cap': seats_n - outside_n, 'seats': seats_n, 'out': outside_n, 'secs': secs, 'declared': cap.get('declared_on_site'), 'research': (cap.get('research') or {}).get('status')})
    # zones: the default price class of each
    order = 0; zones = []
    for n in zone_names:
        zones.append([n, class_of(n, order)]); order += 1 if class_of(n, 0) not in ('V', 'X') else 0
    # layouts' names: only when there are several
    if len(layouts) > 1:
        for i, L in enumerate(layouts):
            L['name'] = 'چیدمان %s' % '۱۲۳۴۵۶۷۸۹'[i]
    # location: the primary's; the package's flags are checked against the other rules
    loc = P['location']
    for hid in ids[1:]:
        o = halls_raw[hid]['location']
        if (o is None) != (loc is None) or (o and loc and abs(o['lat'] - loc['lat']) + abs(o['lng'] - loc['lng']) > 0.002):
            say('NOTE merged halls %s have different locations: %s vs %s' % (ids, loc and (loc['lat'], loc['lng']), o and (o['lat'], o['lng'])))
    assert (P['show_map'] is True) == (loc is not None), ('show_map', P['id'])
    for hid in ids: assert (halls_raw[hid]['location'] is None) == (halls_raw[hid]['show_map'] is False)
    city = cities[P['city']['slug']]; assert cities[P['city']['slug']]['p'] == pidx[P['province']['slug']], ('city/province', P['id'])
    hall = {'id': ids[0], 'alias': ids[1:], 'slug': P['slug'], 'name': P['name'], 'city': city['slug'], 'addr': P['address'],
            'cap': max(L['cap'] for L in layouts), 'ty': P.get('type_hint') or [],
            'loc': [round(loc['lat'], 6), round(loc['lng'], 6), {'high': 'h', 'medium': 'm', 'single-source': 's'}[loc['confidence']]] if loc else None,
            'z': zones, 'sb': sorted({primary[x] for x in P['same_building'] if primary[x] != ids[0]}),
            'lay': [{k: v for k, v in L.items() if k != 'secs' and v is not None} for L in layouts]}
    halls_out.append(hall)
    layout_blob[str(ids[0])] = [{'id': L['id'], 'n': L.get('name'), 'S': L['secs']} for L in layouts]

# the rules of the owner, checked on the result
assert sorted(h['id'] for h in halls_out if h['loc'] is None) == sorted(x['id'] for x in nowloc['halls']), 'the halls without a location differ from halls-without-location.json'
assert sum(1 for h in halls_out if h['loc'] is None) == 8
byid = {h['id']: h for h in halls_out}
alias = {a: h['id'] for h in halls_out for a in h['alias']}
for h in halls_out:
    for o in h['sb']: assert o in byid and h['id'] in byid[o]['sb'], ('same_building is not symmetric', h['id'], o)
say('seats: %d on the maps (%d outside the capacity), %d sections, %d seat runs, %d zones' % (total_seats, total_outside, sec_total, run_total, sum(len(h['z']) for h in halls_out)))

# ───────────────────────────── plausibility of the locations (a hall must be where its city is)
def km(a, b):
    R = 6371; p1, p2 = math.radians(a[0]), math.radians(b[0]); dp = p2 - p1; dl = math.radians(b[1] - a[1])
    x = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * R * math.asin(math.sqrt(x))
def median(v): v = sorted(v); n = len(v); return v[n // 2] if n % 2 else (v[n // 2 - 1] + v[n // 2]) / 2
bad = []
for h in halls_out:
    if not h['loc']: continue
    assert 24 <= h['loc'][0] <= 40 and 44 <= h['loc'][1] <= 64, ('outside Iran', h['id'])
by_city = collections.defaultdict(list); by_prov = collections.defaultdict(list)
for h in halls_out:
    if h['loc']: by_city[h['city']].append(h); by_prov[cities[h['city']]['p']].append(h)
for cs, L in by_city.items():
    if len(L) < 3: continue
    c = (median([h['loc'][0] for h in L]), median([h['loc'][1] for h in L]))
    for h in L:
        d = km(c, h['loc'])
        if d > (35 if cs == 'tehran' else 20): bad.append((h['id'], h['name'], cs, round(d, 1), 'from the middle of its city\'s other halls'))
for ps, L in by_prov.items():
    if len(L) < 3: continue
    c = (median([h['loc'][0] for h in L]), median([h['loc'][1] for h in L]))
    for h in L:
        d = km(c, h['loc'])
        if d > 250: bad.append((h['id'], h['name'], provinces[ps][1], round(d), 'from the middle of its province\'s halls'))
say('location outliers (distance from the median of the same city/province): %s' % (bad or 'none'))
for h in halls_out:
    if h['loc'] and h['loc'][2] != 'h': pass
say('locations: high %d, medium %d, single-source %d, none %d' % tuple(sum(1 for h in halls_out if (h['loc'] and h['loc'][2] == q) or (q == 'n' and not h['loc'])) for q in 'hmsn'))

# ───────────────────────────── write the data
def js(o): return json.dumps(o, ensure_ascii=False, separators=(',', ':'))
geo_out = {'p': [[s, n] for s, n in provinces], 'c': [[c['slug'], c['name'], c['p'], c['extra'], c['county']] for c in city_list]}
blob = {k: js(v) for k, v in layout_blob.items()}
with open(OUT + 'halls-data.js', 'w', encoding='utf-8') as f:
    f.write('/* generated by tools/halls/build_halls.py from the halls package: do not edit by hand */\n')
    f.write('const GEO_DATA = %s;\n' % js(geo_out))
    f.write('const HALLS_DATA = %s;\n' % js(halls_out))
    f.write('const HALL_ALIAS = %s;\n' % js(alias))
    f.write('// every hall\'s layouts as JSON text, read when a hall is first opened: [{id, n, S: [[section label, symbolic?, notes, rows]]}]\n')
    f.write('const PLANS_JSON = {\n' + ',\n'.join('%s:%s' % (k, json.dumps(v, ensure_ascii=False)) for k, v in blob.items()) + '\n};\n')
size = os.path.getsize(OUT + 'halls-data.js')
say('wrote halls-data.js: %.0f KB (layouts %.0f KB)' % (size / 1024, sum(len(v) for v in blob.values()) / 1024))
open(OUT + 'halls-report.txt', 'w', encoding='utf-8').write('\n'.join(rep) + '\n')
