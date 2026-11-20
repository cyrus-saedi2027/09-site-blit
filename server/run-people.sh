#!/bin/bash
# «Nobody has a problem» runs (round AD, third part). Everything of the realistic mode, plus: a quarter of the people let the phone sleep for a minute or three while they wait
# (SLEEP=0.25), and 8 in 10 of the payers go to the bank's page and send nothing for minutes (BANK=0.8). Every run goes on until the hall is sold out and everybody has finished.
cd "$(dirname "$0")" || exit 1
OUT="${OUT:-results}"; mkdir -p "$OUT"
R="LOOKMIN=0 LOOKMAX=2 FLEX=1 KEEPALIVE=1 VANISH=0.5 SCALE=4 SLEEP=0.25 BANK=0.8"
run() { name="$1"; shift; echo "== $name: $*"; env $R "$@" node loadtest.js > "$OUT/$name.log" 2>&1; echo "   done $name"; }
run p1-3k-room1000-auto   USERS=50000  CAP=1000 SEATS=3000  MAXSEC=1500
run p2-3k-room1000-fixed  USERS=50000  CAP=1000 SEATS=3000  MAXSEC=1500 ADAPTIVE=0
run p3-spike10k           USERS=10000  CAP=1000 SEATS=3000  MAXSEC=1200 RAMP=2
run p4-20k-100k           USERS=100000 CAP=1000 SEATS=20000 MAXSEC=2400 RAMP=20
echo ALL-DONE
