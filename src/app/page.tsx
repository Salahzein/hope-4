'use client'

import { motion } from 'framer-motion'

export default function Home() {
  // Domain deployment ready - hope.archi
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }


  const glowHover = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 30px rgba(0, 212, 170, 0.4)",
      transition: { duration: 0.1 }
    }
  }

  const cardHover = {
    hover: {
      y: -10,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.1 }
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#cccccc] relative">
      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#00d4aa]/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-[#00d4aa]/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-80 left-1/4 w-1.5 h-1.5 bg-[#00d4aa]/15 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-[#00d4aa]/25 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-60 left-20 w-1 h-1 bg-[#00d4aa]/20 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #00d4aa 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1 
              {...fadeInUp}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Turn Struggling Businesses Into{' '}
              <span className="text-[#00d4aa] bg-gradient-to-r from-[#00d4aa] to-[#00b894] bg-clip-text text-transparent">
                Paying Clients
              </span>
            </motion.h1>
            <motion.p 
              {...fadeInUp}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Find businesses actively seeking solutions to problems you solve
            </motion.p>
            <motion.div 
              {...fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button 
                whileHover="hover"
                variants={glowHover}
                onClick={() => window.location.href = '/signup'}
                className="bg-[#00d4aa] hover:bg-[#00b894] text-black font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-100 cursor-pointer"
              >
                Get Beta Access
              </motion.button>
                            <motion.button 
                                whileHover="hover"
                                variants={{
                                    hover: {
                                        scale: 1.05,
                                        backgroundColor: "#00d4aa",
                                        color: "#000000",
                                        transition: { duration: 0.1 }
                                    }
                                }}
                                onClick={() => window.location.href = '/login'}
                                className="border border-[#00d4aa] text-[#00d4aa] hover:bg-[#00d4aa] hover:text-black font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-100 cursor-pointer"
                            >
                                Login
                            </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4aa]/30 to-transparent"></div>
      </div>

      {/* Value Proposition Section */}
      <div className="py-20 bg-[#1e1e1e] relative">
        {/* Section Background Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#00d4aa]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#00d4aa]/3 rounded-full blur-xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Stop Cold Outreach. Start Warm Conversations.
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Most businesses waste time on cold emails that get ignored. 
              We find businesses already talking about their problems online.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Other Platforms */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
              whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
              className="bg-[#1e1e1e] border border-red-500/20 rounded-2xl p-8 relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-red-400 text-2xl">❌</span>
                  </div>
                  <h3 className="text-2xl font-bold text-red-400">Other Platforms</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-300">Cold outreach gets ignored 98% of the time</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-300">Generic lead lists with no context</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-300">Wasting time on uninterested prospects</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-300">No way to know who&apos;s actively seeking help</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hope */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false }}
              whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
              className="bg-[#1e1e1e] border border-[#00d4aa]/30 rounded-2xl p-8 relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4aa]/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00d4aa]/5 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#00d4aa]/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-[#00d4aa] text-2xl">✅</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#00d4aa]">Hope</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-300">AI finds businesses actively struggling</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-300">Context-aware problem matching</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-300">Warm conversations with ready-to-buy prospects</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#00d4aa] rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-300">Real-time insights from online discussions</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4aa]/20 to-transparent"></div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-[#1e1e1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/5 to-transparent"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#00d4aa]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#00d4aa]/3 rounded-full blur-2xl"></div>
        
        {/* Additional Floating Elements */}
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-[#00d4aa]/8 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-[#00d4aa]/6 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00d4aa]/10 rounded-full mb-8">
              <svg className="w-10 h-10 text-[#00d4aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
              Make Client Acquisition{' '}
              <span className="bg-gradient-to-r from-[#00d4aa] to-[#00b894] bg-clip-text text-transparent font-bold">
                Easy
              </span>
              <br /><br />
              We believe every business should focus on <span className="text-[#00d4aa] font-semibold">solving problems</span>, not finding them. 
              Our AI finds businesses actively seeking solutions, so you can focus on{' '}
              <span className="text-[#00d4aa] font-semibold">delivering value</span>.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4aa]/25 to-transparent"></div>
      </div>

      {/* Platform Status */}
      <div className="py-20 bg-[#1e1e1e] relative">
        {/* Section Background Elements */}
        <div className="absolute top-20 left-1/3 w-40 h-40 bg-[#00d4aa]/4 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-32 h-32 bg-[#00d4aa]/6 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Platform Status</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We&apos;re expanding across multiple platforms to find businesses wherever they discuss their challenges
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Reddit - Active */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false }}
              whileHover="hover"
              variants={cardHover}
              className="bg-[#1e1e1e] border border-[#00d4aa]/30 p-8 rounded-2xl relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00d4aa]/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-[#00d4aa]/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#00d4aa]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.305-2.189 4.333-.987.795-2.16 1.251-3.379 1.251-1.219 0-2.392-.456-3.379-1.251-1.293-1.028-2.02-2.475-2.189-4.333-.033-.362-.033-.724 0-1.086.169-1.858.896-3.305 2.189-4.333C9.608 1.946 10.781 1.49 12 1.49s2.392.456 3.379 1.251c1.293 1.028 2.02 2.475 2.189 4.333.033.362.033.724 0 1.086z"/>
                    </svg>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#00d4aa] rounded-full mr-2 animate-pulse"></div>
                    <span className="text-[#00d4aa] text-sm font-semibold">LIVE</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-[#00d4aa]">Reddit</h3>
                <p className="text-gray-300 mb-4">Active business communities</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-[#00d4aa] rounded-full mr-2"></div>
                    Real-time discussions
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-[#00d4aa] rounded-full mr-2"></div>
                    Problem-focused posts
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-[#00d4aa] rounded-full mr-2"></div>
                    Community insights
                  </div>
                </div>
              </div>
            </motion.div>

            {/* LinkedIn - Coming Soon */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
              className="bg-[#1e1e1e] border border-gray-600/30 p-8 rounded-2xl relative overflow-hidden group opacity-70"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-500/10 rounded-full -translate-y-12 translate-x-12"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                    <span className="text-gray-400 text-sm font-semibold">SOON</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-400">LinkedIn</h3>
                <p className="text-gray-400 mb-4">Professional networks</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                    Business discussions
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                    Professional insights
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                    Industry challenges
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Twitter - Coming Soon */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: false }}
              className="bg-[#1e1e1e] border border-gray-600/30 p-8 rounded-2xl relative overflow-hidden group opacity-70"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-500/10 rounded-full -translate-y-12 translate-x-12"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                    <span className="text-gray-400 text-sm font-semibold">SOON</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-400">Twitter</h3>
                <p className="text-gray-400 mb-4">Real-time discussions</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                    Live conversations
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                    Trending topics
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                    Quick insights
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4aa]/30 to-transparent"></div>
      </div>

      {/* Beta CTA */}
      <div className="py-20 bg-[#1e1e1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/5 to-transparent"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#00d4aa]/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#00d4aa]/5 rounded-full blur-3xl"></div>
        
        {/* Additional Floating Elements */}
        <div className="absolute top-1/2 left-1/6 w-24 h-24 bg-[#00d4aa]/7 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-28 h-28 bg-[#00d4aa]/6 rounded-full blur-2xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to Find Your Next{' '}
              <span className="bg-gradient-to-r from-[#00d4aa] to-[#00b894] bg-clip-text text-transparent">
                Client?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join our exclusive beta and start connecting with businesses actively seeking your solutions
            </p>
            
            <motion.button
              onClick={() => window.location.href = '/signup'}
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
              className="bg-[#00d4aa] hover:bg-[#00b894] text-black font-bold px-8 py-4 rounded-xl transition-all duration-100 shadow-lg hover:shadow-[#00d4aa]/25 cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
            >
              Get Beta Access
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false }}
              className="mt-8 flex justify-center items-center space-x-8 text-sm text-gray-400"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#00d4aa] rounded-full mr-2"></div>
                Free during beta
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#00d4aa] rounded-full mr-2"></div>
                Shape the product
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#00d4aa] rounded-full mr-2"></div>
                Priority support
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}