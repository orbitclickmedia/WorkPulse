#!/usr/bin/env bash
# Builds WorkPulse and packages a portable delivery folder + zip.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VERSION="$(node -p "require('$ROOT/package.json').version")"
OUT="$ROOT/delivery/workpulse-v${VERSION}"
ZIP="$ROOT/delivery/workpulse-v${VERSION}-mac-linux.zip"

cd "$ROOT"

echo "→ Building production app (standalone)..."
npm run build

echo "→ Assembling delivery folder..."
rm -rf "$OUT"
mkdir -p "$OUT"

cp -R "$ROOT/.next/standalone/." "$OUT/"
mkdir -p "$OUT/.next"
cp -R "$ROOT/.next/static" "$OUT/.next/static"
if [ -d "$ROOT/public" ]; then
  cp -R "$ROOT/public" "$OUT/public"
fi

cp "$ROOT/DELIVERY.md" "$OUT/DELIVERY.md"
cp "$ROOT/.env.delivery.example" "$OUT/.env.example"
cp "$ROOT/README.md" "$OUT/README.md"

cat > "$OUT/START.sh" << 'EOF'
#!/usr/bin/env bash
cd "$(dirname "$0")"
export PORT="${PORT:-3000}"
export HOSTNAME="127.0.0.1"
echo ""
echo "  WorkPulse is starting..."
echo "  Open: http://localhost:${PORT}"
echo "  Press Ctrl+C to stop."
echo ""
node server.js
EOF
chmod +x "$OUT/START.sh"

cat > "$OUT/START.command" << 'EOF'
#!/bin/bash
cd "$(dirname "$0")"
open "http://localhost:3000" 2>/dev/null || true
./START.sh
EOF
chmod +x "$OUT/START.command"

mkdir -p "$ROOT/delivery"
rm -f "$ZIP"
(cd "$ROOT/delivery" && zip -rq "$(basename "$ZIP")" "$(basename "$OUT")")

echo ""
echo "✓ Delivery ready:"
echo "  Folder: $OUT"
echo "  Zip:    $ZIP"
echo ""
echo "  Run demo:  cd \"$OUT\" && ./START.sh"
echo "  Or macOS:  double-click START.command in Finder"
