@echo off
echo Building and deploying to GitHub Pages with custom domain...

echo.
echo Step 1: Building project...
call npm run build

echo.
echo Step 2: Adding files to git...
git add .

echo.
echo Step 3: Committing changes...
git commit -m "Deploy: Update for custom domain viktorijaautokool.ee"

echo.
echo Step 4: Pushing to main branch...
git push origin main

echo.
echo Step 5: Deploying to gh-pages...
call npm run deploy

echo.
echo Deployment complete!
echo Visit: https://viktorijaautokool.ee
pause
