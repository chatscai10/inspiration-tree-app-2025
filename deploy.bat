@echo off
chcp 65001 >nul
echo.
echo 🚀 Inspiration ECG Tool - Deploy to Vercel
echo ==========================================
echo.

echo 📋 Checking project status...
if not exist "package.json" (
    echo ❌ Error: package.json not found
    pause
    exit /b 1
)

echo ✅ Project files check completed
echo.

echo 📦 Installing dependencies...
npm install
if %ERRORLEVEL% neq 0 (
    echo ❌ Dependencies installation failed
    pause
    exit /b 1
)

echo ✅ Dependencies installed
echo.

echo 🔨 Building project...
npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build completed
echo.

echo 📤 Ready for Vercel deployment...
echo.
echo Please follow these steps to deploy:
echo.
echo 1️⃣  If you don't have a Git repository yet:
echo     git init
echo     git add .
echo     git commit -m "Initial commit: Inspiration ECG Tool"
echo.
echo 2️⃣  Push to GitHub:
echo     git remote add origin https://github.com/YOUR_USERNAME/inspiration-ecg-tool.git
echo     git branch -M main
echo     git push -u origin main
echo.
echo 3️⃣  Visit https://vercel.com
echo     - Login with GitHub account
echo     - Click "New Project"
echo     - Select your repository
echo     - Click "Import"
echo.
echo 4️⃣  Set environment variables in Vercel:
echo     VITE_SUPABASE_URL = https://rpodcxdsljvuysjixztd.supabase.co
echo.
echo 5️⃣  Click "Deploy" to complete!
echo.
echo 🌟 After deployment, you'll get a URL like:
echo     https://inspiration-ecg-tool.vercel.app
echo.
echo 📱 Remember to add the website to your phone's home screen!
echo.

set /p input="Press Enter to continue, or type 'git' to initialize Git: "

if /i "%input%"=="git" (
    echo.
    echo 🔧 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit: Inspiration ECG Tool"
    echo.
    echo ✅ Git initialization completed!
    echo 📤 Please create a GitHub repository and push the code
)

echo.
echo 🎉 Preparation completed!
echo 📖 For detailed guide, check DEPLOYMENT_GUIDE.md
echo.
pause