#!/bin/bash
set -e

echo "=========================================="
echo "Pushing COGNIA WEBSITE to GitHub"
echo "=========================================="

cd "/Users/emrebenian/Desktop/COGNIA AI/PROJECTS/COGNIA WEBSITE"

# Show current status
echo ""
echo "Current git status:"
git status --short

# Add all changes
echo ""
echo "Adding all files..."
git add -A

# Show what will be committed
echo ""
echo "Files to be committed:"
git status --short

# Commit changes
echo ""
echo "Committing changes..."
git commit -m "Update: Bold-Villani codebase in COGNIA WEBSITE folder

Moved from CLAUDE to COGNIA WEBSITE folder
Complete bold-villani branch code with Meta CAPI integration" || echo "Nothing to commit or commit failed"

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push origin main

echo ""
echo "=========================================="
echo "✅ Successfully pushed to GitHub!"
echo "=========================================="
echo ""
echo "Repository: https://github.com/AICognia/website"
