// src/components/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { Switch } from '@/components/ui/switch'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <div className="flex items-center gap-3 p-2">
      {/* Sun Icon */}
      <div className={`transition-all duration-300 ${!isDark ? 'text-yellow-400 scale-110' : 'text-white/40 scale-100'}`}>
        <Sun className="w-5 h-5" />
      </div>
      
      {/* Enhanced Switch */}
      <div className="relative">
        <Switch
          checked={isDark}
          onCheckedChange={(val) => setTheme(val ? 'dark' : 'light')}
          className="relative w-12 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-purple-600 dark:to-blue-600 border-0 shadow-lg transition-all duration-300"
        />
        {/* Glow effect - Added pointer-events-none */}
        <div className={`absolute inset-0 rounded-full blur-md transition-all duration-300 pointer-events-none ${ // <-- ADDED THIS CLASS
          isDark 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500 opacity-60' 
            : 'bg-gradient-to-r from-yellow-300 to-orange-300 opacity-60'
        }`}></div>
      </div>

      {/* Moon Icon */}
      <div className={`transition-all duration-300 ${isDark ? 'text-blue-300 scale-110' : 'text-white/40 scale-100'}`}>
        <Moon className="w-5 h-5" />
      </div>
    </div>
  )
}