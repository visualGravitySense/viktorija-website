# Deployment to GitHub Pages

## Quick Deploy

### Windows
```bash
./deploy.bat
```

### Unix/Linux/Mac
```bash
chmod +x deploy.sh
./deploy.sh
```

## Manual Deploy Steps

### 1. Commit and Push Changes
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### 2. Deploy to GitHub Pages
```bash
npm run deploy
```

## First Time Setup

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select "Deploy from a branch"
5. Select **gh-pages** branch
6. Click **Save**

### 2. Configure GitHub Actions (Alternative)
1. Go to **Settings** → **Pages**
2. Under **Source**, select "GitHub Actions"
3. The workflow in `.github/workflows/deploy.yml` will handle deployment

## URLs

- **Development**: http://localhost:5173/
- **Production**: https://visualgravitysense.github.io/viktorija-base/

## Configuration Files

### Vite Configuration (`vite.config.ts`)
```typescript
base: process.env.NODE_ENV === 'production' ? '/viktorija-base/' : '/'
```

### React Router (`App.tsx`)
```typescript
const basename = process.env.NODE_ENV === 'production' ? '/viktorija-base' : '';
```

### Package.json
```json
{
  "homepage": "https://visualgravitysense.github.io/viktorija-base"
}
```