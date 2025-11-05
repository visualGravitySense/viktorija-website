import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
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
// import PainPoints from '../components/marketing-page/components/PainPoints.tsx'
// import AIAssistant from '../components/marketing-page/components/AIAssistant.tsx'
// import AdministrativeAutomation from '../components/marketing-page/components/AdministrativeAutomation.tsx'
// import TimeCalculator from '../components/marketing-page/components/TimeCalculator.tsx'
import UrgencySection from '../components/marketing-page/components/UrgencySection.tsx';
// import Checkout from '../components/checkout/Checkout.tsx';
import PhotoGallery from '../components/marketing-page/components/PhotoGallery.tsx';
import Instructors from '../components/marketing-page/components/Instructors.tsx';
import SEO from '../components/shared/SEO.tsx';
import { LocalBusinessSchema } from '../components/shared/StructuredData.tsx';
import { useTranslation } from 'react-i18next';
import ourMissionImg from '/our-mission.jpg';


export default function MarketingPage(props: { disableCustomTheme?: boolean, toggleColorMode?: () => void }) {
  const { t, i18n } = useTranslation();
  const { toggleColorMode } = props;
  
  return (
    <AppTheme {...props}>
      <SEO 
        title={t('hero.about.title')}
        description={t('hero.about.description')}
        ogImage={ourMissionImg}
        ogUrl="https://viktorijaautokool.ee/about"
        canonicalUrl="https://viktorijaautokool.ee/about"
        language={i18n.language}
      />
      
      {/* Enhanced Local Business Structured Data with Instructors */}
      <LocalBusinessSchema
        name="Viktorija Autokool Nõmme"
        description={t('hero.about.description')}
        url="https://viktorijaautokool.ee/about"
        telephone="+37253464508"
        email="viktorijaautokool@hot.ee"
        address={{
          streetAddress: "Jaama 1a (2 korrus)",
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
        image={ourMissionImg}
      />
      
      <CssBaseline enableColorScheme />

      {/* H1 Heading for SEO - Visually hidden but accessible */}
      <Typography
        component="h1"
        variant="h1"
        sx={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clipPath: 'inset(50%)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {t('hero.about.title')}
      </Typography>

      <AppAppBar toggleColorMode={toggleColorMode} />
      <Hero 
        translationKey="about"
        title={t('hero.about.title')}
        description={t('hero.about.description')}
        buttonText={t('hero.about.button')}
        buttonLink="https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00"
        imageUrl={ourMissionImg}
        imageAlt="Educational Platform"
      />
      <div>

      <UrgencySection 
          title={t('about.team.title')}
          subtitle={t('about.team.subtitle')}
          mainText={t('about.team.main_text')}
          highlightText={t('about.team.instructor_name')}
          mainTextContinuation={t('about.team.instructor_description')}
          offerTitle={t('about.team.why_title')}
          offerText={t('about.team.testimonial')}
          buttonText={t('about.team.button')}
          buttonLink="https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00"
          limitText={t('about.team.limit_text')}
        />

        <Features />
        
        {/* Instructors */}
        <Instructors 
          title={t('about.instructors_component.default_title')}
          subtitle={t('about.instructors_component.default_subtitle')}
        />

        <PhotoGallery
          title={t('about.gallery.title')}
          images={[
                { src: '/a-kategooria-22.jpg', alt: t('about.gallery.images.motorcycle_practice'), caption: t('about.gallery.captions.1') },
    { src: '/kool-1-1024x581.jpg', alt: t('about.gallery.images.classroom_1'), caption: t('about.gallery.captions.2') },
    { src: '/kool-2-1024x581.jpg', alt: t('about.gallery.images.classroom_2'), caption: t('about.gallery.captions.3') },
    { src: '/kool-3.jpg', alt: t('about.gallery.images.classroom_3'), caption: t('about.gallery.captions.4') },
    { src: '/loppastmekoolitus-libedasoit-7.jpg', alt: t('about.gallery.images.ice_area_1'), caption: t('about.gallery.captions.5') },
    { src: '/loppastmekoolitus-libedasoit-12.jpg', alt: t('about.gallery.images.ice_area_2'), caption: t('about.gallery.captions.6') },
          ]}
        />

        <Divider />
        <Testimonials />

        <LogoCollection />

        <Divider />
        <Highlights />

        {/* <Divider /> */}
        {/* <Pricing /> */}

        
        <Divider />
        <FAQ />
        <Divider />
        <Footer />

        {/* <Checkout /> */}
      </div>
    </AppTheme>
  );
}