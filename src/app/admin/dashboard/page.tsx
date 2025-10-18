'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface User {
  id: number
  email: string
  name: string
  company?: string
  beta_code: string
  is_active: boolean
  created_at: string
}

interface BetaCode {
  id: number
  code: string
  is_used: boolean
  used_by_user_id?: number
  created_at: string
  used_at?: string
}

interface PlatformMetrics {
  platform_overview: {
    total_users: number
    total_searches: number
    date_range_days: number
    period_start: string
    period_end: string
  }
  usage_totals: {
    total_results_requested: number
    total_results_returned: number
    total_posts_scraped: number
    total_posts_analyzed: number
    total_tokens_used: number
    total_cost: number
  }
  user_totals: {
    total_user_results_used: number
    total_user_posts_analyzed: number
    total_user_tokens_used: number
    total_user_cost: number
  }
  averages: {
    avg_cost_per_search: number
    avg_tokens_per_search: number
    avg_searches_per_user: number
    avg_results_per_search: number
    avg_posts_per_search: number
  }
  business_type_breakdown: Record<string, {
    searches: number
    cost: number
    tokens: number
    avg_cost_per_search: number
  }>
  most_expensive_searches: Array<{
    id: number
    user_id?: number
    problem_description: string
    business_type?: string
    results_returned: number
    tokens_used: number
    cost: number
    created_at: string
  }>
}

interface CostSummary {
  total_cost_all_time: number
  total_tokens_all_time: number
  user_totals: {
    total_cost: number
    total_tokens: number
  }
  today: {
    cost: number
    tokens: number
  }
  this_week: {
    cost: number
    tokens: number
  }
  budget_estimate: {
    beta_users: number
    max_cost_per_user: number
    estimated_total_budget: number
    current_usage_percentage: number
  }
}

