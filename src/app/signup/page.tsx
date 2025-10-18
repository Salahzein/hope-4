'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    betaCode: '',
    company: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Basic validation
    if (!formData.email || !formData.password || !formData.name || !formData.betaCode) {
      setError('All fields are required')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('https://hope-2-fa3m.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          beta_code: formData.betaCode,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          company: formData.company || null
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create account')
      }
      
      const userData: { user: { email: string; name?: string }; access_token: string } = data
      
      // Store user data and token
      localStorage.setItem('user', JSON.stringify(userData.user))
      localStorage.setItem('token', userData.access_token)
      
      // Redirect to dashboard on success
      window.location.href = '/dashboard'
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[#cccccc]">
            Join Beta Access
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your beta code to get started
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="betaCode" className="block text-sm font-medium text-[#cccccc] mb-2">
                Beta Code
              </label>
              <input
                id="betaCode"
                name="betaCode"
                type="text"
                required
                value={formData.betaCode}
                onChange={handleChange}
                placeholder="Enter your beta code"
                className="w-full px-4 py-3 bg-[#2d2d2d] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00d4aa] transition-colors cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#cccccc] mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-[#2d2d2d] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00d4aa] transition-colors cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#cccccc] mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-[#2d2d2d] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00d4aa] transition-colors cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#cccccc] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-[#2d2d2d] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00d4aa] transition-colors cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-[#cccccc] mb-2">
                Company/Industry (Optional)
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Marketing Agency, SaaS Company"
                className="w-full px-4 py-3 bg-[#2d2d2d] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00d4aa] transition-colors cursor-pointer"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00d4aa] hover:bg-[#00b894] text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-[#00d4aa] hover:text-[#00b894] transition-colors cursor-pointer">
                Sign in
              </Link>
            </p>
          </div>
        </form>

        <div className="mt-8 p-4 bg-[#2d2d2d] rounded-lg">
          <h3 className="text-sm font-medium text-[#cccccc] mb-2">Beta Benefits:</h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Free access during development</li>
            <li>• Priority support</li>
            <li>• Shape the product</li>
            <li>• Early adopter pricing</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
