import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../components/shared-theme/AppTheme.tsx';
import AppAppBar from '../components/marketing-page/components/AppAppBar.tsx';
import Hero from '../components/marketing-page/components/Hero.tsx';
import Highlights from '../components/marketing-page/components/Highlights.tsx';
import Pricing from '../components/marketing-page/components/Pricing.tsx';
import Testimonials from '../components/marketing-page/components/Testimonials.tsx';
import FAQ from '../components/marketing-page/components/FAQ.tsx';
import Footer from '../components/marketing-page/components/Footer.tsx';
import AIAssistant from '../components/marketing-page/components/AIAssistant.tsx';
import AdministrativeAutomation from '../components/marketing-page/components/AdministrativeAutomation.tsx';
import SEO from '../components/shared/SEO.tsx';
import { CourseSchema } from '../components/shared/StructuredData.tsx';
import UrgencySection from '../components/marketing-page/components/UrgencySection.tsx';
import { useTranslation } from 'react-i18next';
import aCatImg from '/a-cat.jpg';

const FeaturesPage: React.FC<{ disableCustomTheme?: boolean; toggleColorMode?: () => void }> = (props) => {
  const { t, i18n } = useTranslation();
  const { toggleColorMode } = props;
  
  return (
    <AppTheme {...props}>
      <SEO 
        title={t('hero.features.title')}
        description={t('hero.features.description')}
        ogImage="/services-hero.jpg"
        ogUrl="https://viktorijaautokool.ee/features"
        language={i18n.language}
      />
      
      {/* Category A Course Structured Data */}
      <CourseSchema
        name={t('painpoints.categories.a.title')}
        description={t('painpoints.categories.a.description')}
        provider="Viktorija Autokool Nõmme"
        url="https://viktorijaautokool.ee/checkout?category=category-a"
        image="/a-cat.jpg"
        price={570}
      />
      
      {/* Final Course Structured Data */}
      <CourseSchema
        name={t('painpoints.categories.c.title')}
        description={t('painpoints.categories.c.description')}
        provider="Viktorija Autokool Nõmme"
        url="https://viktorijaautokool.ee/checkout?category=category-c"
        image="/final-cat-1.jpg"
        price={150}
      />
      
      <CssBaseline enableColorScheme />
      <AppAppBar toggleColorMode={toggleColorMode} />
      <Hero 
        title={t('hero.features.title')}
        subtitle={t('hero.features.subtitle')}
        description={t('hero.features.description')}
        buttonText={t('hero.features.button')}
        buttonLink="/checkout?category=category-b"
        imageUrl={aCatImg}
        imageAlt={t('hero.features.image_alt')}
      />
      <div>
        {/* Driving Category B */}
        <UrgencySection 
          title={t('urgency.category_b.title')}
          subtitle={t('urgency.category_b.subtitle')}
          mainText={t('urgency.category_b.main_text')}
          highlightText={t('urgency.category_b.highlight_text')}
          mainTextContinuation={t('urgency.category_b.main_text_continuation')}
          offerTitle={t('urgency.category_b.offer_title')}
          offerText={t('urgency.category_b.offer_text')}
          buttonText={t('urgency.category_b.button_text')}
          buttonLink="/checkout?category=category-b"
          limitText={t('urgency.category_b.limit_text')}
        />
        
        <UrgencySection 
          title={t('urgency.exam_prep.title')}
          subtitle={t('urgency.exam_prep.subtitle')}
          mainText={t('urgency.exam_prep.main_text')}
          highlightText={t('urgency.exam_prep.highlight_text')}
          mainTextContinuation={t('urgency.exam_prep.main_text_continuation')}
          offerTitle={t('urgency.exam_prep.offer_title')}
          offerText={t('urgency.exam_prep.offer_text')}
          buttonText={t('urgency.exam_prep.button_text')}
          buttonLink="/checkout?category=category-b"
          limitText={t('urgency.exam_prep.limit_text')}
        />
        
        <UrgencySection 
          title={t('urgency.category_a.title')}
          subtitle={t('urgency.category_a.subtitle')}
          mainText={t('urgency.category_a.main_text')}
          highlightText={t('urgency.category_a.highlight_text')}
          mainTextContinuation={t('urgency.category_a.main_text_continuation')}
          offerTitle={t('urgency.category_a.offer_title')}
          offerText={t('urgency.category_a.offer_text')}
          buttonText={t('urgency.category_a.button_text')}
          buttonLink="/checkout?category=category-a"
          limitText={t('urgency.category_a.limit_text')}
        />
        
        <AdministrativeAutomation 
          title={t('admin_automation.learning.title')}
          subtitle={t('admin_automation.learning.subtitle')}
          benefits={[
            {
              icon: 'schedule',
              title: t('admin_automation.learning.benefits.assessment.title'),
              description: t('admin_automation.learning.benefits.assessment.description'),
            },
            {
              icon: 'description',
              title: t('admin_automation.learning.benefits.plan.title'),
              description: t('admin_automation.learning.benefits.plan.description'),
            },
            {
              icon: 'notifications',
              title: t('admin_automation.learning.benefits.instructor.title'),
              description: t('admin_automation.learning.benefits.instructor.description'),
            }
          ]}
          buttonText={t('admin_automation.learning.button_text')}
          buttonLink="/checkout"
        />

        <UrgencySection 
          title={t('urgency.first_aid.title')}
          subtitle={t('urgency.first_aid.subtitle')}
          mainText={t('urgency.first_aid.main_text')}
          highlightText={t('urgency.first_aid.highlight_text')}
          mainTextContinuation={t('urgency.first_aid.main_text_continuation')}
          offerTitle={t('urgency.first_aid.offer_title')}
          offerText={t('urgency.first_aid.offer_text')}
          buttonText={t('urgency.first_aid.button_text')}
          buttonLink="/checkout?category=category-c"
          limitText={t('urgency.first_aid.limit_text')}
        />

        <AdministrativeAutomation 
          title={t('admin_automation.time_saving.title')}
          subtitle={t('admin_automation.time_saving.subtitle')}
          benefits={[
            {
              icon: 'schedule',
              title: t('admin_automation.time_saving.benefits.schedule.title'),
              description: t('admin_automation.time_saving.benefits.schedule.description'),
            },
            {
              icon: 'notifications',
              title: t('admin_automation.time_saving.benefits.reminders.title'),
              description: t('admin_automation.time_saving.benefits.reminders.description'),
            },
            {
              icon: 'description',
              title: t('admin_automation.time_saving.benefits.documentation.title'),
              description: t('admin_automation.time_saving.benefits.documentation.description'),
            },
            {
              icon: 'payment',
              title: t('admin_automation.time_saving.benefits.payments.title'),
              description: t('admin_automation.time_saving.benefits.payments.description'),
            },
            {
              icon: 'analytics',
              title: t('admin_automation.time_saving.benefits.analytics.title'),
              description: t('admin_automation.time_saving.benefits.analytics.description'),
            },
          ]}
          buttonText={t('admin_automation.time_saving.button_text')}
          buttonLink="/checkout?category=category-b"
        />

        <UrgencySection 
          title={t('urgency.final_course.title')}
          subtitle={t('urgency.final_course.subtitle')}
          mainText={t('urgency.final_course.main_text')}
          highlightText={t('urgency.final_course.highlight_text')}
          mainTextContinuation={t('urgency.final_course.main_text_continuation')}
          offerTitle={t('urgency.final_course.offer_title')}
          offerText={t('urgency.final_course.offer_text')}
          buttonText={t('urgency.final_course.button_text')}
          buttonLink="/checkout?category=category-c"
          limitText={t('urgency.final_course.limit_text')}
        />

        <AIAssistant 
          title={t('ai_assistant.title')}
          subtitle={t('ai_assistant.subtitle')}
          features={[
            {
              title: t('ai_assistant.features.answers.title'),
              description: t('ai_assistant.features.answers.description'),
              icon: 'smartToy',
            },
            {
              title: t('ai_assistant.features.schedule.title'),
              description: t('ai_assistant.features.schedule.description'),
              icon: 'autoAwesome',
            },
            {
              title: t('ai_assistant.features.approach.title'),
              description: t('ai_assistant.features.approach.description'),
              icon: 'psychology',
            },
            {
              title: t('ai_assistant.features.support.title'),
              description: t('ai_assistant.features.support.description'),
              icon: 'star',
            },
            {
              title: t('ai_assistant.features.multilingual.title'),
              description: t('ai_assistant.features.multilingual.description'),
              icon: 'rocketLaunch',
            },
          ]}
          quote={{
            text: t('ai_assistant.quote.text'),
            author: t('ai_assistant.quote.author'),
            position: t('ai_assistant.quote.position'),
          }}
          buttonText={t('ai_assistant.button_text')}
          buttonLink="/checkout?category=category-b"
        />

        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />

        {/* <Divider /> */}
        {/* <Pricing /> */}

        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
};

export default FeaturesPage;