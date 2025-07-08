// src/components/QuotesDisplay.tsx
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Copy, Heart, Share2, Quote, Sparkles } from 'lucide-react'

interface QuotesDisplayProps {
  quotes: string[];
  loading: boolean;
  copied: number | null;
  liked: number[];
  onCopy: (text: string, index: number) => void;
  onLike: (index: number) => void;
  errorMessage: string | null;
}

export default function QuotesDisplay({
  quotes,
  loading,
  copied,
  liked,
  onCopy,
  onLike,
  errorMessage,
}: QuotesDisplayProps) {
  const handleShare = (quote: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Inspiring Quote',
        text: quote,
        url: window.location.href
      })
    }
  }

  // Content for when there are no quotes, loading, or an error
  const emptyStateContent = (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white/5 dark:bg-black/5 rounded-2xl border border-white/10 dark:border-white/5 shadow-inner">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-xl opacity-30 animate-spin-slow"></div>
            <Loader2 className="animate-spin text-purple-400 w-16 h-16 relative" />
          </div>
          <p className="text-xl font-semibold text-white mb-2">Generating Magic...</p>
          <p className="text-white/70 text-sm">Crafting the perfect words just for you.</p>
        </div>
      ) : errorMessage ? (
        <div className="flex flex-col items-center justify-center text-red-400">
          <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xl font-semibold mb-2">{errorMessage}</p>
          <p className="text-red-300 text-sm">Please try a different topic.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-white/70">
          <Sparkles className="w-16 h-16 mb-4 text-purple-400" />
          <p className="text-xl font-semibold text-white mb-2">Your Quotes Will Appear Here</p>
          <p className="text-white/70 text-sm">Enter a topic on the left to generate inspiring quotes.</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      {quotes.length === 0 && !loading && !errorMessage ? (
        emptyStateContent
      ) : errorMessage ? (
        emptyStateContent
      ) : quotes.length > 0 ? (
        <div className="grid gap-6">
          {quotes.map((quote, index) => (
            <Card 
              key={index} 
              className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 dark:hover:from-purple-900/60 dark:hover:to-indigo-900/60" // Added hover gradient background
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Quote className="w-6 h-6 text-purple-300 shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-white text-base leading-relaxed mb-4 font-medium">
                      {quote}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <button
                        onClick={() => onCopy(quote, index)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 text-sm ${
                          copied === index 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
                        }`}
                      >
                        <Copy className="w-4 h-4" />
                        {copied === index ? 'Copied!' : 'Copy'}
                      </button>
                      
                      <button
                        onClick={() => onLike(index)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 text-sm ${
                          liked.includes(index) 
                            ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' 
                            : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${liked.includes(index) ? 'fill-current' : ''}`} />
                        {liked.includes(index) ? 'Liked' : 'Like'}
                      </button>
                      
                      <button
                        onClick={() => handleShare(quote)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/80 hover:text-white transition-all duration-200 text-sm"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        emptyStateContent
      )}
    </div>
  )
}