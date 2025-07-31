# 🚀 超簡單部署指南（5分鐘完成）

## 方法1：最簡單的部署方式

### 步驟1：上傳到GitHub
1. 訪問 [github.com](https://github.com)
2. 點擊右上角 `+` → `New repository`
3. 輸入名稱：`inspiration-ecg-tool`
4. 點擊 `Create repository`
5. 按照頁面上的指示上傳您的檔案

### 步驟2：部署到Vercel
1. 訪問 [vercel.com](https://vercel.com)
2. 點擊 `Continue with GitHub`
3. 點擊 `New Project`
4. 找到 `inspiration-ecg-tool` → 點擊 `Import`
5. 在 `Environment Variables` 區域添加：
   ```
   Name: VITE_SUPABASE_URL
   Value: https://rpodcxdsljvuysjixztd.supabase.co
   
   Name: VITE_SUPABASE_ANON_KEY  
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwb2RjeGRzbGp2dXlzaWp4enRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTEwNjEsImV4cCI6MjA2OTU2NzA2MX0.vQBJTl-UctTEtjEXuFikXqwF3wWjJlz8g-LzcBSNeOE
   ```
6. 點擊 `Deploy`
7. 等待2-3分鐘完成！

### 步驟3：獲取您的網站URL
- 部署完成後，您會看到類似這樣的URL：
- `https://inspiration-ecg-tool-xxxx.vercel.app`

## 方法2：使用命令行（進階用戶）

```bash
# 1. 初始化Git
git init
git add .
git commit -m "Inspiration ECG Tool"

# 2. 推送到GitHub（需要先創建repository）
git remote add origin https://github.com/您的用戶名/inspiration-ecg-tool.git
git branch -M main
git push -u origin main

# 3. 其餘步驟同方法1
```

## 🎉 完成！

現在您可以：
- 在任何地方訪問您的靈感工具
- 添加到手機桌面當作APP使用
- 隨時記錄和分析靈感
- 與朋友分享您的網站

## 📱 手機使用技巧

### iPhone:
1. 用Safari開啟您的網站
2. 點擊分享按鈕
3. 選擇「加入主畫面」

### Android:
1. 用Chrome開啟您的網站
2. 點擊選單
3. 選擇「加入主畫面」

---

**需要幫助？** 
- 查看 `DEPLOYMENT_GUIDE.md` 獲取詳細說明
- 或者聯繫技術支援