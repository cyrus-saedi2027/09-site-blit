#!/bin/bash
# The realistic runs (round AD, second part): the buying page asks for the map every ~2 s (LOOKMAX=2), a seat taken a moment ago is swapped for its neighbour (FLEX=1),
# people inside keep showing signs of life and one who closes the tab is let go (KEEPALIVE=1, VANISH=0.5). Every run goes on until the hall is sold out.
cd "$(dirname "$0")" || exit 1
OUT="${OUT:-results}"; mkdir -p "$OUT"
R="LOOKMIN=0 LOOKMAX=2 FLEX=1 KEEPALIVE=1 VANISH=0.5 SCALE=4"
run() { name="$1"; shift; echo "== $name: $*"; env $R "$@" node loadtest.js > "$OUT/$name.log" 2>&1; echo "   done $name"; }
run r1-3k-50k        USERS=50000  CAP=500  SEATS=3000  MAXSEC=360
run r2-1200-20k      USERS=20000  CAP=500  SEATS=1200  MAXSEC=300
run r3-20k-50k       USERS=50000  CAP=1000 SEATS=20000 MAXSEC=420
run r4-spike10k-3k   USERS=10000  CAP=500  SEATS=3000  MAXSEC=300 RAMP=2
run r5-100k-20k      USERS=100000 CAP=1000 SEATS=20000 MAXSEC=480 RAMP=20
echo ALL-DONE
