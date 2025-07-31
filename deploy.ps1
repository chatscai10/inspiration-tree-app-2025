# PowerShell deployment script for Inspiration ECG Tool
# Run this in PowerShell: .\deploy.ps1

Write-Host ""
Write-Host "🚀 Inspiration ECG Tool - Deploy to Vercel" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Project files check completed" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
}
catch {
    Write-Host "❌ Dependencies installation failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

# Build project
Write-Host "🔨 Building project..." -ForegroundColor Yellow
try {
    npm run build
    Write-Host "✅ Build completed" -ForegroundColor Green
}
catch {
    Write-Host "❌ Build failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

# Display deployment instructions
Write-Host "📤 Ready for Vercel deployment..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Please follow these steps to deploy:" -ForegroundColor White
Write-Host ""
Write-Host "1️⃣  Initialize Git (if not done yet):" -ForegroundColor White
Write-Host "    git init" -ForegroundColor Gray
Write-Host "    git add ." -ForegroundColor Gray
Write-Host "    git commit -m `"Initial commit: Inspiration ECG Tool`"" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Push to GitHub:" -ForegroundColor White
Write-Host "    - Create a new repository on GitHub" -ForegroundColor Gray
Write-Host "    - git remote add origin https://github.com/YOUR_USERNAME/inspiration-ecg-tool.git" -ForegroundColor Gray
Write-Host "    - git branch -M main" -ForegroundColor Gray
Write-Host "    - git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  Deploy on Vercel:" -ForegroundColor White
Write-Host "    - Visit https://vercel.com" -ForegroundColor Gray
Write-Host "    - Login with GitHub account" -ForegroundColor Gray
Write-Host "    - Click 'New Project'" -ForegroundColor Gray
Write-Host "    - Select your repository" -ForegroundColor Gray
Write-Host "    - Click 'Import'" -ForegroundColor Gray
Write-Host ""
Write-Host "4️⃣  Set environment variables in Vercel:" -ForegroundColor White
Write-Host "    VITE_SUPABASE_URL = https://rpodcxdsljvuysjixztd.supabase.co" -ForegroundColor Gray
Write-Host "    VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwb2RjeGRzbGp2dXlzaWp4enRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTEwNjEsImV4cCI6MjA2OTU2NzA2MX0.vQBJTl-UctTEtjEXuFikXqwF3wWjJlz8g-LzcBSNeOE" -ForegroundColor Gray
Write-Host ""
Write-Host "5️⃣  Click 'Deploy' to complete!" -ForegroundColor White
Write-Host ""
Write-Host "🌟 After deployment, you'll get a URL like:" -ForegroundColor Yellow
Write-Host "    https://inspiration-ecg-tool.vercel.app" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Remember to add the website to your phone's home screen for the best experience!" -ForegroundColor Green
Write-Host ""

# Ask if user wants to initialize Git
$response = Read-Host "Do you want to initialize Git now? (y/n)"
if ($response -eq "y" -or $response -eq "Y") {
    Write-Host ""
    Write-Host "🔧 Initializing Git repository..." -ForegroundColor Yellow
    
    try {
        git init
        git add .
        git commit -m "Initial commit: Inspiration ECG Tool"
        Write-Host "✅ Git initialization completed!" -ForegroundColor Green
        Write-Host "📤 Please create a GitHub repository and push the code" -ForegroundColor Cyan
    }
    catch {
        Write-Host "❌ Git initialization failed. Please make sure Git is installed." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 Preparation completed!" -ForegroundColor Green
Write-Host "📖 For detailed guide, check DEPLOYMENT_GUIDE.md" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"