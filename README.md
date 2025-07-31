# 🌳 靈感心電圖拼圖工具

> 手機優先的智能靈感管理系統，結合AI分析的樹狀靈感分類工具

## ✨ 系統特色

- 📱 **手機優先設計** - 完美的觸控體驗和響應式介面
- 🌳 **樹狀靈感分類** - 樹頭→樹幹→樹枝→樹葉的層次化管理
- 🤖 **AI智能分析** - 零API費用的本地AI整合方案
- 🔄 **連續對話系統** - AI記憶上下文，持續深入分析
- 📊 **拼圖式報告** - 多個靈感片段組合成完整開發報告書

## 🚀 快速開始

### 1. 安裝依賴
```bash
npm install
```

### 2. 設定免費服務
```bash
# 設定 Supabase 資料庫
npm run setup:supabase

# 設定 Vercel 部署
npm run setup:vercel

# 安裝本地 AI 工具
npm run setup:ai-tools
```

### 3. 啟動開發服務
```bash
npm run dev
```

### 4. 使用 AI 分析
```bash
# 一鍵 AI 分析
npm run ai-analyze

# 同步數據
npm run sync-data
```

## 📱 手機端操作

- **快速輸入** - 語音、拍照、快速筆記
- **手勢操作** - 滑動、縮放、長按選單
- **離線支援** - 本地儲存，自動同步
- **觸控優化** - 44px 最小觸控目標

## 🤖 AI 整合方式

1. 點擊網站上的「AI分析」按鈕
2. 系統自動生成分析指令
3. 複製指令到 Claude/Cursor/ChatGPT
4. 將AI回覆貼回系統
5. 自動解析並顯示分析結果

## 🏗️ 技術架構

- **前端**: React 18 + Vite + Tailwind CSS
- **視覺化**: React Flow (樹狀圖)
- **後端**: Supabase (PostgreSQL + Auth + API)
- **託管**: Vercel (免費)
- **本地工具**: Node.js + 互動式 CLI

## 📂 專案結構

```
靈感心電圖/
├── src/                    # React 前端源碼
│   ├── components/         # 手機優化組件
│   ├── pages/             # 頁面組件
│   ├── hooks/             # 自定義 Hooks
│   ├── utils/             # 工具函數
│   └── styles/            # 樣式文件
├── ai-tools/              # 本地AI工具
│   ├── main-analyzer.js   # 主要分析工具
│   ├── prompt-generator.js # 指令生成器
│   └── response-parser.js # 回覆解析器
├── scripts/               # 設定腳本
├── supabase/              # 資料庫配置
└── public/                # 靜態資源
```

## 🔧 核心功能

### 靈感管理
- ✅ 樹狀分類系統
- ✅ 快速輸入介面
- ✅ 標籤和分類
- ✅ 搜尋和篩選

### AI 分析
- ✅ 上下文連續性
- ✅ 標準化回覆格式
- ✅ 建議追蹤系統
- ✅ 報告生成

### 手機體驗
- ✅ 觸控友善介面
- ✅ 手勢操作支援
- ✅ 離線同步功能
- ✅ 快速輸入模式

## 📄 授權

MIT License - 自由使用和修改

---

🚀 **立即開始使用，讓AI幫助您整理和發展靈感！**
