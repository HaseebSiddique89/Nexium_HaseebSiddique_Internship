// src/components/QuoteForm.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Sparkles, Zap, ChevronDown } from 'lucide-react'

const quotesData: Record<string, string[]> = {
  motivation: [
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "Every day is a second chance to rewrite your story and become the person you've always dreamed of being.",
    "Push yourself because no one else is going to do it for you. Your only limit is the voice in your head saying you can't."
  ],
  success: [
    "Success is not in what you have, but in who you are and the positive impact you create in the world.",
    "Don't watch the clock; do what it does. Keep going, keep growing, keep believing in your dreams.",
    "Success usually comes to those who are too busy building their dreams to worry about their fears."
  ],
  life: [
    "Life is what happens when you're busy making other plans. Embrace the unexpected and find joy in the journey.",
    "Keep smiling, because life is a beautiful thing and there's so much to smile about every single day.",
    "The purpose of our lives is to be happy, to spread love, and to leave the world a little better than we found it."
  ],
  wisdom: [
    "The only true wisdom is in knowing you know nothing, and in that knowledge lies infinite possibility.",
    "Wisdom is not a product of schooling but of the lifelong attempt to acquire it through experience.",
    "The wise person learns from the mistakes of others, the average person from their own, and the fool from neither."
  ],
  love: [
    "Love is not just a feeling, it's a choice we make every day to see the beauty in ourselves and others.",
    "The greatest thing you'll ever learn is just to love and be loved in return.",
    "Love yourself first, and everything else falls into line. You really have to love yourself to get anything done."
  ]
}

interface QuoteFormProps {
  onGenerateQuotes: (topic: string) => void;
  loading: boolean;
}

export default function QuoteForm({ onGenerateQuotes, loading }: QuoteFormProps) {
  const [topic, setTopic] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const suggestions = Object.keys(quotesData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!topic.trim()) {
      return;
    }
    onGenerateQuotes(topic);
    setShowSuggestions(false);
  }

  const selectSuggestion = (suggestion: string) => {
    setTopic(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Enter your topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 h-10 pl-10 pr-4 bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl text-white placeholder-white/50 text-sm focus:border-purple-400 focus:ring-purple-400/30 transition-all duration-300"
          />
          <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          
          <Button
            type="button"
            onClick={() => setShowSuggestions(prev => !prev)}
            className="ml-2 h-10 px-3 bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl text-white/80 hover:text-white transition-all duration-300"
          >
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showSuggestions ? 'rotate-180' : ''}`} />
          </Button>

          {showSuggestions && (
            <div className="absolute top-full right-0 mt-2 w-full md:w-[calc(100%-50px)] min-w-[180px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-2xl z-10 overflow-hidden">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => selectSuggestion(suggestion)}
                  className="w-full text-left px-4 py-2 text-white/80 hover:bg-white/5 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl capitalize text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          disabled={loading || !topic.trim()}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>Generating Magic...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Generate Quotes</span>
            </div>
          )}
        </Button>
      </form>
    </div>
  )
}