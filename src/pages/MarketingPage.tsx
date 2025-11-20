import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../components/shared-theme/AppTheme.tsx';
import AppAppBar from '../components/marketing-page/components/AppAppBar.tsx';
import Hero from '../components/marketing-page/components/Hero.tsx';
import LogoCollection from '../components/marketing-page/components/LogoCollection.tsx';
import Highlights from '../components/marketing-page/components/Highlights.tsx';
import Pricing from '../components/marketing-page/components/Pricing.tsx';
import Features from '../components/marketing-page/components/Features.tsx';
import Testimonials from '../components/marketing-page/components/Testimonials.tsx';
import FAQ from '../components/marketing-page/components/FAQ.tsx';
import Footer from '../components/marketing-page/components/Footer.tsx';
import PainPoints from '../components/marketing-page/components/PainPoints.tsx'
import FloatingActionButton from '../components/marketing-page/components/FloatingActionButton.tsx';
import BenefitsSection from '../components/marketing-page/components/BenefitsSection.tsx';
import RequirementsSection from '../components/marketing-page/components/RequirementsSection.tsx';
import CourseTimer from '../components/marketing-page/components/CourseTimer.tsx';
import SEO from '../components/shared/SEO.tsx';
import { LocalBusinessSchema, FAQSchema, CourseSchema } from '../components/shared/StructuredData.tsx';
import { useTranslation } from 'react-i18next';
import aCatImg from '/a-cat.jpg';
import bCatImg from '/b-cat.jpg';
import fCatImg from '/final-cat-1.jpg';
import mainHeroImg from '/main-hero-1.jpg';

interface MarketingPageProps {
  disableCustomTheme?: boolean;
  toggleColorMode?: () => void;
}

