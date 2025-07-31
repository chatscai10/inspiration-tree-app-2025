#!/usr/bin/env node

/**
 * 🔧 AI回覆解析和驗證系統
 * 支援多種AI工具的回覆格式，具備智能修復功能
 */

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

class AdvancedResponseParser {
  constructor() {
    this.requiredFields = [
      'contextual_analysis',
      'inspiration_deep_dive', 
      'network_insights',
      'predictive_analysis',
      'multi_perspective_analysis',
      'actionable_recommendations',
      'meta_analysis'
    ]
    
    this.unrestrictedFields = [
      'unrestricted_insights'
    ]
  }

  /**
   * 解析和驗證AI回覆
   * @param {string} responseText - AI回覆文本
   * @param {boolean} unrestrictedMode - 是否為無限制模式
   */
  parseAndValidate(responseText, unrestrictedMode = false) {
    try {
      console.log(chalk.blue('🔍 開始解析AI回覆...'))
      
      // 1. 提取JSON內容
      const jsonContent = this.extractJSON(responseText)
      
      // 2. 解析JSON
      const parsedResponse = JSON.parse(jsonContent)
      
      // 3. 結構驗證
      const structureValidation = this.validateStructure(parsedResponse, unrestrictedMode)
      
      // 4. 內容質量檢查
      const qualityCheck = this.checkQuality(parsedResponse)
      
      // 5. 連續性驗證
      const continuityCheck = this.validateContinuity(parsedResponse)
      
      // 6. 智能修復
      const repairedResponse = this.intelligentRepair(parsedResponse, {
        structure: structureValidation,
        quality: qualityCheck,
        continuity: continuityCheck
      })
      
      const overallValid = structureValidation.isValid && 
                          qualityCheck.isValid && 
                          continuityCheck.isValid

      return {
        success: overallValid,
        data: repairedResponse,
        original: parsedResponse,
        validation: {
          structure: structureValidation,
          quality: qualityCheck,
          continuity: continuityCheck
        },
        repairs: repairedResponse !== parsedResponse ? this.getRepairLog() : [],
        metadata: {
          parseTime: new Date().toISOString(),
          unrestrictedMode,
          confidence: this.calculateConfidence(parsedResponse)
        }
      }
      
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
        suggestions: this.generateErrorSuggestions(error, responseText)
      }
    }
  }

  /**
   * 從混合文本中提取JSON內容
   */
  extractJSON(text) {
    // 方法1: 尋找 ```json 代碼塊
    const jsonBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/i)
    if (jsonBlockMatch) {
      return jsonBlockMatch[1].trim()
    }
    
    // 方法2: 尋找 { 到 } 的完整JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return jsonMatch[0]
    }
    
    // 方法3: 嘗試整個文本
    if (text.trim().startsWith('{') && text.trim().endsWith('}')) {
      return text.trim()
    }
    
    throw new Error('無法找到有效的JSON內容')
  }

  /**
   * 驗證回覆結構
   */
  validateStructure(response, unrestrictedMode) {
    const errors = []
    const warnings = []
    const missing = []
    
    // 檢查必需字段
    for (const field of this.requiredFields) {
      if (!response[field]) {
        missing.push(field)
        errors.push(`缺少必需字段: ${field}`)
      } else if (typeof response[field] !== 'object') {
        errors.push(`字段 ${field} 應該是對象類型`)
      }
    }
    
    // 檢查無限制模式專用字段
    if (unrestrictedMode && !response.unrestricted_insights) {
      warnings.push('無限制模式下建議包含 unrestricted_insights 字段')
    }
    
    // 檢查字段完整性
    this.validateFieldCompleteness(response, errors, warnings)
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      missing,
      completeness: ((this.requiredFields.length - missing.length) / this.requiredFields.length) * 100
    }
  }

  /**
   * 檢查字段完整性
   */
  validateFieldCompleteness(response, errors, warnings) {
    // 檢查 contextual_analysis
    if (response.contextual_analysis) {
      const required = ['conversation_continuity_score', 'previous_suggestions_status']
      for (const field of required) {
        if (!response.contextual_analysis[field]) {
          warnings.push(`contextual_analysis 缺少 ${field}`)
        }
      }
    }
    
    // 檢查 actionable_recommendations
    if (response.actionable_recommendations) {
      const required = ['immediate_actions', 'short_term_goals', 'long_term_vision']
      for (const field of required) {
        if (!response.actionable_recommendations[field] || 
            !Array.isArray(response.actionable_recommendations[field])) {
          warnings.push(`actionable_recommendations.${field} 應該是數組`)
        }
      }
    }
    
    // 檢查 meta_analysis
    if (response.meta_analysis) {
      if (typeof response.meta_analysis.confidence_level !== 'number' ||
          response.meta_analysis.confidence_level < 0 || 
          response.meta_analysis.confidence_level > 100) {
        errors.push('confidence_level 應該是 0-100 之間的數字')
      }
    }
  }

  /**
   * 檢查內容質量
   */
  checkQuality(response) {
    const issues = []
    const suggestions = []
    
    // 檢查內容深度
    const depthScore = this.assessContentDepth(response)
    if (depthScore < 0.6) {
      issues.push('分析深度不足，建議提供更詳細的見解')
    }
    
    // 檢查可行性
    const actionabilityScore = this.assessActionability(response)
    if (actionabilityScore < 0.7) {
      issues.push('建議缺乏可操作性，需要更具體的行動步驟')
    }
    
    // 檢查創新性
    const innovationScore = this.assessInnovation(response)
    if (innovationScore < 0.5) {
      suggestions.push('可以加入更多創新和突破性的思考')
    }
    
    return {
      isValid: issues.length === 0,
      issues,
      suggestions,
      scores: {
        depth: depthScore,
        actionability: actionabilityScore,
        innovation: innovationScore
      }
    }
  }

  /**
   * 驗證對話連續性
   */
  validateContinuity(response) {
    const issues = []
    const strengths = []
    
    // 檢查是否有連續性評分
    if (response.contextual_analysis?.conversation_continuity_score) {
      const score = response.contextual_analysis.conversation_continuity_score
      if (score >= 8) {
        strengths.push('優秀的對話連續性')
      } else if (score < 5) {
        issues.push('對話連續性較弱，可能遺漏了重要上下文')
      }
    } else {
      issues.push('缺少對話連續性評分')
    }
    
    // 檢查是否引用了之前的建議
    if (response.contextual_analysis?.previous_suggestions_status) {
      strengths.push('有效追蹤了之前的建議狀態')
    } else {
      issues.push('未能有效追蹤之前的建議實施狀態')
    }
    
    return {
      isValid: issues.length === 0,
      issues,
      strengths,
      continuityScore: response.contextual_analysis?.conversation_continuity_score || 0
    }
  }

  /**
   * 智能修復功能
   */
  intelligentRepair(response, validationResults) {
    let repairedResponse = { ...response }
    this.repairLog = []
    
    // 修復缺失的必需字段
    for (const missing of validationResults.structure.missing) {
      repairedResponse[missing] = this.generateDefaultField(missing)
      this.repairLog.push(`已修復缺失字段: ${missing}`)
    }
    
    // 修復數據類型錯誤
    repairedResponse = this.repairDataTypes(repairedResponse)
    
    // 增強內容質量
    repairedResponse = this.enhanceContent(repairedResponse, validationResults.quality)
    
    // 改善連續性
    repairedResponse = this.improveContinuity(repairedResponse, validationResults.continuity)
    
    return repairedResponse
  }

  /**
   * 生成預設字段內容
   */
  generateDefaultField(fieldName) {
    const defaults = {
      contextual_analysis: {
        conversation_continuity_score: 5,
        previous_suggestions_status: [],
        user_engagement_pattern: "需要更多數據進行分析",
        evolution_trend: "持續觀察中"
      },
      inspiration_deep_dive: {
        feasibility_matrix: {},
        innovation_potential: {},
        implementation_roadmap: [],
        resource_requirements: {}
      },
      network_insights: {
        connection_patterns: [],
        cluster_analysis: {},
        synergy_opportunities: [],
        potential_conflicts: []
      },
      predictive_analysis: {
        next_inspiration_probability: {},
        market_timing_analysis: {},
        technology_readiness: {},
        success_probability: 50
      },
      multi_perspective_analysis: {
        executive_view: {},
        designer_view: {},
        technical_view: {},
        investor_view: {},
        user_view: {}
      },
      actionable_recommendations: {
        immediate_actions: ["進一步分析需求"],
        short_term_goals: ["制定詳細計劃"],
        long_term_vision: ["持續優化和改進"],
        pivot_options: []
      },
      meta_analysis: {
        confidence_level: 70,
        analysis_completeness: 80,
        follow_up_questions: ["需要更多具體信息"]
      }
    }
    
    return defaults[fieldName] || {}
  }

  /**
   * 修復數據類型
   */
  repairDataTypes(response) {
    // 確保數組字段是數組
    const arrayFields = [
      'actionable_recommendations.immediate_actions',
      'actionable_recommendations.short_term_goals', 
      'actionable_recommendations.long_term_vision',
      'actionable_recommendations.pivot_options'
    ]
    
    for (const fieldPath of arrayFields) {
      const value = this.getNestedValue(response, fieldPath)
      if (value && !Array.isArray(value)) {
        this.setNestedValue(response, fieldPath, [value])
        this.repairLog.push(`已修復數組類型: ${fieldPath}`)
      }
    }
    
    return response
  }

  /**
   * 增強內容質量
   */
  enhanceContent(response, qualityCheck) {
    if (qualityCheck.scores.actionability < 0.7) {
      // 增強可操作性
      if (response.actionable_recommendations?.immediate_actions) {
        response.actionable_recommendations.immediate_actions = 
          response.actionable_recommendations.immediate_actions.map(action => 
            typeof action === 'string' ? 
              `${action} (建議在1-2天內完成)` : action
          )
        this.repairLog.push('已增強建議的可操作性')
      }
    }
    
    return response
  }

  /**
   * 改善連續性
   */
  improveContinuity(response, continuityCheck) {
    if (continuityCheck.continuityScore < 5) {
      if (!response.contextual_analysis.previous_suggestions_status) {
        response.contextual_analysis.previous_suggestions_status = [
          "建議補充之前對話的具體參考信息"
        ]
        this.repairLog.push('已添加連續性改善建議')
      }
    }
    
    return response
  }

  /**
   * 評估內容深度
   */
  assessContentDepth(response) {
    let score = 0
    let totalFields = 0
    
    for (const field of this.requiredFields) {
      totalFields++
      if (response[field]) {
        const fieldDepth = Object.keys(response[field]).length
        score += Math.min(fieldDepth / 3, 1) // 每個字段最多3個子項得滿分
      }
    }
    
    return totalFields > 0 ? score / totalFields : 0
  }

  /**
   * 評估可操作性
   */
  assessActionability(response) {
    const recommendations = response.actionable_recommendations
    if (!recommendations) return 0
    
    let score = 0
    const actions = [
      ...(recommendations.immediate_actions || []),
      ...(recommendations.short_term_goals || []),
      ...(recommendations.long_term_vision || [])
    ]
    
    for (const action of actions) {
      if (typeof action === 'string' && action.length > 10) {
        score += 1
      } else if (typeof action === 'object' && action.description) {
        score += 1.5
      }
    }
    
    return Math.min(score / 10, 1) // 10個詳細行動項得滿分
  }

  /**
   * 評估創新性
   */
  assessInnovation(response) {
    const innovationKeywords = [
      '創新', '突破', '顛覆', '革命性', '前所未有', 
      'innovation', 'breakthrough', 'disruptive', 'revolutionary'
    ]
    
    const text = JSON.stringify(response).toLowerCase()
    let keywordCount = 0
    
    for (const keyword of innovationKeywords) {
      if (text.includes(keyword.toLowerCase())) {
        keywordCount++
      }
    }
    
    return Math.min(keywordCount / 5, 1) // 5個創新關鍵詞得滿分
  }

  /**
   * 計算整體信心度
   */
  calculateConfidence(response) {
    const metaConfidence = response.meta_analysis?.confidence_level || 70
    const structuralCompleteness = this.assessStructuralCompleteness(response)
    const contentRichness = this.assessContentRichness(response)
    
    return Math.round((metaConfidence * 0.5 + structuralCompleteness * 0.3 + contentRichness * 0.2))
  }

  assessStructuralCompleteness(response) {
    const present = this.requiredFields.filter(field => response[field]).length
    return (present / this.requiredFields.length) * 100
  }

  assessContentRichness(response) {
    const totalContent = JSON.stringify(response).length
    return Math.min(totalContent / 5000, 1) * 100 // 5000字符得滿分
  }

  /**
   * 生成錯誤建議
   */
  generateErrorSuggestions(error, originalText) {
    const suggestions = []
    
    if (error.message.includes('JSON')) {
      suggestions.push('確認AI回覆包含有效的JSON格式')
      suggestions.push('檢查是否有未閉合的括號或引號')
      suggestions.push('嘗試使用JSON驗證工具檢查格式')
    }
    
    if (originalText.length < 500) {
      suggestions.push('AI回覆似乎太短，可能未完整生成')
      suggestions.push('嘗試要求AI提供更詳細的分析')
    }
    
    if (!originalText.includes('{')) {
      suggestions.push('回覆中沒有找到JSON內容')
      suggestions.push('確認AI理解了JSON格式要求')
    }
    
    return suggestions
  }

  /**
   * 輔助方法：獲取嵌套值
   */
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  /**
   * 輔助方法：設置嵌套值
   */
  setNestedValue(obj, path, value) {
    const keys = path.split('.')
    const lastKey = keys.pop()
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {}
      return current[key]
    }, obj)
    target[lastKey] = value
  }

  getRepairLog() {
    return this.repairLog || []
  }

  /**
   * 格式化顯示結果
   */
  formatForDisplay(parsedData) {
    return {
      // 上下文分析區塊
      contextSection: {
        title: "🔗 對話連續性分析",
        content: parsedData.contextual_analysis,
        score: parsedData.contextual_analysis?.conversation_continuity_score
      },
      
      // 深度分析區塊
      analysisSection: {
        title: "🧠 深度靈感分析",
        content: parsedData.inspiration_deep_dive,
        feasibility: parsedData.inspiration_deep_dive?.feasibility_matrix
      },
      
      // 網絡洞察區塊
      networkSection: {
        title: "🕸️ 靈感關聯網絡",
        content: parsedData.network_insights,
        connections: parsedData.network_insights?.connection_patterns
      },
      
      // 多視角分析區塊
      perspectiveSection: {
        title: "👥 多角度分析",
        content: parsedData.multi_perspective_analysis
      },
      
      // 預測分析區塊
      predictiveSection: {
        title: "🔮 預測性洞察",
        content: parsedData.predictive_analysis,
        probability: parsedData.predictive_analysis?.success_probability
      },
      
      // 行動建議區塊
      recommendationsSection: {
        title: "🎯 具體行動建議",
        immediate: parsedData.actionable_recommendations?.immediate_actions || [],
        shortTerm: parsedData.actionable_recommendations?.short_term_goals || [],
        longTerm: parsedData.actionable_recommendations?.long_term_vision || []
      },
      
      // 無限制模式區塊（如果存在）
      unrestrictedSection: parsedData.unrestricted_insights ? {
        title: "🚨 無限制分析洞察",
        content: parsedData.unrestricted_insights,
        warning: "此內容包含突破性分析，請謹慎使用"
      } : null,
      
      // 元數據區塊
      metaSection: {
        title: "📊 分析元數據",
        confidence: parsedData.meta_analysis?.confidence_level,
        completeness: parsedData.meta_analysis?.analysis_completeness,
        followUp: parsedData.meta_analysis?.follow_up_questions || []
      }
    }
  }
}

// 命令行使用
if (process.argv[1] === path.resolve(process.argv[1])) {
  const parser = new AdvancedResponseParser()
  
  if (process.argv[2]) {
    const responseFile = process.argv[2]
    const unrestrictedMode = process.argv.includes('--unrestricted')
    
    try {
      const responseText = fs.readFileSync(responseFile, 'utf8')
      const result = parser.parseAndValidate(responseText, unrestrictedMode)
      
      console.log(chalk.green('解析結果:'))
      console.log(JSON.stringify(result, null, 2))
      
    } catch (error) {
      console.error(chalk.red('解析失敗:'), error.message)
    }
  } else {
    console.log(chalk.blue('使用方法: node response-parser.js <response-file> [--unrestricted]'))
  }
}

export default AdvancedResponseParser