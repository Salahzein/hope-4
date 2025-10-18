#!/bin/bash
echo "🚀 Pushing Hope platform to GitHub..."
cd /Users/Salah/Documents/GitHub/hope-2

echo "📋 Current status:"
git status

echo "🔄 Attempting to push..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Your repository is now at: https://github.com/Salahzein/hope-2"
else
    echo "❌ Push failed. Please use GitHub Desktop instead."
    echo "💡 Open GitHub Desktop and click 'Publish branch'"
fi
