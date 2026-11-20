#!/bin/bash
# How many new HTTPS connections per second can ONE core of this machine accept? (the number that decides how fast a crowd that arrives all at once gets in)
# A Node https server with an ECDSA P-256 certificate (what Let's Encrypt gives) and `openssl s_time` as the crowd: -new = a full handshake each time, -reuse = a returning phone (session resumption).
# Usage: ./tls-test.sh        (about 30 s; prints the two rates and the CPU the server used)
set -e
D="$(mktemp -d)"; cd "$D"
openssl req -x509 -newkey ec -pkeyopt ec_paramgen_curve:prime256v1 -nodes -keyout k.pem -out c.pem -days 2 -subj "/CN=localhost" >/dev/null 2>&1
cat > s.js <<'EOF'
const https = require('https'), fs = require('fs');
const s = https.createServer({ key: fs.readFileSync('k.pem'), cert: fs.readFileSync('c.pem') }, (q, r) => { r.writeHead(200, { 'Content-Length': 2 }); r.end('ok'); });
s.listen(+process.env.PORT, '127.0.0.1', () => console.log('up'));
setInterval(() => {}, 1 << 30);
EOF
PORT=$((20000 + RANDOM % 20000)); PORT=$PORT node s.js > log.txt 2>&1 & SP=$!
until grep -q up log.txt 2>/dev/null; do sleep 0.2; done
echo "server pid $SP on :$PORT (one Node process = one core)"
for mode in -new -reuse; do
  c0=$(awk '{print $14+$15}' /proc/$SP/stat); t0=$(date +%s.%N)
  out=$(openssl s_time -connect 127.0.0.1:$PORT $mode -time 8 2>&1 | grep -E "connections in" | head -1)
  c1=$(awk '{print $14+$15}' /proc/$SP/stat); t1=$(date +%s.%N)
  cpu=$(echo "($c1 - $c0) / 100 / ($t1 - $t0) * 100" | bc -l | xargs printf "%.0f")
  echo "$mode: $out   (server CPU ≈ ${cpu}% of one core)"
done
kill $SP; rm -rf "$D"
