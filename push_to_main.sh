#!/bin/bash
set -e

echo "=========================================="
echo "Pushing Bold-Villani Code to Main Branch"
echo "=========================================="

cd "/Users/emrebenian/Desktop/COGNIA AI/PROJECTS/COGNIA WEBSITE"

# Check current branch
echo "Current branch: $(git branch --show-current)"

# Switch to main branch
echo ""
echo "Switching to main branch..."
git checkout main

# Pull latest from main
echo ""
echo "Pulling latest changes from main..."
git pull origin main

# Show status
echo ""
echo "Current status:"
git status --short

# Add all files
echo ""
echo "Adding all files..."
git add -A

# Commit
echo ""
echo "Committing changes..."
git commit -m "Update: Deploy bold-villani codebase to main

Complete Meta CAPI integration with:
- Meta Pixel (ID: 1224660309537951) + CAPI dual tracking
- Event deduplication with matching event_id
- Attribution capture: fbp, fbc, fbclid, gclid, UTM params
- localStorage backup (24hr)
- n8n webhook integration via Formspree
- Solution pages and Chatbot
- Ready for Vercel deployment" || echo "Nothing to commit"

# Push to main
echo ""
echo "Pushing to main branch..."
git push origin main

echo ""
echo "=========================================="
echo "✅ Pushed to main branch!"
echo "=========================================="
echo ""
echo "Vercel should auto-deploy now."
echo "Check: https://vercel.com/dashboard"
