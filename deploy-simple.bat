@echo off
echo Building Viktorija Website...
npm run build

echo.
echo Copying build files to docs folder...
if exist docs rmdir /s /q docs
mkdir docs
xcopy dist\* docs\ /E /I /Y

echo.
echo Adding files to git...
git add .
git commit -m "Update website build"

echo.
echo Pushing to GitHub...
git push origin master

echo.
echo Website deployed to: https://visualgravitysense.github.io/viktorija-website/
echo.
echo Please configure GitHub Pages to use /docs folder as source
pause
