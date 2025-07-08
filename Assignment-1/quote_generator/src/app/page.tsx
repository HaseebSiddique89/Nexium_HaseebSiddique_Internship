// src/app/page.tsx
'use client'

import { useState } from 'react'
import QuoteForm from '@/components/QuoteForm'
import QuotesDisplay from '@/components/QuotesDisplay'

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

export default function Home() {
  const [quotes, setQuotes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<number | null>(null)
  const [liked, setLiked] = useState<number[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleGenerateQuotes = (topic: string) => {
    setLoading(true)
    setQuotes([])
    setErrorMessage(null)

    const normalizedTopic = topic.toLowerCase();
    const resultQuotes = quotesData[normalizedTopic];

    setTimeout(() => {
      if (resultQuotes && resultQuotes.length > 0) {
        setQuotes(resultQuotes);
      } else {
        setQuotes([]);
        setErrorMessage("The entered topic is not valid.");
      }
      setLoading(false);
    }, 1500);
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  const toggleLike = (index: number) => {
    setLiked(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row relative">
      {/* Animated Background - Applied to entire screen */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-zinc-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-xl opacity-20 animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-20 animate-pulse delay-500"></div>
        
        {/* Additional floating elements for mobile */}
        <div className="absolute top-1/4 right-10 w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-14 h-14 bg-gradient-to-r from-pink-400 to-red-400 rounded-full blur-xl opacity-20 animate-bounce delay-300"></div>
      </div>

      {/* Main Content Area: Two Columns (or stacked on small screens) */}
      <div className="relative z-10 flex flex-grow items-stretch flex-col md:flex-row gap-8 py-8 md:py-0"> 
        {/* Left Column: Form and Header - No Scroll */}
        <div className="flex flex-col items-center justify-center p-4 md:py-10 md:pr-4 md:flex-1"> 
          <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center h-full space-y-8 md:space-y-0">
            {/* Header Section */}
            <div className="text-center mb-4 md:mb-auto space-y-6">
              <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-snug">
                Quote <span className="text-3xl md:text-4xl">Generator</span>
              </h1>

              <p className="text-base text-white/80 max-w-xl mx-auto leading-relaxed px-2">
                Transform your thoughts into inspiration with our AI-powered quote generator.
                <span className="block mt-2 text-purple-200">Discover wisdom that resonates with your soul.</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8 text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Instant Generation</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                  <span>Multiple Topics</span>
                </div>
              </div>
            </div>

            {/* Form Card - Specific adjustments for width and centering */}
            <div className="relative group w-full max-w-sm mx-auto px-0 mt-8 md:mt-auto mb-4 md:mb-auto"> 
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-5 md:p-6 border border-white/10 shadow-2xl">
                <QuoteForm onGenerateQuotes={handleGenerateQuotes} loading={loading} />
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-4 md:mt-auto grid grid-cols-3 gap-4 text-center w-full px-4 mb-4 md:mb-0">
              <div className="space-y-1">
                <div className="text-lg sm:text-xl font-bold text-white">10K+</div>
                <div className="text-xs sm:text-sm text-white/60 leading-tight">Quotes Generated</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg sm:text-xl font-bold text-white">50+</div>
                <div className="text-xs sm:text-sm text-white/60 leading-tight">Categories</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg sm:text-xl font-bold text-white">99.9%</div>
                <div className="text-xs sm:text-sm text-white/60 leading-tight">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quotes Display - Removed background override */}
        <div className="flex-1 flex flex-col py-4 px-4 md:py-8 md:pl-4 overflow-y-auto custom-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] md:pr-0 min-h-0">
          <div className="w-full max-w-xl mx-auto h-full">
            <QuotesDisplay
              quotes={quotes}
              loading={loading}
              copied={copied}
              liked={liked}
              onCopy={copyToClipboard}
              onLike={toggleLike}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </main>
  )
}