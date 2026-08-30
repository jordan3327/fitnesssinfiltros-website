@echo off
REM Cloudflare Advanced Security Testing Script for Windows
REM Run this to verify WAF, Bot Management, and Rate Limiting

setlocal enabledelayedexpansion

cls
echo ==================================================
echo CLOUDFLARE SECURITY VERIFICATION SCRIPT (Windows)
echo ==================================================
echo.

set DOMAIN=https://fitnesssinfiltros.com

REM Test 1: Normal Request
echo [1/5] Testing normal request...
powershell -Command "$r = Invoke-WebRequest -Uri '%DOMAIN%/' -UseBasicParsing -ErrorAction SilentlyContinue; Write-Host $r.StatusCode $r.StatusDescription"
echo       Expected: 200 OK
echo.

REM Test 2: SQL Injection Attempt
echo [2/5] Testing SQL Injection Protection...
powershell -Command "$r = Invoke-WebRequest -Uri '%DOMAIN%/?id=1' UNION SELECT NULL--' -UseBasicParsing -ErrorAction SilentlyContinue; if ($r) { Write-Host $r.StatusCode } else { Write-Host '403 or 429 (Blocked)' }"
echo       Expected: 403 Forbidden or 429 (Too Many Requests)
echo.

REM Test 3: Bot Detection
echo [3/5] Testing Bot Detection...
powershell -Command "$h = @{'User-Agent'='BadBot/1.0 Scraper'}; $r = Invoke-WebRequest -Uri '%DOMAIN%/' -Headers $h -UseBasicParsing -ErrorAction SilentlyContinue; if ($r) { Write-Host $r.StatusCode } else { Write-Host 'Request blocked' }"
echo       Expected: 403 or blocked
echo.

REM Test 4: Rate Limiting
echo [4/5] Testing Rate Limiting (10 rapid requests)...
for /L %%i in (1,1,10) do (
  powershell -Command "$r = Invoke-WebRequest -Uri '%DOMAIN%/' -UseBasicParsing -ErrorAction SilentlyContinue; if ($r) { Write-Host '  Request %%i: ' $r.StatusCode } else { Write-Host '  Request %%i: BLOCKED' }"
  if %%i==5 (
    echo   ... checking for rate limit trigger ...
  )
)
echo.

REM Test 5: Security Headers
echo [5/5] Checking Security Headers...
powershell -Command "$r = Invoke-WebRequest -Uri '%DOMAIN%/' -UseBasicParsing -ErrorAction SilentlyContinue; $r.Headers.Keys | Where-Object { $_ -match 'Strict-Transport|X-Content-Type|X-Frame|Content-Security' } | ForEach-Object { Write-Host '  ✓' $_ ':' $r.Headers[$_] }"
echo.

echo ==================================================
echo VERIFICATION COMPLETE
echo ==================================================
echo.
echo Next Steps:
echo 1. Review WAF logs: https://dash.cloudflare.com/
echo 2. Navigate to: Security ^> Firewall Rules
echo 3. Monitor Bot Management events
echo 4. Check Rate Limiting triggers
echo.
pause
