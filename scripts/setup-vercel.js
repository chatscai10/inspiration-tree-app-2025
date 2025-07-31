#!/usr/bin/env node

/**
 * 🚀 Vercel 自動化部署設定腳本
 * 自動配置 Vercel 專案和環境變數
 */

import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'
import inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'

class VercelSetup {
  constructor() {
    this.spinner = null
    this.projectConfig = null
  }

  async setupVercelProject() {
    console.log(chalk.blue.bold(`
╔══════════════════════════════════════════════════════════╗
║  🚀 Vercel 自動化部署設定                                 ║
║  📱 針對手機優先的靈感心電圖工具                          ║
╚══════════════════════════════════════════════════════════╝
    `))

    try {
      // 1. 檢查 Vercel CLI
      await this.checkVercelCLI()
      
      // 2. 設定專案配置
      await this.configureProject()
      
      // 3. 設定環境變數
      await this.setupEnvironmentVariables()
      
      // 4. 配置自定義域名（可選）
      await this.configureDomain()
      
      // 5. 設定部署鉤子
      await this.setupDeploymentHooks()
      
      // 6. 執行首次部署
      await this.performInitialDeployment()
      
      console.log(chalk.green.bold('✅ Vercel 設定完成！'))
      
    } catch (error) {
      console.error(chalk.red('❌ Vercel 設定失敗:'), error.message)
    }
  }

