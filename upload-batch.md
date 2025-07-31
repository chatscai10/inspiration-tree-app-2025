# 📦 分批上傳到GitHub指南

由於檔案數量較多，我們需要分批上傳。

## 🚀 方法1：精簡上傳（推薦）

### 第一批：核心檔案
只上傳必要的檔案：

```bash
git init
git add package.json
git add package-lock.json
git add vite.config.js
git add tailwind.config.js
git add postcss.config.js
git add index.html
git add vercel.json
git add .env.local
git add README.md
git commit -m "Core config files"
```

### 第二批：源代碼
```bash
git add src/
git commit -m "Add source code"
```

### 第三批：文檔和腳本
```bash
git add *.md
git add scripts/
git add ai-tools/
git commit -m "Add documentation and tools"
```

### 推送到GitHub
```bash
git remote add origin https://github.com/你的用戶名/inspiration-ecg-tool.git
git branch -M main
git push -u origin main
```

## 🚀 方法2：使用.gitignore減少檔案

創建 `.gitignore` 檔案：

```
# Dependencies
node_modules/
npm-debug.log*

# Build
dist/
.vercel/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Temporary
*.tmp
*.temp
```

然後一次上傳：
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

## 🚀 方法3：直接使用GitHub Desktop

1. 下載 [GitHub Desktop](https://desktop.github.com/)
2. 安裝後登入GitHub帳號
3. 點擊 "Create New Repository"
4. 選擇您的專案資料夾
5. 它會自動處理大批檔案上傳

## ⚡ 最快方案：使用ZIP上傳

1. 將整個專案資料夾壓縮成ZIP
2. 在GitHub建立新repository
3. 點擊 "uploading an existing file"
4. 拖拽ZIP檔案上傳
5. GitHub會自動解壓縮

## 📝 完成後部署到Vercel

不管用哪種方法，上傳完成後：

1. 訪問 [vercel.com](https://vercel.com)
2. 連接GitHub
3. 選擇您的repository
4. 設定環境變數
5. 點擊Deploy

**推薦使用方法2（.gitignore）或方法3（GitHub Desktop）最簡單！**