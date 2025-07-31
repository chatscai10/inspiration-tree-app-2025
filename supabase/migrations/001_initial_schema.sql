-- 創建靈感心電圖應用的資料庫架構

-- 啟用必要的擴展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 用戶配置表
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 靈感分類表 (樹頭)
CREATE TABLE IF NOT EXISTS inspiration_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#3b82f6',
    icon TEXT DEFAULT '🌳',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 靈感子分類表 (樹幹)
CREATE TABLE IF NOT EXISTS inspiration_subcategories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_id UUID REFERENCES inspiration_categories(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 靈感項目表 (樹枝)
CREATE TABLE IF NOT EXISTS inspirations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES inspiration_categories(id) ON DELETE SET NULL,
    subcategory_id UUID REFERENCES inspiration_subcategories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    content TEXT,
    status TEXT DEFAULT 'idea' CHECK (status IN ('idea', 'developing', 'completed', 'archived')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 靈感詳細資料表 (樹葉)
CREATE TABLE IF NOT EXISTS inspiration_details (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    inspiration_id UUID REFERENCES inspirations(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    type TEXT DEFAULT 'note' CHECK (type IN ('note', 'image', 'link', 'file', 'voice')),
    content TEXT,
    file_url TEXT,
    metadata JSONB DEFAULT '{}',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI分析對話表
CREATE TABLE IF NOT EXISTS ai_conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    inspiration_id UUID REFERENCES inspirations(id) ON DELETE CASCADE,
    conversation_thread_id TEXT NOT NULL,
    ai_prompt TEXT NOT NULL,
    ai_response JSONB,
    user_feedback TEXT,
    context_data JSONB DEFAULT '{}',
    analysis_type TEXT DEFAULT 'general',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'error')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 靈感連結表 (建立靈感之間的關聯)
CREATE TABLE IF NOT EXISTS inspiration_connections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    source_inspiration_id UUID REFERENCES inspirations(id) ON DELETE CASCADE NOT NULL,
    target_inspiration_id UUID REFERENCES inspirations(id) ON DELETE CASCADE NOT NULL,
    connection_type TEXT DEFAULT 'related' CHECK (connection_type IN ('related', 'depends_on', 'leads_to', 'conflict_with')),
    description TEXT,
    strength INTEGER DEFAULT 5 CHECK (strength >= 1 AND strength <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- 確保不會有重複的連結
    UNIQUE(source_inspiration_id, target_inspiration_id)
);

-- 開發報告表
CREATE TABLE IF NOT EXISTS development_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    inspiration_ids UUID[] NOT NULL,
    report_data JSONB NOT NULL,
    ai_analysis JSONB,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 靈感源/時事觸發器記錄表
CREATE TABLE IF NOT EXISTS inspiration_feed_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    source TEXT NOT NULL,
    category TEXT NOT NULL,
    content_url TEXT,
    inspiration_trigger TEXT,
    metadata JSONB DEFAULT '{}',
    is_saved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建索引以提升查詢效能
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_inspiration_categories_user_id ON inspiration_categories(user_id);
CREATE INDEX IF NOT EXISTS idx_inspirations_user_id ON inspirations(user_id);
CREATE INDEX IF NOT EXISTS idx_inspirations_category_id ON inspirations(category_id);
CREATE INDEX IF NOT EXISTS idx_inspirations_created_at ON inspirations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inspirations_status ON inspirations(status);
CREATE INDEX IF NOT EXISTS idx_inspirations_tags ON inspirations USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_thread_id ON ai_conversations(conversation_thread_id);
CREATE INDEX IF NOT EXISTS idx_inspiration_feed_items_user_id ON inspiration_feed_items(user_id);
CREATE INDEX IF NOT EXISTS idx_inspiration_feed_items_created_at ON inspiration_feed_items(created_at DESC);

-- 創建更新時間戳的函數
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 為需要的表格添加自動更新時間戳觸發器
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inspiration_categories_updated_at BEFORE UPDATE ON inspiration_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inspiration_subcategories_updated_at BEFORE UPDATE ON inspiration_subcategories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inspirations_updated_at BEFORE UPDATE ON inspirations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inspiration_details_updated_at BEFORE UPDATE ON inspiration_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_conversations_updated_at BEFORE UPDATE ON ai_conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_development_reports_updated_at BEFORE UPDATE ON development_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) 設定
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspiration_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspiration_subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspirations ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspiration_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspiration_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE development_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspiration_feed_items ENABLE ROW LEVEL SECURITY;

-- RLS 策略 - 用戶只能存取自己的資料
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage own categories" ON inspiration_categories FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own subcategories" ON inspiration_subcategories FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own inspirations" ON inspirations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own inspiration details" ON inspiration_details FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own ai conversations" ON ai_conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own inspiration connections" ON inspiration_connections FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own development reports" ON development_reports FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own feed items" ON inspiration_feed_items FOR ALL USING (auth.uid() = user_id);

-- 創建用戶註冊時自動建立 profile 的函數
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 創建觸發器在新用戶註冊時自動建立 profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();