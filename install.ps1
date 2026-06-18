# Copie .env.example para .env e backend/.env antes de subir o stack.
Write-Host "Denky Portfolio — subindo Docker Compose..." -ForegroundColor Cyan

if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Criado .env a partir de .env.example" -ForegroundColor Yellow
}

if (-not (Test-Path "backend/.env")) {
    Copy-Item "backend/.env.example" "backend/.env"
    Write-Host "Criado backend/.env a partir de backend/.env.example" -ForegroundColor Yellow
}

docker compose up --build -d
Write-Host ""
Write-Host "Acesse: http://localhost" -ForegroundColor Green
Write-Host "API:    http://localhost/api/v1/public/portfolio/" -ForegroundColor Green
