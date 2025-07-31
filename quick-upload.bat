@echo off
echo 🚀 Quick GitHub Upload
echo =====================
echo.

echo Step 1: Initialize Git
git init

echo Step 2: Add essential files only
git add package.json
git add vite.config.js
git add tailwind.config.js
git add index.html
git add .env.local
git add src/
git add README.md
git add .gitignore

echo Step 3: Commit
git commit -m "Inspiration ECG Tool - Initial commit"

echo.
echo ✅ Ready to push!
echo.
echo Now run these commands:
echo 1. Create repository on GitHub
echo 2. git remote add origin https://github.com/YOUR_USERNAME/inspiration-ecg-tool.git
echo 3. git push -u origin main
echo.
echo Then deploy on Vercel!
echo.
pause