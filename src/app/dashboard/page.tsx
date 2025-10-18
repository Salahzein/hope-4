'use client'

import { useState, useEffect } from 'react'

interface Lead {
  title: string
  subreddit: string
  snippet: string
  permalink: string
  author: string
  created_utc: number
  score: number
  matched_keywords: string[]
  // Enhanced fields
  ai_relevance_score?: number
  urgency_level?: string
  business_context?: string
  problem_category?: string
  ai_summary?: string
}

interface SearchResponse {
  leads: Lead[]
  total_found: number
  message: string
  timestamp: number
  result_age_hours: number
}

interface BusinessOptions {
  businesses: string[]
}

interface IndustryOptions {
  industries: string[]
}

export default function Dashboard() {
  const [businessOptions, setBusinessOptions] = useState<string[]>([])
  const [industryOptions, setIndustryOptions] = useState<string[]>([])
  const [selectedBusiness, setSelectedBusiness] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [problemDescription, setProblemDescription] = useState('')
  const [resultCount, setResultCount] = useState<number>(100)  // Fixed result count options
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResponse | null>(null)
  const [error, setError] = useState('')
  const [userId, setUserId] = useState<string>('')
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null)
  const [showWelcome, setShowWelcome] = useState(false)

  // Generate or retrieve user ID from session storage
  useEffect(() => {
    let storedUserId = sessionStorage.getItem('reddit_lead_finder_user_id')
    if (!storedUserId) {
      storedUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      sessionStorage.setItem('reddit_lead_finder_user_id', storedUserId)
    }
    setUserId(storedUserId)

    // Check for user data from localStorage (from signup)
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setShowWelcome(true)
    }
  }, [])

  // Load business and industry options on component mount
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [businessRes, industryRes] = await Promise.all([
          fetch('https://hope-2-fa3m.onrender.com/api/leads/business-options'),
          fetch('https://hope-2-fa3m.onrender.com/api/leads/industry-options')
        ])
        
        const businessData: BusinessOptions = await businessRes.json()
        const industryData: IndustryOptions = await industryRes.json()
        
        setBusinessOptions(businessData.businesses)
        setIndustryOptions(industryData.industries)
      } catch (err) {
        console.error('Error loading options:', err)
        setError('Failed to load business/industry options')
      }
    }
    
    loadOptions()
  }, [])


  const handleBusinessChange = (business: string) => {
    setSelectedBusiness(business)
    if (business) {
      setSelectedIndustry('') // Clear industry selection
    }
  }

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry)
    if (industry) {
      setSelectedBusiness('') // Clear business selection
    }
  }

  const searchLeads = async () => {
    if (!selectedBusiness && !selectedIndustry) {
      setError('Please select either a business or industry')
      return
    }
    
    if (!problemDescription.trim()) {
      setError('Please describe the problem you are solving')
      return
    }

    if (![20, 50, 100, 150].includes(resultCount)) {
      setError('Please select a valid result count option')
      return
    }

    
    setLoading(true)
    setError('')
    setResults(null)
    
    try {
      const response = await fetch('https://hope-2-fa3m.onrender.com/api/leads/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problem_description: problemDescription.trim(),
          business: selectedBusiness || null,
          industry: selectedIndustry || null,
          user_id: userId,
          result_count: resultCount
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
      }

      const data: SearchResponse = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString()
  }

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRelevanceColor = (score?: number) => {
    if (!score) return 'bg-gray-100 text-gray-800'
    if (score >= 80) return 'bg-green-100 text-green-800'
    if (score >= 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const canSearch = (selectedBusiness || selectedIndustry) && problemDescription.trim() && [20, 50, 100, 150].includes(resultCount)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find businesses struggling with specific problems
          </h1>
          <p className="text-lg text-gray-600">
            Currently powered by Reddit for beta • LinkedIn and X scraping coming soon!
          </p>
        </div>

        {/* Welcome Message for New Users */}
        {showWelcome && user && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome to Beta, {user.name}! 🎉
                </h2>
                <p className="text-gray-600">
                  Welcome to the beta! Start finding businesses that need your solutions!
                </p>
              </div>
              <button
                onClick={() => setShowWelcome(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-4">
            {/* Business/Industry Selection First */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select a Business (Specific)
                </label>
                <select
                  value={selectedBusiness}
                  onChange={(e) => handleBusinessChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!!selectedIndustry}
                >
                  <option value="">-- Select Business --</option>
                  {businessOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select an Industry (Broader)
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => handleIndustryChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!!selectedBusiness}
                >
                  <option value="">-- Select Industry --</option>
                  {industryOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Problem Description Second */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What problem are you solving?
              </label>
              <input
                type="text"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="e.g., struggling with client acquisition, low sales, needing marketing help"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && canSearch && searchLeads()}
              />
            </div>

              
            {/* Fixed Result Count Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of results to find
                </label>
              <div className="flex items-center space-x-4">
                <select
                  value={resultCount}
                  onChange={(e) => setResultCount(parseInt(e.target.value))}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={20}>20 results</option>
                  <option value={50}>50 results</option>
                  <option value={100}>100 results</option>
                  <option value={150}>150 results</option>
                </select>
              </div>
            </div>

            <button
              onClick={searchLeads}
              disabled={loading || !canSearch}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? `Finding ${resultCount} Quality Leads...` : `Find ${resultCount} Quality Leads`}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}

        {results && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Found {results.total_found} Quality Leads
              </h2>
              <div className="text-sm text-gray-500">
                Intelligently Sorted by Relevance
                {results.result_age_hours > 0 && (
                  <span className="ml-2 text-orange-600">
                    • Results from {Math.round(results.result_age_hours)}h ago
                  </span>
                )}
                {results.result_age_hours === 0 && (
                  <span className="ml-2 text-green-600">
                    • Fresh results
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 mb-4">{results.message}</p>
            
            {/* Prominent Quality Notice Banner */}
            {results.message.includes('Request #') && results.message.includes('less relevant') && (
              <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Quality Notice:</strong> These results are from broader subreddits and may be less relevant than your first search. For best results, try refining your search terms or use a different business/industry selection.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Beta Quality Indicator */}
            {results.message.includes('Beta Quality') && (
              <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  🎯 Beta Quality: Most Relevant Subreddits
                  </span>
              </div>
            )}
            
            <div className="space-y-4">
              {results.leads.map((lead, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">
                      {lead.title}
                    </h3>
                    <div className="flex gap-2 ml-4">
                      {lead.ai_relevance_score && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(lead.ai_relevance_score)}`}>
                          Relevance: {lead.ai_relevance_score}%
                        </span>
                      )}
                      {lead.urgency_level && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(lead.urgency_level)}`}>
                          {lead.urgency_level} Urgency
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    u/{lead.author} • r/{lead.subreddit} • {formatDate(lead.created_utc)} • Score: {lead.score}
                  </div>
                  
                  <p className="text-gray-700 mb-3">
                    {lead.snippet}
                  </p>
                  
                  {lead.ai_summary && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <h4 className="text-sm font-semibold text-blue-800 mb-1">Summary:</h4>
                      <p className="text-sm text-blue-700">{lead.ai_summary}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {lead.business_context && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {lead.business_context}
                        </span>
                      )}
                      {lead.problem_category && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          {lead.problem_category}
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        Keywords: {lead.matched_keywords.join(', ')}
                      </span>
                    </div>
                    <a
                      href={lead.permalink}
          target="_blank"
          rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Post →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
