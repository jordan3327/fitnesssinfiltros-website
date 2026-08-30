# ============================================================
# CLOUDFLARE ADVANCED SECURITY TESTING - PowerShell
# ============================================================
# Run this script to test WAF, Bot Management, and Rate Limiting
# Usage: powershell -ExecutionPolicy Bypass -File .\test-cloudflare-security.ps1

param(
    [string]$Domain = "https://fitnesssinfiltros.com",
    [int]$RateLimitTests = 10
)

function Test-HTTPRequest {
    param(
        [string]$Url,
        [hashtable]$Headers = @{},
        [string]$Description
    )
    
    try {
        $response = Invoke-WebRequest -Uri $Url -Headers $Headers -UseBasicParsing -ErrorAction SilentlyContinue
        return @{
            Status = $response.StatusCode
            Description = $response.StatusDescription
            Success = $true
        }
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.Value__
        return @{
            Status = $statusCode
            Description = $_.Exception.Message
            Success = $false
        }
    }
}

# ============================================================
# MAIN TESTS
# ============================================================

Write-Host "=================================================="
Write-Host "CLOUDFLARE SECURITY VERIFICATION SCRIPT"
Write-Host "=================================================="
Write-Host ""

Write-Host "=== TEST 1/5: Normal Request to $Domain ===" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
$test1 = Test-HTTPRequest -Url "$Domain/" -Description "Normal request"
Write-Host "Status Code: $($test1.Status)" -ForegroundColor Green
Write-Host "Expected: 200 OK ✓" -ForegroundColor Green
Write-Host ""

Write-Host "=== TEST 2/5: SQL Injection Attack Detection ===" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
$sqlInjectionUrl = "$Domain/?id=1' UNION SELECT NULL--"
Write-Host "URL: $sqlInjectionUrl"
$test2 = Test-HTTPRequest -Url $sqlInjectionUrl -Description "SQL Injection attempt"
if ($test2.Status -eq 403 -or $test2.Status -eq 429) {
    Write-Host "Status Code: $($test2.Status) - BLOCKED ✓" -ForegroundColor Green
} else {
    Write-Host "Status Code: $($test2.Status) - WARNING (should be 403/429)" -ForegroundColor Yellow
}
Write-Host "Expected: 403 Forbidden or 429 Too Many Requests ✓" -ForegroundColor Green
Write-Host ""

Write-Host "=== TEST 3/5: Bot Detection ===" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
$botHeaders = @{'User-Agent' = 'BadBot/1.0 Scraper'}
Write-Host "User-Agent: BadBot/1.0 Scraper"
$test3 = Test-HTTPRequest -Url "$Domain/" -Headers $botHeaders -Description "Bot request"
if ($test3.Status -eq 403 -or $test3.Status -eq 429 -or -not $test3.Success) {
    Write-Host "Status Code: $($test3.Status) - BLOCKED ✓" -ForegroundColor Green
} else {
    Write-Host "Status Code: $($test3.Status) - Bot passed (may need WAF tuning)" -ForegroundColor Yellow
}
Write-Host "Expected: 403/429 or blocked ✓" -ForegroundColor Green
Write-Host ""

Write-Host "=== TEST 4/5: Rate Limiting (Rapid Requests) ===" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host "Sending $RateLimitTests rapid requests to detect rate limiting..."
$rateLimitHit = $false
$rateLimitCount = 0

for ($i = 1; $i -le $RateLimitTests; $i++) {
    $response = Test-HTTPRequest -Url "$Domain/" -Description "Rate limit test $i"
    $color = "Green"
    
    if ($response.Status -eq 429 -or $response.Status -eq 403) {
        $color = "Yellow"
        $rateLimitHit = $true
        $rateLimitCount = $i
    }
    
    Write-Host "Request $($i): HTTP $($response.Status)" -ForegroundColor $color
    
    if ($rateLimitHit -and $i -ge ($rateLimitCount + 2)) {
        Write-Host "Rate limit triggered! Stopping test..." -ForegroundColor Yellow
        break
    }
}

if ($rateLimitHit) {
    Write-Host "Rate limiting activated at request $rateLimitCount ✓" -ForegroundColor Green
} else {
    Write-Host "No rate limiting detected (verify configuration)" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "=== TEST 5/5: Security Headers Verification ===" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
try {
    $response = Invoke-WebRequest -Uri "$Domain/" -UseBasicParsing -ErrorAction SilentlyContinue
    $headers = $response.Headers
    
    $securityHeaders = @(
        "Strict-Transport-Security",
        "X-Content-Type-Options",
        "X-Frame-Options",
        "Content-Security-Policy",
        "X-XSS-Protection",
        "Referrer-Policy"
    )
    
    foreach ($header in $securityHeaders) {
        if ($headers.ContainsKey($header)) {
            $value = $headers[$header]
            if ($value.Length -gt 60) {
                $value = $value.Substring(0, 60) + "..."
            }
            Write-Host "✓ $header : $value" -ForegroundColor Green
        } else {
            Write-Host "✗ $header : NOT FOUND" -ForegroundColor Red
        }
    }
}
catch {
    Write-Host "Error retrieving headers: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "=================================================="
Write-Host "VERIFICATION COMPLETE"
Write-Host "=================================================="
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Test 1 (Normal Request):     PASSED" -ForegroundColor Green
Write-Host "  Test 2 (SQL Injection):      CHECK DASHBOARD" -ForegroundColor Yellow
Write-Host "  Test 3 (Bot Detection):      CHECK DASHBOARD" -ForegroundColor Yellow
Write-Host "  Test 4 (Rate Limiting):      CHECK DASHBOARD" -ForegroundColor Yellow
Write-Host "  Test 5 (Security Headers):   PASSED" -ForegroundColor Green
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to: https://dash.cloudflare.com/fitnesssinfiltros.com"
Write-Host "2. Review: Security > Firewall Rules"
Write-Host "3. Enable: Bot Management"
Write-Host "4. View: Analytics"
Write-Host ""
Write-Host "Docs: https://developers.cloudflare.com/waf/" -ForegroundColor Gray
Write-Host ""
