# NetRate AA contrast: reads ./aa/ written by tools/netrate/aa.js and prints every text box below AA (4.5:1; large text 3:1)
import json, re, sys, statistics
from PIL import Image
idx = json.load(open('aa/index.json'))
def lin(c):
    c = c/255
    return c/12.92 if c <= .04045 else ((c+.055)/1.055)**2.4
def L(rgb): return .2126*lin(rgb[0])+.7152*lin(rgb[1])+.0722*lin(rgb[2])
def cr(a,b):
    la,lb=L(a),L(b); hi,lo=max(la,lb),min(la,lb); return (hi+.05)/(lo+.05)
def parse(c):
    m = re.findall(r'[\d.]+', c); v=[float(x) for x in m]
    return v[0],v[1],v[2], (v[3] if len(v)>3 else 1.0)
fails = []; n = 0; worst = {}
for f in idx:
    im = Image.open(f).convert('RGB'); info = json.load(open(f.replace('.png','.json'))); sc = im.width/info['w']
    for e in info['els']:
        x0,y0,x1,y1 = [int(round(v*sc)) for v in (e['x']+1, e['y']+1, e['x']+e['w']-1, e['y']+e['h']-1)]
        x0,y0=max(0,x0),max(0,y0); x1,y1=min(im.width,x1),min(im.height,y1)
        if x1<=x0 or y1<=y0: continue
        px = list(im.crop((x0,y0,x1,y1)).getdata())
        # background = the lightest-and-darkest extremes would bias; use the median of each channel
        bg = tuple(int(statistics.median(p[i] for p in px)) for i in range(3))
        r,g,b,a = parse(e['color']); a *= e['op']
        fg = tuple(a*c + (1-a)*bgc for c,bgc in zip((r,g,b),bg))
        ratio = cr(fg,bg); n += 1
        large = e['fs'] >= 24 or (e['fs'] >= 18.66 and e['fw'] >= 700)
        need = 3.0 if large else 4.5
        key = (e['t'][:14], f.split('/')[-1].split('_')[0])
        if ratio < need:
            fails.append((round(ratio,2), need, f.split('/')[-1][:-4], e['t'], round(e['fs'],1), e['cls']))
print('checked', n, 'text boxes;', len(fails), 'below AA')
# group by (widget, text-class) and show the worst per group
groups = {}
for r_, need, name, t, fs, cls in fails:
    k = (name.split('_')[0], cls.split()[0] if cls else t[:10])
    if k not in groups or r_ < groups[k][0]: groups[k] = (r_, need, name, t, fs)
for k,v in sorted(groups.items(), key=lambda kv: kv[1][0])[:40]: print(k, v)
