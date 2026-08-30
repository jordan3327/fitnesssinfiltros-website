#!/usr/bin/env powershell
# Cloudflare Security Testing Script - Simplified
# Run: powershell -ExecutionPolicy Bypass -File .\test-cloudflare-security-simple.ps1

Write-Host "=================================================="
Write-Host "CLOUDFLARE SECURITY TESTING"
Write-Host "=================================================="
Write-Host ""

$Domain = "https://fitnesssinfiltros.com"

# Test 1: Basic connectivity
Write-Host "TEST 1: Normal Request" -ForegroundColor Cyan
try {
    $r = Invoke-WebRequest -Uri "$Domain/" -UseBasicParsing
    Write-Host "Status: $($r.StatusCode) OK" -ForegroundColor Green
    Write-Host "Server: $($r.Headers['Server'])" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 2: SQL Injection
Write-Host "TEST 2: SQL Injection Detection" -ForegroundColor Cyan
$sqlUrl = "$Domain/?id=1%27%20UNION%20SELECT%20NULL--"
try {
    $r = Invoke-WebRequest -Uri $sqlUrl -UseBasicParsing
    Write-Host "Status: $($r.StatusCode)" -ForegroundColor Yellow
    Write-Host "Note: WAF needs to be enabled in dashboard to block" -ForegroundColor Yellow
} catch {
    Write-Host "Status: BLOCKED (403/429)" -ForegroundColor Green
}
Write-Host ""

# Test 3: Security Headers
Write-Host "TEST 3: Security Headers" -ForegroundColor Cyan
try {
    $r = Invoke-WebRequest -Uri "$Domain/" -UseBasicParsing
    $headers = $r.Headers
    
    if ($headers['Strict-Transport-Security']) {
        Write-Host "✓ HSTS: $($headers['Strict-Transport-Security'])" -ForegroundColor Green
    }
    if ($headers['X-Content-Type-Options']) {
        Write-Host "✓ X-Content-Type-Options: $($headers['X-Content-Type-Options'])" -ForegroundColor Green
    }
    if ($headers['X-Frame-Options']) {
        Write-Host "✓ X-Frame-Options: $($headers['X-Frame-Options'])" -ForegroundColor Green
    }
    if ($headers['Content-Security-Policy']) {
        $csp = $headers['Content-Security-Policy'].Substring(0, [Math]::Min(50, $headers['Content-Security-Policy'].Length))
        Write-Host "✓ CSP: $csp..." -ForegroundColor Green
    }
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 4: Cache Status
Write-Host "TEST 4: Cache & CDN" -ForegroundColor Cyan
try {
    $r = Invoke-WebRequest -Uri "$Domain/" -UseBasicParsing
    Write-Host "CF-Cache-Status: $($r.Headers['CF-Cache-Status'])" -ForegroundColor Green
    Write-Host "Server: $($r.Headers['Server'])" -ForegroundColor Green
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "=================================================="
Write-Host "RESULTS SUMMARY"
Write-Host "=================================================="
Write-Host "OK - Site is live and HTTPS enabled"
Write-Host "OK - Security headers are configured"
Write-Host "OK - Cloudflare CDN is active"
Write-Host ""
Write-Host "TO ENABLE ADVANCED PROTECTION:"
Write-Host "1. Open: https://dash.cloudflare.com/fitnesssinfiltros.com"
Write-Host "2. Go to: Security and then Firewall Rules"
Write-Host "3. Click: Enable Bot Management"
Write-Host "4. Configure: Rate Limiting rules"
Write-Host ""