interface RecentSearch {
  id: number
  user?: {
    id: number
    email: string
    name: string
  }
  user_session_id?: string
  problem_description: string
  business_type?: string
  result_count_requested: number
  result_count_returned: number
  posts_scraped: number
  posts_analyzed: number
  tokens_used: number
  cost: number
  model_used?: string
  search_duration_ms?: number
  created_at: string
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [betaCodes, setBetaCodes] = useState<BetaCode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newCodeQuantity, setNewCodeQuantity] = useState(5)
  const [admin, setAdmin] = useState<{ email: string; name?: string } | null>(null)
  const [platformMetrics, setPlatformMetrics] = useState<PlatformMetrics | null>(null)
  const [costSummary, setCostSummary] = useState<CostSummary | null>(null)
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([])
  const [metricsLoading, setMetricsLoading] = useState(false)

  useEffect(() => {
    // Check if admin is logged in
    const adminData = localStorage.getItem('admin')
    const adminToken = localStorage.getItem('admin_token')
    
    if (!adminData || !adminToken) {
      window.location.href = '/admin/login'
      return
    }
    
    setAdmin(JSON.parse(adminData))
    loadData()
    loadMetricsData()
  }, [])

  const loadData = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      
      // Load users
      const usersResponse = await fetch('https://hope-2-fa3m.onrender.com/api/auth/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (usersResponse.ok) {
        const usersData = await usersResponse.json()
        setUsers(usersData)
      }
      
      // Load beta codes
      const codesResponse = await fetch('https://hope-2-fa3m.onrender.com/api/auth/admin/beta-codes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (codesResponse.ok) {
        const codesData = await codesResponse.json()
        setBetaCodes(codesData)
      }
      
    } catch {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const loadMetricsData = async () => {
    try {
      setMetricsLoading(true)
      
      // Load platform metrics
      const metricsResponse = await fetch('https://hope-2-fa3m.onrender.com/api/admin/metrics/platform')
      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json()
        setPlatformMetrics(metricsData.metrics)
      }
      
      // Load cost summary
      const costResponse = await fetch('https://hope-2-fa3m.onrender.com/api/admin/costs/summary')
      if (costResponse.ok) {
        const costData = await costResponse.json()
        setCostSummary(costData.cost_summary)
      }
      
      // Load recent searches
      const searchesResponse = await fetch('https://hope-2-fa3m.onrender.com/api/admin/searches/recent?limit=10')
      if (searchesResponse.ok) {
        const searchesData = await searchesResponse.json()
        setRecentSearches(searchesData.searches)
      }
      
    } catch (err) {
      console.error('Error loading metrics:', err)
    } finally {
      setMetricsLoading(false)
    }
  }

  const generateBetaCodes = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      
      const response = await fetch('https://hope-2-fa3m.onrender.com/api/auth/admin/generate-beta-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          quantity: newCodeQuantity
        }),
      })
      
      if (response.ok) {
        const data = await response.json()
        alert(`Generated ${data.codes.length} new beta codes:\n${data.codes.join('\n')}`)
        loadData() // Reload data
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.detail}`)
      }
    } catch {
      alert('Failed to generate beta codes')
    }
  }

  const logout = () => {
    localStorage.removeItem('admin')
    localStorage.removeItem('admin_token')
    window.location.href = '/admin/login'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
        <div className="text-[#cccccc]">Loading admin dashboard...</div>
      </div>
    )
  }

  const usedCodes = betaCodes.filter(code => code.is_used).length
  const availableCodes = betaCodes.filter(code => !code.is_used).length

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#cccccc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#00d4aa]">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, {admin?.name}</p>
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/" 
              className="bg-[#2d2d2d] hover:bg-[#3d3d3d] text-[#cccccc] px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              View Site
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Refresh Metrics Button */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={loadMetricsData}
            disabled={metricsLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            {metricsLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Loading...
              </>
            ) : (
              'Refresh Metrics'
            )}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#2d2d2d] p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-[#00d4aa]">Total Users</h3>
            <p className="text-3xl font-bold">{users.length}</p>
          </div>
          <div className="bg-[#2d2d2d] p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-[#00d4aa]">Beta Codes Used</h3>
            <p className="text-3xl font-bold">{usedCodes}</p>
          </div>
          <div className="bg-[#2d2d2d] p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-[#00d4aa]">Available Codes</h3>
            <p className="text-3xl font-bold">{availableCodes}</p>
          </div>
          <div className="bg-[#2d2d2d] p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-[#00d4aa]">Total Codes</h3>
            <p className="text-3xl font-bold">{betaCodes.length}</p>
          </div>
        </div>

        {/* New OpenAI Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-900 p-6 rounded-lg border border-blue-700">
            <h3 className="text-lg font-semibold text-blue-300">Total Searches</h3>
            <p className="text-3xl font-bold text-white">
              {metricsLoading ? '...' : platformMetrics?.platform_overview.total_searches || 0}
            </p>
          </div>
          <div className="bg-green-900 p-6 rounded-lg border border-green-700">
            <h3 className="text-lg font-semibold text-green-300">Total Tokens Used</h3>
            <p className="text-3xl font-bold text-white">
              {metricsLoading ? '...' : platformMetrics?.usage_totals.total_tokens_used?.toLocaleString() || 0}
            </p>
          </div>
          <div className="bg-yellow-900 p-6 rounded-lg border border-yellow-700">
            <h3 className="text-lg font-semibold text-yellow-300">Total Cost</h3>
            <p className="text-3xl font-bold text-white">
              ${metricsLoading ? '...' : costSummary?.total_cost_all_time?.toFixed(4) || '0.0000'}
            </p>
          </div>
          <div className="bg-red-900 p-6 rounded-lg border border-red-700">
            <h3 className="text-lg font-semibold text-red-300">Budget Used</h3>
            <p className="text-3xl font-bold text-white">
              {metricsLoading ? '...' : costSummary?.budget_estimate.current_usage_percentage?.toFixed(1) || 0}%
            </p>
          </div>
        </div>

        {/* Daily/Weekly Cost Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#2d2d2d] p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-2">Today&apos;s Cost</h3>
            <p className="text-xl font-bold text-white">
              ${costSummary?.today.cost?.toFixed(4) || '0.0000'}
            </p>
          </div>
          <div className="bg-[#2d2d2d] p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-2">This Week&apos;s Cost</h3>
            <p className="text-xl font-bold text-white">
              ${costSummary?.this_week.cost?.toFixed(4) || '0.0000'}
            </p>
          </div>
          <div className="bg-[#2d2d2d] p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-2">Avg Cost/Search</h3>
            <p className="text-xl font-bold text-white">
              ${platformMetrics?.averages.avg_cost_per_search?.toFixed(4) || '0.0000'}
            </p>
          </div>
          <div className="bg-[#2d2d2d] p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-2">Avg Tokens/Search</h3>
            <p className="text-xl font-bold text-white">
              {platformMetrics?.averages.avg_tokens_per_search?.toFixed(0) || 0}
            </p>
          </div>
        </div>

        {/* Generate Beta Codes */}
        <div className="bg-[#2d2d2d] p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Generate Beta Codes</h2>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="1"
              max="50"
              value={newCodeQuantity}
              onChange={(e) => setNewCodeQuantity(parseInt(e.target.value))}
              className="px-3 py-2 bg-[#1e1e1e] border border-gray-600 rounded text-white cursor-pointer"
            />
            <button
              onClick={generateBetaCodes}
              className="bg-[#00d4aa] hover:bg-[#00b894] text-black px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
            >
              Generate Codes
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#2d2d2d] p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Company</th>
                  <th className="text-left py-2">Beta Code</th>
                  <th className="text-left py-2">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700">
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">{user.company || '-'}</td>
                    <td className="py-2 font-mono text-[#00d4aa]">{user.beta_code}</td>
                    <td className="py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Beta Codes Table */}
        <div className="bg-[#2d2d2d] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Beta Codes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2">Code</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Used By</th>
                  <th className="text-left py-2">Created</th>
                  <th className="text-left py-2">Used</th>
                </tr>
              </thead>
              <tbody>
                {betaCodes.slice(0, 20).map((code) => (
                  <tr key={code.id} className="border-b border-gray-700">
                    <td className="py-2 font-mono text-[#00d4aa]">{code.code}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        code.is_used ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                      }`}>
                        {code.is_used ? 'Used' : 'Available'}
                      </span>
                    </td>
                    <td className="py-2">{code.used_by_user_id ? `User #${code.used_by_user_id}` : '-'}</td>
                    <td className="py-2">{new Date(code.created_at).toLocaleDateString()}</td>
                    <td className="py-2">{code.used_at ? new Date(code.used_at).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {betaCodes.length > 20 && (
              <p className="text-gray-400 text-sm mt-4">
                Showing first 20 codes of {betaCodes.length} total
              </p>
            )}
          </div>
        </div>

        {/* Recent Searches with Metrics */}
        <div className="bg-[#2d2d2d] p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Searches & OpenAI Metrics</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2">User</th>
                  <th className="text-left py-2">Problem</th>
                  <th className="text-left py-2">Business</th>
                  <th className="text-left py-2">Results</th>
                  <th className="text-left py-2">Tokens</th>
                  <th className="text-left py-2">Cost</th>
                  <th className="text-left py-2">Duration</th>
                  <th className="text-left py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {metricsLoading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-400">Loading metrics...</td>
                  </tr>
                ) : recentSearches.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-400">No searches yet</td>
                  </tr>
                ) : (
                  recentSearches.map((search) => (
                    <tr key={search.id} className="border-b border-gray-700">
                      <td className="py-2 text-white">
                        {search.user ? (
                          <span>{search.user.name} ({search.user.email})</span>
                        ) : (
                          <span className="text-gray-400">Anonymous</span>
                        )}
                      </td>
                      <td className="py-2 text-gray-300 max-w-xs truncate">
                        {search.problem_description}
                      </td>
                      <td className="py-2 text-gray-300">
                        {search.business_type || 'N/A'}
                      </td>
                      <td className="py-2 text-white">
                        {search.result_count_returned}
                      </td>
                      <td className="py-2 text-green-400">
                        {search.tokens_used.toLocaleString()}
                      </td>
                      <td className="py-2 text-yellow-400">
                        ${search.cost.toFixed(4)}
                      </td>
                      <td className="py-2 text-blue-400">
                        {search.search_duration_ms ? `${search.search_duration_ms}ms` : 'N/A'}
                      </td>
                      <td className="py-2 text-gray-400">
                        {new Date(search.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
