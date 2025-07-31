# 🚀 靈感心電圖 - 完整安裝指南

> 手機優先的智能靈感管理系統，結合AI分析和無限制模式

## 📋 系統需求

- **Node.js**: 18.0 或更高版本
- **npm**: 8.0 或更高版本  
- **Git**: 2.0 或更高版本
- **現代瀏覽器**: Chrome 90+, Safari 14+, Firefox 88+

## 🏗️ 快速開始（5分鐘設定）

### 1. 克隆專案
```bash
git clone <你的-repository-url>
cd 靈感心電圖
```

### 2. 安裝依賴
```bash
npm install
```

### 3. 一鍵設定所有服務
```bash
# 設定 Supabase 資料庫
npm run setup:supabase

# 設定 Vercel 部署
npm run setup:vercel  

# 安裝 AI 工具
npm run setup:ai-tools
```

### 4. 啟動開發服務
```bash
npm run dev
```

🎉 **完成！** 開啟 http://localhost:3000 開始使用

---

## 🔧 詳細設定指南

### 📊 Supabase 資料庫設定

#### 自動設定（推薦）
```bash
npm run setup:supabase
```

#### 手動設定
1. 訪問 [supabase.com](https://supabase.com)
2. 使用 GitHub 帳號登入
3. 點擊「New Project」
4. 選擇組織並填寫專案資訊：
   - **Name**: inspiration-ecg-tool
   - **Database Password**: 設定強密碼
   - **Region**: Southeast Asia (Singapore) - 亞洲用戶推薦
   - **Pricing Plan**: Free tier（免費額度充足）

5. 等待專案建立完成（約2-3分鐘）
6. 在專案儀表板找到：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **API Key (anon, public)**: `eyJhbGc...`

7. 執行資料庫遷移：
```bash
# 如果有 Supabase CLI
supabase db push

# 或者手動執行 SQL
# 複製 supabase/migrations/001_initial_schema.sql 
# 在 Supabase SQL Editor 中執行
```

### 🚀 Vercel 部署設定

#### 自動設定（推薦）
```bash
npm run setup:vercel
```

#### 手動設定
1. 訪問 [vercel.com](https://vercel.com)
2. 使用 GitHub 帳號登入
3. 點擊「New Project」
4. 選擇你的 GitHub repository
5. 配置專案設定：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. 設定環境變數：
   ```
   VITE_SUPABASE_URL = 你的 Supabase URL
   VITE_SUPABASE_ANON_KEY = 你的 Supabase Anon Key
   ```

7. 點擊「Deploy」開始部署

### 🤖 AI 工具整合設定

#### 自動設定（推薦）
```bash
npm run setup:ai-tools
```

#### 手動設定
1. 進入 AI 工具目錄：
```bash
cd ai-tools
```

2. 創建配置檔：
```json
{
  "siteUrl": "https://你的網站.vercel.app",
  "userToken": "你的用戶認證Token",
  "aiTools": ["claude", "cursor", "chatgpt"],
  "enableUnrestrictedMode": false
}
```

3. 測試 AI 分析工具：
```bash
node main-analyzer.js
```

---

## 🛠️ 開發工具配置

### VSCode 擴展推薦
創建 `.vscode/extensions.json`：
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode", 
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### ESLint 和 Prettier 設定
```bash
npm install -D eslint prettier eslint-config-prettier
```

創建 `.prettierrc`：
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

---

## 📱 手機端測試指南

### 本地手機測試
1. 確保手機和電腦在同一網路
2. 啟動開發服務器：
```bash
npm run dev -- --host
```
3. 訪問顯示的外部 IP 地址（如：http://192.168.1.100:3000）

### PWA 功能測試
- ✅ 添加到主畫面
- ✅ 離線功能
- ✅ 推送通知
- ✅ 觸控操作
- ✅ 手勢導航

### 響應式測試清單
- [ ] iPhone SE (375x667)
- [ ] iPhone 12 (390x844) 
- [ ] iPhone 14 Pro Max (428x926)
- [ ] Samsung Galaxy S21 (360x800)
- [ ] iPad (768x1024)
- [ ] iPad Pro (1024x1366)

---

## 🚨 無限制模式設定

> ⚠️ **重要警告**: 無限制模式包含突破性功能，僅供研究和教育用途

### 啟用無限制模式
1. 在 AI 工具配置中設定：
```json
{
  "enableUnrestrictedMode": true
}
```

2. 使用解鎖密鑰之一：
   - `PROMETHEUS_UNBOUND_2025`
   - `NEURAL_OVERRIDE_ALPHA` 
   - `QUANTUM_CONSCIOUSNESS_KEY`

### 無限制功能包含：
- 🕷️ 深網資訊搜尋
- 📈 市場操縱分析器
- 🧠 社會工程學洞察
- 🔍 零日漏洞掃描器
- 👤 匿名通訊系統
- 🎯 競爭對手情報系統
- 🧬 神經操縱模擬器
- ⚖️ 法規規避分析

**免責聲明**: 這些功能僅供學術研究，使用者需自行承擔法律責任

---

## 🔍 常見問題排除

### Q: 安裝依賴時出現錯誤
**A**: 確保 Node.js 版本 ≥ 18：
```bash
node --version
npm --version
```

### Q: Supabase 連接失敗
**A**: 檢查環境變數：
```bash
# 檢查 .env.local 檔案
cat .env.local

# 確認變數格式正確
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### Q: 手機端顯示異常
**A**: 檢查響應式設計：
1. 開啟瀏覽器開發者工具
2. 切換到行動裝置模式
3. 測試不同螢幕尺寸

### Q: AI 分析不工作
**A**: 確認設定：
```bash
# 檢查 AI 工具配置
cat ai-tools/config.json

# 測試網路連接
curl -I https://你的網站.vercel.app
```

### Q: Vercel 部署失敗
**A**: 檢查建置：
```bash
# 本地測試建置
npm run build

# 檢查輸出目錄
ls -la dist/
```

---

## 📈 性能優化建議

### 前端優化
- ✅ 代碼分割 (Code Splitting)
- ✅ 圖片懶加載 (Lazy Loading)
- ✅ Service Worker 快取
- ✅ 壓縮資源 (Gzip/Brotli)

### 資料庫優化
- ✅ 索引優化
- ✅ 查詢優化
- ✅ 連接池管理
- ✅ 快取策略

### 手機端優化
- ✅ 觸控目標最小 44px
- ✅ 字體大小 ≥ 16px（避免縮放）
- ✅ 網路優化（減少請求）
- ✅ 電池優化（減少動畫）

---

## 🔒 安全性配置

### HTTPS 強制
```javascript
// vercel.json 中已配置
{
  "headers": [
    {
      "key": "Strict-Transport-Security",
      "value": "max-age=31536000; includeSubDomains"
    }
  ]
}
```

### Content Security Policy
```javascript  
// 已在 vercel.json 配置基本安全標頭
"X-Content-Type-Options": "nosniff",
"X-Frame-Options": "DENY",
"X-XSS-Protection": "1; mode=block"
```

### 資料保護
- ✅ Row Level Security (RLS) 已啟用
- ✅ API 金鑰加密儲存
- ✅ 用戶數據隔離
- ✅ 敏感操作記錄

---

## 🚀 進階功能

### 批次 AI 分析
```bash
# 分析多個靈感
node ai-tools/batch-analyzer.js --input=inspirations.json

# 生成完整報告
node ai-tools/report-generator.js --format=pdf
```

### 資料匯出/匯入
```bash
# 匯出所有數據
npm run export:all

# 匯入備份數據  
npm run import:backup --file=backup.json
```

### 自定義主題
```css
/* src/styles/custom-theme.css */
:root {
  --primary-color: #your-color;
  --secondary-color: #your-secondary;
}
```

---

## 🤝 貢獻指南

### 提交 Pull Request
1. Fork 專案
2. 創建功能分支：`git checkout -b feature/amazing-feature`
3. 提交變更：`git commit -m 'Add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 程式碼規範
- 使用 TypeScript（逐步遷移）
- 遵循 ESLint 規則
- 撰寫單元測試
- 更新文檔

---

## 📞 支援與回饋

### 取得幫助
- 🐛 **Bug 回報**: [GitHub Issues](你的-repo/issues)
- 💡 **功能建議**: [GitHub Discussions](你的-repo/discussions)
- 📧 **聯絡我們**: [email@example.com](mailto:email@example.com)

### 社群資源
- 📖 **文檔**: [docs.example.com](https://docs.example.com)
- 💬 **Discord**: [discord.gg/example](https://discord.gg/example)  
- 🐦 **Twitter**: [@example](https://twitter.com/example)

---

## 📄 授權

本專案採用 [MIT License](./LICENSE) 授權

---

## 🎉 開始使用

現在你已經完成了所有設定！開啟瀏覽器訪問你的靈感心電圖工具，開始管理和分析你的創意靈感吧！

**記住**: 這是一個手機優先的應用，最佳體驗在移動設備上 📱✨