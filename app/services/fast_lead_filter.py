"""
Fast Lead Filter - Rule-Based Filtering + OpenAI Summaries
This combines the proven rule-based filtering with OpenAI summaries for the best of both worlds:
- Fast performance (rule-based filtering)
- Quality insights (OpenAI summaries)
- Cost control (minimal API calls)
"""

import re
import logging
from typing import List, Dict, Any, Optional, Tuple
from datetime import datetime, timedelta
from app.models.lead import Lead
from app.services.ai_enhancer import AIEnhancer, EnhancedQuery
from app.services.summary_service import SummaryService
from app.core.ai_config import get_ai_config
from app.services.business_mapping import BUSINESS_MAPPINGS, INDUSTRY_MAPPINGS

logger = logging.getLogger(__name__)

class FastLeadFilter:
    def __init__(self):
        self.ai_config = get_ai_config()
        self.ai_enhancer = AIEnhancer()
        self.summary_service = SummaryService()
        
        # Performance metrics
        self._last_metrics: Optional[Dict[str, Any]] = None
        
        logger.info(f"🚀 Fast Lead Filter initialized - Rule-based filtering + OpenAI summaries")
        logger.info(f"🔧 Config: threshold={self.ai_config['threshold']}, use_openai={self.ai_config['use_openai']}")

    def filter_posts(self, posts: List[Dict[str, Any]], problem_description: str, 
                    business_type: str, industry_type: Optional[str] = None) -> Tuple[List[Lead], Dict[str, Any]]:
        """
        Filter posts using rule-based system and add OpenAI summaries.
        Returns: (filtered_leads, metrics)
        """
        logger.info(f"🚀 Fast filtering: {len(posts)} posts for '{problem_description}'")
        
        # Reset metrics
        self._last_metrics = {
            "posts_analyzed": len(posts),
            "posts_filtered": 0,
            "summaries_generated": 0,
            "tokens_used": 0,
            "cost": 0.0,
            "filter_method": "rule_based",
            "summary_method": "openai"
        }
        
        try:
            # Step 1: Rule-based filtering (fast and accurate)
            filtered_posts = self._rule_based_filter(posts, problem_description, business_type, industry_type)
            logger.info(f"✅ Rule-based filtering: {len(posts)} -> {len(filtered_posts)} posts")
            
            # Step 2: Create leads from filtered posts
            leads = self._create_leads_from_posts(filtered_posts, problem_description, business_type)
            logger.info(f"✅ Created {len(leads)} leads")
            
            # Step 3: Add simple summaries (OpenAI disabled for now due to proxy issues)
            if leads:
                leads = self._add_simple_summaries(leads, problem_description)
            
            # Update metrics
            self._last_metrics.update({
                "posts_filtered": len(filtered_posts),
                "results_returned": len(leads)
            })
            
            logger.info(f"🎯 Fast filtering complete: {len(leads)} quality leads")
            return leads, self._last_metrics
            
        except Exception as e:
            logger.error(f"❌ Error in fast filtering: {e}")
            # Return empty results on error
            return [], self._last_metrics or {}

    def _rule_based_filter(self, posts: List[Dict[str, Any]], problem_description: str, 
                          business_type: str, industry_type: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        Rule-based filtering - the proven system that worked before.
        """
        # Get business/industry keywords
        business_keywords = BUSINESS_MAPPINGS.get(business_type, {}).get("keywords", [])
        if industry_type:
            industry_keywords = INDUSTRY_MAPPINGS.get(industry_type, {}).get("keywords", [])
            business_keywords.extend(industry_keywords)
        
        # Enhanced query processing
        enhanced_query = self.ai_enhancer.enhance_query(problem_description, business_type)
        enhanced_keywords = enhanced_query.keywords
        
        # Combine all keywords
        all_keywords = business_keywords + enhanced_keywords
        
        logger.info(f"🔍 Keywords for '{business_type}': {all_keywords[:10]}...")  # Show first 10 keywords
        
        # Struggle indicators
        struggle_indicators = [
            "struggling", "help", "can't", "cannot", "can not", "trouble", "problem", "issue", 
            "stuck", "frustrated", "overwhelmed", "desperate", "urgent", "failing", "lost", 
            "losing", "declining", "first client", "first customer", "no customers", "no clients",
            "getting clients", "customer acquisition", "lead generation", "need help", 
            "looking for", "how to", "what should", "any advice"
        ]
        
        filtered_posts = []
        
        logger.info(f"🔍 Processing {len(posts)} posts for filtering...")
        
        for i, post in enumerate(posts[:5]):  # Log first 5 posts for debugging
            logger.info(f"📝 Post {i+1}: {post.get('title', '')[:50]}...")
        
        for post in posts:
            title = post.get("title", "").lower()
            content = post.get("content", "").lower()
            text = f"{title} {content}"
            
            # Calculate relevance score
            score = 0
            
            # Business keyword matching
            for keyword in all_keywords:
                if keyword.lower() in text:
                    score += 3
            
            # Struggle indicator matching
            for indicator in struggle_indicators:
                if indicator in text:
                    score += 2
            
            # Enhanced keyword matching (higher weight)
            for keyword in enhanced_keywords:
                if keyword.lower() in text:
                    score += 4
            
            # Bonus for exact problem match
            problem_words = problem_description.lower().split()
            for word in problem_words:
                if len(word) > 3 and word in text:
                    score += 1
            
            # Assign score to post (for debugging)
            post["relevance_score"] = score
            
            # Apply threshold
            if score >= self.ai_config["threshold"]:
                filtered_posts.append(post)
        
        # Sort by relevance score (highest first)
        filtered_posts.sort(key=lambda x: x.get("relevance_score", 0), reverse=True)
        
        # Debug: Show score distribution
        all_scores = [post.get("relevance_score", 0) for post in posts]
        max_score = max(all_scores) if all_scores else 0
        min_score = min(all_scores) if all_scores else 0
        avg_score = sum(all_scores) / len(all_scores) if all_scores else 0
        
        logger.info(f"📊 Score distribution: min={min_score}, max={max_score}, avg={avg_score:.1f}")
        logger.info(f"📊 Filtered posts: {len(filtered_posts)} out of {len(posts)} (threshold={self.ai_config['threshold']})")
        logger.info(f"📊 Top scores: {[p.get('relevance_score', 0) for p in filtered_posts[:5]]}")
        
        return filtered_posts

    def _create_leads_from_posts(self, posts: List[Dict[str, Any]], problem_description: str, business_type: str) -> List[Lead]:
        """Create Lead objects from filtered posts."""
        leads = []
        
        for post in posts:
            try:
                lead = Lead(
                    title=post.get("title", ""),
                    subreddit=post.get("subreddit", ""),
                    snippet=post.get("content", "")[:200] + "..." if len(post.get("content", "")) > 200 else post.get("content", ""),
                    permalink=post.get("permalink", ""),
                    author=post.get("author", ""),
                    created_utc=post.get("created_utc", 0),
                    score=post.get("score", 0),
                    matched_keywords=[],  # Will be populated later
                    ai_relevance_score=post.get("relevance_score", 0),
                    urgency_level="Medium",  # Default
                    business_context=business_type,
                    problem_category="General",  # Default
                    ai_summary=""  # Will be populated by OpenAI
                )
                leads.append(lead)
            except Exception as e:
                logger.error(f"❌ Error creating lead from post: {e}")
                continue
        
        return leads

    def _add_openai_summaries(self, leads: List[Lead], problem_description: str) -> List[Lead]:
        """
        Add OpenAI summaries to leads in batches for efficiency.
        This is the only place we use OpenAI - for summaries only.
        """
        try:
            # Convert leads to post format for summary service
            posts_for_summary = []
            for lead in leads[:10]:  # Limit to top 10 for performance
                posts_for_summary.append({
                    "title": lead.title,
                    "content": lead.snippet
                })
            
            # Generate summaries in batch
            summaries = self.summary_service.batch_generate_summaries(posts_for_summary, problem_description)
            
            # Apply summaries to leads
            for i, lead in enumerate(leads[:10]):
                if i < len(summaries):
                    lead.ai_summary = summaries[i]
                else:
                    lead.ai_summary = f"Post about {problem_description.lower()} - {lead.title[:100]}..."
            
            # Add fallback summaries for remaining leads
            for lead in leads[10:]:
                lead.ai_summary = f"Post about {problem_description.lower()} - {lead.title[:100]}..."
            
            logger.info(f"✅ Added OpenAI summaries to {len(leads)} leads")
            return leads
            
        except Exception as e:
            logger.error(f"❌ Error adding OpenAI summaries: {e}")
            # Add fallback summaries
            for lead in leads:
                lead.ai_summary = f"Post about {problem_description.lower()} - {lead.title[:100]}..."
            return leads

    def _add_simple_summaries(self, leads: List[Lead], problem_description: str) -> List[Lead]:
        """
        Add simple, descriptive summaries without OpenAI.
        These are fast and reliable.
        """
        try:
            for lead in leads:
                # Create a simple, informative summary
                title_words = lead.title.lower().split()
                problem_words = problem_description.lower().split()
                
                # Find matching words between title and problem
                matching_words = [word for word in problem_words if word in title_words]
                
                if matching_words:
                    summary = f"Post about {', '.join(matching_words)} - {lead.title[:80]}..."
                else:
                    summary = f"Post about {problem_description.lower()} - {lead.title[:80]}..."
                
                lead.ai_summary = summary
            
            logger.info(f"✅ Added simple summaries to {len(leads)} leads")
            return leads
            
        except Exception as e:
            logger.error(f"❌ Error adding simple summaries: {e}")
            # Add basic fallback summaries
            for lead in leads:
                lead.ai_summary = f"Post about {problem_description.lower()} - {lead.title[:100]}..."
            return leads

    def get_last_metrics(self) -> Optional[Dict[str, Any]]:
        """Get metrics from the last filtering operation."""
        return self._last_metrics
