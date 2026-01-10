#!/bin/bash
set -e

echo "=========================================="
echo "Force Pushing to Main Branch"
echo "=========================================="

cd "/Users/emrebenian/Desktop/COGNIA AI/PROJECTS/COGNIA WEBSITE"

# Check current branch
echo "Current branch: $(git branch --show-current)"

# Add all files
echo ""
echo "Adding all files..."
git add -A

# Commit on current branch
echo ""
echo "Committing changes..."
git commit -m "Update: Deploy bold-villani codebase

Complete Meta CAPI integration with:
- Meta Pixel (ID: 1224660309537951) + CAPI dual tracking
- Event deduplication with matching event_id
- Attribution capture: fbp, fbc, fbclid, gclid, UTM params
- localStorage backup (24hr)
- n8n webhook integration via Formspree
- Solution pages and Chatbot
- Ready for Vercel deployment" || echo "Nothing to commit"

# Push current branch to main (without switching)
echo ""
echo "Pushing current branch content to main..."
git push origin HEAD:main --force

echo ""
echo "=========================================="
echo "✅ Pushed to main branch!"
echo "=========================================="
echo ""
echo "Vercel should auto-deploy now."
echo "Check: https://vercel.com/dashboard"
