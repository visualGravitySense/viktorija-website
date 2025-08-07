# Viktorija Autokool Website

Modern React website for Viktorija driving school with responsive design, multiple languages support, and Stripe integration.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Multi-language Support**: Russian, Estonian, English (i18next)
- **Modern UI**: Material-UI components with custom styling
- **Payment Integration**: Stripe for secure payments
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Performance**: Optimized images and lazy loading

## 🛠️ Technologies

- **Frontend**: React 19, TypeScript, Material-UI
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Internationalization**: i18next
- **Payment**: Stripe
- **Deployment**: GitHub Pages

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/dmitrym87/viktorija-base.git
cd viktorija-base

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Deployment

### Automatic Deployment (GitHub Actions)

The website automatically deploys to GitHub Pages when you push to main/master branch:

1. Push your changes to main/master branch
2. GitHub Actions will automatically build and deploy
3. Visit: https://dmitrym87.github.io/viktorija-base

### Manual Deployment

```bash
# Build and deploy manually
npm run deploy
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Base URL Configuration

- **Development**: Routes work as `localhost:5173/`
- **Production**: Routes work as `yoursite.com/viktorija-base/`

The base URL is automatically configured based on `NODE_ENV`.

## 📁 Project Structure

```
src/
├── components/
│   ├── marketing-page/     # Main website components
│   ├── checkout/          # Checkout flow
│   └── shared/            # Shared components
├── pages/                 # Route pages
├── i18n/                  # Translations
└── hooks/                 # Custom hooks
```

## 🌐 Pages

- `/` - Home page with categories
- `/features` - Services page
- `/about` - About us page
- `/checkout` - Registration/checkout page

## 🎨 Categories

- **Category A**: Motorcycle driving course
- **Category B**: Car driving course (manual/automatic)
- **Category C**: Final/advanced course

## 📱 Responsive Design

- **Mobile**: Single column layout
- **Tablet**: Two column grid
- **Desktop**: Three column grid

## 🔧 Development

```bash
# Start development server
npm run dev

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

This project is proprietary and confidential.

## 📞 Contact

- **Phone**: +372 53464508
- **Email**: viktorijaautokool@hot.ee
- **Facebook**: [Viktorija Autokool](https://facebook.com/viktorijaautokool) 