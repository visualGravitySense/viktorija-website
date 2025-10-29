@echo off
echo Building and deploying to GitHub Pages...

echo.
echo Step 1: Adding files to git...
git add .

echo.
echo Step 2: Committing changes...
git commit -m "Deploy: Fix third card display and prepare for GitHub Pages"

echo.
echo Step 3: Pushing to main branch...
git push origin main

echo.
echo Step 4: Building project...
npm run build

echo.
echo Step 5: Deploying to gh-pages...
npm run deploy

echo.
echo Deployment complete! 
echo Visit: https://dmitrym87.github.io/viktorija-base
pause 