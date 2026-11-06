"""One-off helper: turns the scraped Persian-Wikipedia county list (+ English titles for the slugs) into
data/cities-source.json, the provisional list of the 31 provinces and ~485 counties that the city filter uses until the
owner sends his own list (the slugs follow the package's own scheme: the English Wikipedia title without «County»)."""
import json, re, unicodedata, sys
# python3 -I make_cities_source.py <dir with counties_clean.json and counties_en.json> <halls package dir> <out cities-source.json>
W, PK, OUT = sys.argv[1].rstrip('/') + '/', sys.argv[2].rstrip('/') + '/', sys.argv[3]
counties = json.load(open(W + 'counties_clean.json', encoding='utf-8'))
en = json.load(open(W + 'counties_en.json', encoding='utf-8'))
geo = json.load(open(PK + 'geo-tree.json', encoding='utf-8'))
PSLUG = {p['name']: p['slug'] for p in geo['provinces']}
PSLUG.update({'سیستان و بلوچستان': 'sistan-and-baluchestan', 'ایلام': 'ilam', 'چهارمحال و بختیاری': 'chaharmahal-and-bakhtiari', 'کرمانشاه': 'kermanshah', 'کردستان': 'kurdistan', 'کهگیلویه و بویراحمد': 'kohgiluyeh-and-boyer-ahmad', 'لرستان': 'lorestan', 'قم': 'qom', 'همدان': 'hamadan'})
ALPHA = 'آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی'
def key(s):
    s = s.replace('‌', ' ').replace('ي', 'ی').replace('ك', 'ک')
    return [ALPHA.find(c) if c in ALPHA else (-1 if c == ' ' else 99) for c in s]
def slugify(t):
    t = re.sub(r'\s+(County|District)$', '', t.strip())
    t = unicodedata.normalize('NFKD', t).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', t.lower()).strip('-')
EXTRA = {'میمه و وزوان': 'meymeh-and-vazvan'}
assert len(PSLUG) == 31, len(PSLUG)
provinces = sorted(PSLUG.items(), key=lambda kv: key(kv[0]))
cities, used = [], set()
for p, n in sorted(counties, key=lambda pn: (key(pn[0]), key(pn[1]))):
    t = en.get('شهرستان ' + n)
    s = EXTRA.get(n) or (slugify(t) if t else None)
    assert s, ('no slug', p, n)
    if s in used: s = f'{s}-{PSLUG[p]}'
    assert s not in used, s
    used.add(s); cities.append({'slug': s, 'name': n.replace('‌', '‌'), 'province': PSLUG[p]})
json.dump({
    'note': 'PROVISIONAL list of the counties (شهرستان) of Iran, 31 provinces: scraped from Persian Wikipedia (the 1395 table and the table of new counties; 482 distinct names) with slugs from the English Wikipedia titles (the scheme of the halls package). The owner has his own list of 485: replace this file with it (same fields) and rebuild.',
    'provinces': [{'slug': s, 'name': n} for n, s in provinces], 'cities': cities}, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
print(len(provinces), 'provinces,', len(cities), 'cities ->', OUT)