export default function MarketingPage({ disableCustomTheme, toggleColorMode }: MarketingPageProps) {
  const { t, i18n } = useTranslation();
  
  // Extract FAQ data for structured data
  const faqData = React.useMemo(() => {
    return [
      {
        question: t('faq.question1'),
        answer: t('faq.answer1')
      },
      {
        question: t('faq.question2'),
        answer: t('faq.answer2')
      },
      {
        question: t('faq.question3'),
        answer: t('faq.answer3')
      },
      {
        question: t('faq.question4'),
        answer: t('faq.answer4')
      },
      {
        question: t('faq.question5'),
        answer: t('faq.answer5')
      },
      {
        question: t('faq.question6'),
        answer: t('faq.answer6')
      }
    ];
  }, [t]);

  const ogImageUrl = import.meta.env.PROD 
    ? 'https://viktorijaautokool.ee' + mainHeroImg
    : mainHeroImg;

  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <SEO 
        title={t('hero.home.title')}
        description={t('hero.home.description')}
        ogImage={ogImageUrl}
        ogUrl="https://viktorijaautokool.ee"
        language={i18n.language}
        canonicalUrl="https://viktorijaautokool.ee"
        alternateLanguages={{
          'ru': 'https://viktorijaautokool.ee?lang=ru',
          'en': 'https://viktorijaautokool.ee?lang=en',
          'et': 'https://viktorijaautokool.ee?lang=et'
        }}
      />
      
      {/* Local Business Structured Data */}
      <LocalBusinessSchema
        name="Viktorija Autokool Nõmme"
        description={t('hero.home.description')}
        url="https://viktorijaautokool.ee"
        telephone="+37253464508"
        email="viktorijaautokool@hot.ee"
        address={{
          streetAddress: "Jaama tn 1",
          addressLocality: "Tallinn",
          addressRegion: "Harjumaa",
          postalCode: "11615",
          addressCountry: "Estonia"
        }}
        geo={{
          latitude: 59.3702,
          longitude: 24.6797
        }}
        openingHours={[
          "Monday 09:00-18:00",
          "Tuesday 09:00-18:00",
          "Wednesday 09:00-18:00",
          "Thursday 09:00-18:00",
          "Friday 09:00-17:00",
          "Saturday 10:00-14:00",
        ]}
        image="/logo.png"
      />
      
      {/* FAQ Structured Data */}
      <FAQSchema questions={faqData} />
      
      {/* Course Structured Data - Category B */}
      <CourseSchema
        name={t('painpoints.categories.b.title')}
        description={t('painpoints.categories.b.description')}
        provider="Viktorija Autokool Nõmme"
        url="https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00"
        image={bCatImg}
        price={700}
      />
      
      <CssBaseline enableColorScheme />

      <AppAppBar toggleColorMode={toggleColorMode} />
      <Hero 
        translationKey="home"
        buttonLink="https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00"
        imageUrl={mainHeroImg}
        imageAlt="Educational Platform"
      />
      {/* Hero categories info/price  */}
      <div>
        <CourseTimer nextCourseDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)} />
        <PainPoints 
          title={t('painpoints.title')}
          subtitle={t('painpoints.subtitle')}
          items={[
            {
              id: 'category-a',
              title: t('painpoints.categories.a.title'),
              description: t('painpoints.categories.a.description'),
              imageUrl: aCatImg,
              price: {
                theory: 120,
                lesson: 45,
                total: 570
              },
              buttonText: t('painpoints.categories.a.button'),
              priceLabel: t('painpoints.categories.a.price_label'),
              buttonLink: 'https://buy.stripe.com/8x2aEYewiaJW94hdTa3ZK02'
            },
            {
              id: 'category-b',
              title: t('painpoints.categories.b.title'),
              description: t('painpoints.categories.b.description'),
              imageUrl: bCatImg,
              price: {
                theory: 160,
                lesson: 25, 
                total: 700,
                manualTotalLabel: t('painpoints.categories.b.manual_total'),
                autoTotalLabel: t('painpoints.categories.b.auto_total'),
                autoTotal: 840
              },
              buttonText: t('painpoints.categories.b.button'),
              priceLabel: t('painpoints.categories.b.price_label'),
              buttonLink: 'https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00'
            },
            {
              id: 'category-c',
              title: t('painpoints.categories.c.title'),
              description: t('painpoints.categories.c.description'),
              imageUrl: fCatImg,
              price: {
                finalLabel: t('painpoints.categories.c.final_label'),
                finalPrice: 150
              },
              buttonText: t('painpoints.categories.c.button'),
              priceLabel: t('painpoints.categories.c.price_label'),
              afterPrice: t('painpoints.categories.c.after_price'),
              buttonLink: 'https://buy.stripe.com/eVq5kEgEqcS4a8l5mE3ZK01'
            }
          ]}
        />
        <LogoCollection />

        <BenefitsSection />

        <Divider />
        <RequirementsSection />

        <Divider />
        <Features />
        
        {/* <AIAssistant 
          title="AI-Powered Marketing Assistant"
          subtitle="Our AI assistant helps you engage with potential students 24/7, qualify leads, and boost enrollment rates"
          features={[
            {
              title: 'Smart Lead Qualification',
              description: 'Automatically identifies and prioritizes high-value prospects',
              icon: 'smartToy',
            },
            {
              title: 'Personalized Engagement',
              description: 'Delivers tailored responses based on student interests and needs',
              icon: 'autoAwesome',
            },
            {
              title: 'Conversion Optimization',
              description: 'Tracks and improves inquiry-to-enrollment rates',
              icon: 'psychology',
            },
            {
              title: 'Multi-channel Support',
              description: 'Engages students across website, social media, and messaging apps',
              icon: 'star',
            },
            {
              title: 'Analytics Dashboard',
              description: 'Provides insights into student engagement and conversion metrics',
              icon: 'rocketLaunch',
            },
          ]}
          quote={{
            text: "Our enrollment rates increased by 35% within the first month of implementing the AI assistant. It's like having a marketing team that never sleeps.",
            author: "Sarah Chen",
            position: "Marketing Director, Premier Driving School",
          }}
          buttonText="Schedule a Demo →"
          buttonLink="/checkout"
        /> */}

        {/* <AdministrativeAutomation 
          title="Streamline Your Marketing Operations"
          subtitle="Automate repetitive marketing tasks and focus on growing your student base"
          benefits={[
            {
              icon: 'schedule',
              title: 'Campaign Scheduling',
              description: 'Plan and automate marketing campaigns across channels',
            },
            {
              icon: 'notifications',
              title: 'Lead Nurturing',
              description: 'Automated follow-ups that convert 3x more leads',
            },
            {
              icon: 'description',
              title: 'Content Management',
              description: 'Organize and distribute marketing materials efficiently',
            },
            {
              icon: 'payment',
              title: 'ROI Tracking',
              description: 'Monitor marketing spend and conversion rates',
            },
            {
              icon: 'analytics',
              title: 'Performance Insights',
              description: 'Data-driven optimization of marketing strategies',
            },
          ]}
          buttonText="Start Your Marketing Automation →"
          buttonLink="/checkout"
        /> */}

        {/* <TimeCalculator /> */}

        {/* <Divider /> */}

        {/* <SuccessStories 
          title="Join 500+ Educational Institutions Already Transformed"
          caseStudies={[
            {
              title: 'Premier Driving School',
              metrics: '80% reduction in administrative hours, 40% increase in student satisfaction',
            },
            {
              title: 'Westlake University Language Department',
              metrics: '3x growth in enrollment with same staff count',
            },
            {
              title: 'Excel Test Prep Center',
              metrics: 'Expanded from 1 to 3 locations without adding administrative staff',
            },
          ]}
          metrics={[
            {
              value: '127,000+',
              label: 'hours saved for educators last month',
            },
            {
              value: '$3.2M+',
              label: 'additional revenue generated for our clients',
            },
            {
              value: '94%',
              label: 'client retention rate',
            },
          ]}
          buttonText="Join Success Stories Like These →"
          buttonLink="/checkout"
        /> */}

        <Divider />
        <Testimonials />

        <Divider />
        <Highlights />

        {/* <Divider />
        <Pricing /> */}

        {/* <UrgencySection 
          title="While You Consider, Your Competitors Are Evolving"
          subtitle="Educational institutions with AI integration are growing 3x faster than traditional providers."
          mainText="According to the 2025 Education Technology Report,"
          highlightText="67% of students"
          mainTextContinuation="now choose schools based partly on technological sophistication. Early adopters are capturing market share while traditional providers struggle with declining enrollment."
          offerTitle="This month only:"
          offerText="Get a free competitive analysis showing how your digital presence compares to leaders in your sector."
          buttonText="Claim Your Free Competitive Analysis →"
          buttonLink="/checkout"
          limitText="Limited to 10 per week"
        />
        <Divider /> */}
        
        <Divider />
        <FAQ />
        
        <Divider />
        <Footer />
      </div>
      <FloatingActionButton buttonLink="https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00" />
    </AppTheme>
  );
}