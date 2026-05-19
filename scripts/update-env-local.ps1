# Supabase local başladıktan sonra .env.local'i otomatik günceller
# Kullanım: .\scripts\update-env-local.ps1

$status = npx supabase status 2>&1 | Out-String

$url     = ($status | Select-String 'API URL:\s+(\S+)').Matches[0].Groups[1].Value
$anon    = ($status | Select-String 'anon key:\s+(\S+)').Matches[0].Groups[1].Value
$service = ($status | Select-String 'service_role key:\s+(\S+)').Matches[0].Groups[1].Value

if (-not $url) {
    Write-Error "Supabase status alınamadı. 'npx supabase start' çalışıyor mu?"
    exit 1
}

$env = @"
NEXT_PUBLIC_MOCK_MODE=false
NEXT_PUBLIC_SUPABASE_URL=$url
NEXT_PUBLIC_SUPABASE_ANON_KEY=$anon
SUPABASE_SERVICE_ROLE_KEY=$service
"@

Set-Content -Path ".env.local" -Value $env -Encoding UTF8
Write-Host "✓ .env.local güncellendi — $url"
Write-Host "  Studio : http://127.0.0.1:54323"
Write-Host "  Mailpit: http://127.0.0.1:54324"
