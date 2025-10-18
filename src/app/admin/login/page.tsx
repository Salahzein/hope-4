'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('https://hope-2-fa3m.onrender.com/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.detail || 'Invalid admin credentials')
      }
      
      const adminData: { admin: { email: string; name?: string }; access_token: string } = data
      
      // Store admin data and token
      localStorage.setItem('admin', JSON.stringify(adminData.admin))
      localStorage.setItem('admin_token', adminData.access_token)
      
      // Redirect to admin dashboard
      window.location.href = '/admin/dashboard'
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[#cccccc]">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Access the admin panel
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#cccccc] mb-2">
                Admin Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter admin email"
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
                placeholder="Enter admin password"
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
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Regular user?{' '}
              <Link href="/login" className="text-[#00d4aa] hover:text-[#00b894] transition-colors cursor-pointer">
                User Login
              </Link>
            </p>
          </div>
        </form>

        <div className="mt-8 p-4 bg-[#2d2d2d] rounded-lg">
          <h3 className="text-sm font-medium text-[#cccccc] mb-2">Admin Features:</h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Generate beta codes</li>
            <li>• View all users</li>
            <li>• Monitor beta code usage</li>
            <li>• Manage user accounts</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
