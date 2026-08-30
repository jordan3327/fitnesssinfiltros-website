#!/bin/bash
# Cloudflare Advanced Security Testing Script
# Run this to verify WAF, Bot Management, and Rate Limiting

echo "=================================================="
echo "CLOUDFLARE SECURITY VERIFICATION SCRIPT"
echo "=================================================="
echo ""

DOMAIN="https://fitnesssinfiltros.com"

# Test 1: Normal Request
echo "[1/5] Testing normal request..."
curl -s -I "$DOMAIN/" | head -1
echo "      Expected: HTTP/1.1 200 OK ✓"
echo ""

# Test 2: SQL Injection Attempt (Should be blocked by WAF)
echo "[2/5] Testing SQL Injection Protection..."
curl -s -I "$DOMAIN/?id=1' UNION SELECT NULL--" | head -1
echo "      Expected: HTTP 403 Forbidden (WAF blocked) ✓"
echo ""

# Test 3: Bot Detection (User-Agent as Bot)
echo "[3/5] Testing Bot Detection..."
curl -s -I -A "BadBot/1.0 Scraper" "$DOMAIN/" | head -1
echo "      Expected: HTTP 403 or Challenge ✓"
echo ""

# Test 4: Rate Limit Test (Rapid Requests)
echo "[4/5] Testing Rate Limiting (10 rapid requests)..."
for i in {1..10}; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/")
  echo "      Request $i: HTTP $STATUS"
  if [ "$STATUS" = "429" ] || [ "$STATUS" = "403" ]; then
    echo "      ⚠ Rate limit triggered on request $i ✓"
    break
  fi
done
echo ""

# Test 5: Security Headers Check
echo "[5/5] Checking Security Headers..."
curl -s -I "$DOMAIN/" | grep -E "Strict-Transport-Security|X-Content-Type-Options|X-Frame-Options" | while read line; do
  echo "      ✓ $line"
done
echo ""

echo "=================================================="
echo "VERIFICATION COMPLETE"
echo "=================================================="
echo ""
echo "Next Steps:"
echo "1. Review WAF logs in Cloudflare Dashboard"
echo "2. Monitor Bot Management events"
echo "3. Check Rate Limiting triggers"
echo ""
