import React from 'react';
import PricingPlan from '../components/Pricing/PricingPlan/PricingPlan';
import FeatureComparison from '../components/Pricing/FeatureComparison/FeatureComparison';
import PricingFAQ from '../components/Pricing/PricingFAQ/PricingFAQ';
import styles from './PricingPage.module.css';

const plans = [
  {
    name: 'Free Tier',
    subtitle: 'Launch securely in minutes',
    price: '$0',
    features: [
      'Up to 50 passwords',
      'Basic encrypted chat',
      '1GB secure file storage',
      'Essential vulnerability scans',
      'Single user'
    ],
    cta: 'Get Started Free',
    note: 'No credit card required'
  },
  {
    name: 'Professional',
    subtitle: 'Scale protection for growing teams',
    price: '$29',
    discount: 'Save 20% annually',
    features: [
      'Unlimited passwords',
      'Advanced encrypted chat',
      '50GB secure file storage',
      'Advanced vulnerability scans',
      'Up to 10 users',
      'Priority support',
      'Compliance reports'
    ],
    cta: 'Start Free Trial',
    popular: true,
    note: '14-day full-featured trial'
  },
  {
    name: 'Enterprise',
    subtitle: 'Custom security with dedicated support',
    price: '$99',
    features: [
      'Everything in Professional',
      'Unlimited users',
      '500GB secure file storage',
      'Custom security modules',
      'Dedicated account manager',
      'SLA guarantee',
      'On-premise deployment'
    ],
    cta: 'Contact Sales',
    note: 'Custom onboarding available'
  }
];

const comparisonFeatures = [
  {
    label: 'Password vault',
    free: 'Up to 50',
    professional: 'Unlimited',
    enterprise: 'Unlimited'
  },
  {
    label: 'Encrypted chat',
    free: 'Basic',
    professional: 'Advanced',
    enterprise: 'Advanced + custom policies'
  },
  {
    label: 'Secure storage',
    free: '1GB',
    professional: '50GB',
    enterprise: '500GB'
  },
  {
    label: 'Vulnerability scans',
    free: 'Essential',
    professional: 'Advanced weekly',
    enterprise: 'Continuous'
  },
  {
    label: 'Users included',
    free: '1',
    professional: 'Up to 10',
    enterprise: 'Unlimited'
  },
  {
    label: 'Priority support',
    free: false,
    professional: true,
    enterprise: 'Dedicated team'
  },
  {
    label: 'Compliance reports',
    free: false,
    professional: true,
    enterprise: true
  },
  {
    label: 'On-prem deployment',
    free: false,
    professional: false,
    enterprise: true
  }
];

const faqs = [
  {
    question: 'Can I switch plans later?',
    answer: 'Absolutely. You can upgrade or downgrade plans at any time. Changes are prorated automatically.'
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer:
      'Yes, Professional and Enterprise plans include a 20% discount when billed annually. Contact sales for custom terms.'
  },
  {
    question: 'Is the free plan really free?',
    answer:
      'Yes, the Free Tier is completely free to use with no credit card required. Upgrade only when you need additional capacity.'
  },
  {
    question: 'How does the free trial work?',
    answer:
      'Professional includes a 14-day trial with all premium features enabled. We’ll remind you before the trial ends.'
  }
];

const PricingPage = () => {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Pricing</p>
        <h1>Enterprise-grade protection for every team</h1>
        <p className={styles.subtitle}>
          Choose a plan that scales with your security maturity. Every tier includes end-to-end encryption, secure
          collaboration, and India-based compliance tooling.
        </p>
        <div className={styles.heroActions}>
          <a href="#plans" className={styles.primaryAction}>
            View plans
          </a>
          <a href="mailto:sales@safenet.in" className={styles.secondaryAction}>
            Talk to sales
          </a>
        </div>
      </section>

      <section className={styles.plans} id="plans">
        {plans.map(plan => (
          <PricingPlan key={plan.name} plan={plan} />
        ))}
      </section>

      <FeatureComparison features={comparisonFeatures} />

      <section className={styles.trust}>
        <div>
          <p>Trusted across India</p>
          <h3>Deployed by finance, healthcare, and public sector teams nationwide.</h3>
        </div>
        <div className={styles.trustStats}>
          <div>
            <span>500+</span>
            <p>Active organizations</p>
          </div>
          <div>
            <span>99.99%</span>
            <p>SLA-backed uptime</p>
          </div>
          <div>
            <span>₹2Cr+</span>
            <p>Average breach savings</p>
          </div>
        </div>
      </section>

      <PricingFAQ faqs={faqs} />
    </main>
  );
};

export default PricingPage;


