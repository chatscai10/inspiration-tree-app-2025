import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, TreePine, Bot, Lightbulb, TrendingUp } from 'lucide-react'

const MobileNavigation = () => {
  const navItems = [
    {
      to: '/',
      icon: Home,
      label: '首頁'
    },
    {
      to: '/tree',
      icon: TreePine,
      label: '樹狀圖'
    },
    {
      to: '/inspiration-feed',
      icon: TrendingUp,
      label: '靈感源'
    },
    {
      to: '/ai-analysis',
      icon: Bot,
      label: 'AI分析'
    },
    {
      to: '/random-spark',
      icon: Lightbulb,
      label: '隨機靈感'
    }
  ]
  
  return (
    <nav className="bg-white border-t border-gray-200 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary-500 bg-primary-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default MobileNavigation