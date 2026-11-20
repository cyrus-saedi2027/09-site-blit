#!/bin/bash
# Runs the load-test scenarios one after another (they must not share the machine) and writes a log per scenario into $OUT.
# Usage: OUT=/tmp/lt ./run-scenarios.sh      (about 15 minutes; SCALE=4 means every wait of a buyer is four times shorter, so the server sees four times the requests per buyer)
cd "$(dirname "$0")" || exit 1
OUT="${OUT:-/tmp/lt}"; mkdir -p "$OUT"
run() { name="$1"; shift; echo "== $name: $*"; env "$@" node loadtest.js > "$OUT/$name.log" 2>&1; echo "   done $name"; }
# a small hall (3 000 seats), 50 000 people: a fixed room of 500, and the adaptive one (the room shrinks as seats run out)
run a1-3k-fixed500     USERS=50000 CAP=500  SEATS=3000  SCALE=4 MAXSEC=90 ADAPTIVE=0
run a2-3k-adapt500     USERS=50000 CAP=500  SEATS=3000  SCALE=4 MAXSEC=90
# a big hall (20 000 seats), 50 000 people: how many may be inside at once? 500 / 1 000 / 2 000 / 5 000
run b1-20k-cap500      USERS=50000 CAP=500  SEATS=20000 SCALE=4 MAXSEC=90 ADAPTIVE=0
run b2-20k-cap1000     USERS=50000 CAP=1000 SEATS=20000 SCALE=4 MAXSEC=90 ADAPTIVE=0
run b3-20k-cap2000     USERS=50000 CAP=2000 SEATS=20000 SCALE=4 MAXSEC=90 ADAPTIVE=0
run b4-20k-cap5000     USERS=50000 CAP=5000 SEATS=20000 SCALE=4 MAXSEC=90 ADAPTIVE=0
# the first seconds of a sale: 10 000 people arrive within two seconds, 1 000 seats
run c1-spike10k        USERS=10000 RAMP=2 CAP=500 SEATS=1000 SCALE=4 MAXSEC=60
# 100 000 people waiting
run d1-100k            USERS=100000 CAP=1000 SEATS=20000 SCALE=4 MAXSEC=90
echo ALL-DONE
