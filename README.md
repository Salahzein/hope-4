# Hope - AI-Powered Lead Finder Platform

A Reddit-based lead generation tool that finds businesses struggling with specific problems.

## Features

- **AI-Powered Lead Discovery**: Finds businesses actively seeking solutions on Reddit
- **Context-Aware Matching**: Matches posts with specific business types and industries  
- **Real-time Insights**: Monitors business communities for problem-focused discussions
- **Urgency & Relevance Scoring**: Intelligent ranking of leads
- **Smart Filtering**: Rule-based keyword scoring system

## Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: Next.js (React/TypeScript)
- **Database**: SQLite
- **AI**: OpenAI integration for enhanced lead analysis

## Quick Start

### Backend
```bash
pip install -r requirements.txt
python start_server.py
```

### Frontend
```bash
cd hope-frontend/hope-frontend/hope-frontend
npm install
npm run dev
```

## API Endpoints

- `POST /api/leads/search` - Search for leads
- `GET /api/leads/business-types` - Get available business types
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

## Deployment

- **Backend**: Deployed on Railway
- **Frontend**: Deployed on Vercel
- **Domain**: Custom domain integration ready

## Beta Status

Currently in beta with Reddit integration. LinkedIn and X scraping coming soon!
