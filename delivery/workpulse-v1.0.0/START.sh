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