  async checkVercelCLI() {
    this.spinner = ora('🔍 檢查 Vercel CLI...').start()
    
    try {
      await this.execCommand('vercel --version')
      this.spinner.succeed('✅ Vercel CLI 已安裝')
    } catch (error) {
      this.spinner.fail('❌ Vercel CLI 未安裝')
      
      const { installCLI } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'installCLI',
          message: '是否要安裝 Vercel CLI？',
          default: true
        }
      ])
      
      if (installCLI) {
        this.spinner = ora('📦 正在安裝 Vercel CLI...').start()
        await this.execCommand('npm install -g vercel')
        this.spinner.succeed('✅ Vercel CLI 安裝完成')
      } else {
        throw new Error('需要 Vercel CLI 才能繼續設定')
      }
    }
  }

  async configureProject() {
    const projectConfig = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: '專案名稱:',
        default: 'inspiration-ecg-tool'
      },
      {
        type: 'list',
        name: 'framework',
        message: '選擇框架:',
        choices: [
          { name: 'Vite (推薦)', value: 'vite' },
          { name: 'Create React App', value: 'create-react-app' },
          { name: 'Next.js', value: 'nextjs' }
        ],
        default: 'vite'
      },
      {
        type: 'input',
        name: 'buildCommand',
        message: '建置指令:',
        default: 'npm run build'
      },
      {
        type: 'input',
        name: 'outputDirectory',
        message: '輸出目錄:',
        default: 'dist'
      },
      {
        type: 'confirm',
        name: 'enableAnalytics',
        message: '啟用 Vercel Analytics？',
        default: true
      },
      {
        type: 'confirm',
        name: 'enableSpeedInsights',
        message: '啟用 Speed Insights？',
        default: true
      }
    ])

    this.projectConfig = projectConfig
    
    // 更新 vercel.json 配置
    this.updateVercelConfig(projectConfig)
    
    console.log(chalk.green('✅ 專案配置完成'))
  }

  updateVercelConfig(config) {
    const vercelConfigPath = path.join(process.cwd(), 'vercel.json')
    let vercelConfig = {}
    
    if (fs.existsSync(vercelConfigPath)) {
      vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'))
    }
    
    // 更新配置
    vercelConfig.name = config.projectName
    vercelConfig.builds = [
      {
        src: "package.json",
        use: "@vercel/static-build",
        config: {
          distDir: config.outputDirectory
        }
      }
    ]
    
    // 添加 Analytics 配置
    if (config.enableAnalytics) {
      vercelConfig.analytics = { enabled: true }
    }
    
    if (config.enableSpeedInsights) {
      vercelConfig.speedInsights = { enabled: true }
    }
    
    // 手機優化配置
    vercelConfig.headers = [
      ...vercelConfig.headers || [],
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options", 
            value: "DENY"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          }
        ]
      }
    ]
    
    fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2))
  }

  async setupEnvironmentVariables() {
    console.log(chalk.blue('\n🔧 設定環境變數'))
    
    const envConfig = await inquirer.prompt([
      {
        type: 'input',
        name: 'supabaseUrl',
        message: 'Supabase URL:',
        validate: input => input.startsWith('https://') ? true : '請輸入有效的 HTTPS URL'
      },
      {
        type: 'password',
        name: 'supabaseAnonKey',
        message: 'Supabase Anon Key:',
        validate: input => input.length > 50 ? true : '請輸入有效的 Supabase Key'
      },
      {
        type: 'list',
        name: 'environment',
        message: '環境設定:',
        choices: [
          { name: 'Production Only', value: 'production' },
          { name: 'Preview & Production', value: 'all' },
          { name: 'Development, Preview & Production', value: 'development' }
        ]
      }
    ])

    // 設定環境變數
    const envCommands = [
      `vercel env add VITE_SUPABASE_URL ${envConfig.environment}`,
      `vercel env add VITE_SUPABASE_ANON_KEY ${envConfig.environment}`
    ]

    for (const command of envCommands) {
      this.spinner = ora(`設定環境變數: ${command.split(' ')[3]}`).start()
      try {
        // 注意：實際部署時需要互動式輸入
        console.log(chalk.yellow(`\n請手動執行: ${command}`))
        console.log(chalk.yellow(`並輸入對應的值`))
        this.spinner.succeed('環境變數設定指令已準備')
      } catch (error) {
        this.spinner.fail(`環境變數設定失敗: ${error.message}`)
      }
    }

    // 創建本地 .env 文件
    const localEnvContent = `
# Supabase 配置
VITE_SUPABASE_URL=${envConfig.supabaseUrl}
VITE_SUPABASE_ANON_KEY=${envConfig.supabaseAnonKey}

# 應用配置
VITE_APP_NAME=靈感心電圖
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development

# 功能開關
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_UNRESTRICTED_MODE=false
VITE_ENABLE_DEBUG=true
    `.trim()

    fs.writeFileSync('.env.local', localEnvContent)
    console.log(chalk.green('✅ 本地環境變數檔案已創建'))
  }

  async configureDomain() {
    const { customDomain } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'customDomain',
        message: '是否要設定自定義域名？',
        default: false
      }
    ])

    if (customDomain) {
      const { domain } = await inquirer.prompt([
        {
          type: 'input',
          name: 'domain',
          message: '輸入自定義域名 (例: inspiration.yourdomain.com):',
          validate: input => {
            const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
            return domainRegex.test(input) ? true : '請輸入有效的域名'
          }
        }
      ])

      console.log(chalk.blue(`\n🌐 域名設定說明:`))
      console.log(chalk.white(`1. 在你的 DNS 提供商添加 CNAME 記錄:`))
      console.log(chalk.white(`   名稱: ${domain.split('.')[0]}`))
      console.log(chalk.white(`   值: cname.vercel-dns.com`))
      console.log(chalk.white(`2. 執行: vercel domains add ${domain}`))
      console.log(chalk.white(`3. 執行: vercel alias <deployment-url> ${domain}`))
    }
  }

  async setupDeploymentHooks() {
    console.log(chalk.blue('\n🪝 設定部署鉤子'))

    const hooks = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedHooks',
        message: '選擇要啟用的部署鉤子:',
        choices: [
          { name: '自動化測試', value: 'testing' },
          { name: 'Lighthouse 性能檢查', value: 'lighthouse' },
          { name: '安全性掃描', value: 'security' },
          { name: 'SEO 檢查', value: 'seo' },
          { name: '無障礙檢查', value: 'accessibility' }
        ]
      }
    ])

    // 創建 GitHub Actions 工作流程（如果需要）
    if (hooks.selectedHooks.length > 0) {
      this.createGitHubActions(hooks.selectedHooks)
    }

    // 創建 Vercel 部署鉤子配置
    const vercelHooks = {
      "hooks": {
        "pre-build": this.generatePreBuildHooks(hooks.selectedHooks),
        "post-build": this.generatePostBuildHooks(hooks.selectedHooks)
      }
    }

    // 更新 vercel.json
    const vercelConfigPath = path.join(process.cwd(), 'vercel.json')
    const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'))
    Object.assign(vercelConfig, vercelHooks)
    fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2))

    console.log(chalk.green('✅ 部署鉤子設定完成'))
  }

  generatePreBuildHooks(selectedHooks) {
    const hooks = []
    
    if (selectedHooks.includes('testing')) {
      hooks.push('npm run test:ci')
    }
    
    if (selectedHooks.includes('security')) {
      hooks.push('npm audit --audit-level moderate')
    }
    
    return hooks
  }

  generatePostBuildHooks(selectedHooks) {
    const hooks = []
    
    if (selectedHooks.includes('lighthouse')) {
      hooks.push('npx lighthouse-ci autorun')
    }
    
    if (selectedHooks.includes('seo')) {
      hooks.push('npx next-seo-checker')
    }
    
    return hooks
  }

  createGitHubActions(selectedHooks) {
    const workflowDir = path.join(process.cwd(), '.github', 'workflows')
    if (!fs.existsSync(workflowDir)) {
      fs.mkdirSync(workflowDir, { recursive: true })
    }

    const workflow = {
      name: "Vercel 部署檢查",
      on: {
        push: { branches: ["main", "develop"] },
        pull_request: { branches: ["main"] }
      },
      jobs: {
        quality_checks: {
          "runs-on": "ubuntu-latest",
          steps: [
            {
              uses: "actions/checkout@v3"
            },
            {
              uses: "actions/setup-node@v3",
              with: { "node-version": "18" }
            },
            {
              run: "npm ci"
            }
          ]
        }
      }
    }

    // 添加選定的檢查步驟
    if (selectedHooks.includes('testing')) {
      workflow.jobs.quality_checks.steps.push({
        name: "執行測試",
        run: "npm run test:ci"
      })
    }

    if (selectedHooks.includes('lighthouse')) {
      workflow.jobs.quality_checks.steps.push({
        name: "Lighthouse CI",
        run: "npx lighthouse-ci autorun"
      })
    }

    fs.writeFileSync(
      path.join(workflowDir, 'vercel-deploy.yml'),
      `# 自動生成的 Vercel 部署工作流程\n${JSON.stringify(workflow, null, 2)}`
    )
  }

  async performInitialDeployment() {
    const { deploy } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'deploy',
        message: '是否要立即執行首次部署？',
        default: true
      }
    ])

    if (deploy) {
      this.spinner = ora('🚀 正在執行首次部署...').start()
      
      try {
        // 首先建置專案
        await this.execCommand('npm run build')
        
        // 執行 Vercel 部署
        const deployResult = await this.execCommand('vercel --prod')
        
        this.spinner.succeed('🚀 部署成功！')
        
        // 顯示部署資訊
        console.log(chalk.green('\n🎉 部署完成！'))
        console.log(chalk.blue('📱 手機優化已啟用'))
        console.log(chalk.blue('🔒 安全標頭已配置'))
        console.log(chalk.blue('⚡ 性能優化已啟用'))
        
        // 生成 QR Code 供手機測試
        this.generateMobileTestQR(deployResult)
        
      } catch (error) {
        this.spinner.fail('❌ 部署失敗')
        console.error(chalk.red('部署錯誤:'), error.message)
        
        // 提供故障排除建議
        console.log(chalk.yellow('\n🔧 故障排除建議:'))
        console.log(chalk.white('1. 檢查建置錯誤: npm run build'))
        console.log(chalk.white('2. 檢查環境變數設定'))
        console.log(chalk.white('3. 檢查 vercel.json 配置'))
        console.log(chalk.white('4. 手動部署: vercel --prod'))
      }
    }
  }

  generateMobileTestQR(deployUrl) {
    // 這裡可以整合 QR Code 生成庫
    console.log(chalk.blue('\n📱 手機測試:'))
    console.log(chalk.white(`部署 URL: ${deployUrl}`))
    console.log(chalk.white('掃描 QR Code 或直接在手機瀏覽器開啟'))
    console.log(chalk.white('測試觸控操作、響應式設計和離線功能'))
  }

  async execCommand(command) {
    return new Promise((resolve, reject) => {
      const child = spawn(command, { shell: true, stdio: 'pipe' })
      let output = ''
      
      child.stdout.on('data', (data) => {
        output += data.toString()
      })
      
      child.stderr.on('data', (data) => {
        output += data.toString()
      })
      
      child.on('close', (code) => {
        if (code === 0) {
          resolve(output)
        } else {
          reject(new Error(`Command failed with code ${code}: ${output}`))
        }
      })
    })
  }
}

// 主程序執行
if (process.argv[1] === import.meta.url.replace('file://', '')) {
  const setup = new VercelSetup()
  setup.setupVercelProject().catch(console.error)
}

export default VercelSetup