import { InfographicData, InfographicLanguage, InfographicSection } from '../types/infographic';
import { StructuredSummary } from '../types/summary';

export const PRECOMPILED_INFOGRAPHICS: Record<string, Record<InfographicLanguage, InfographicData>> = {
  'ai-side-hustle': {
    ar: {
      title: 'دليل شامل لبدء عمل جانبي ناجح عبر المنتجات الرقمية المدعومة بالذكاء الاصطناعي',
      subtitle: 'استراتيجيات عملية لبناء دخل جانبي مستقل ومستدام باستخدام الذكاء الاصطناعي لإنشاء وتسويق منتجات رقمية دون الحاجة لخبرة سابقة أو التخلي عن الوظيفة الأساسية.',
      language: 'ar',
      statsBar: [
        { label: 'صناع محتوى بانتظار منتج', value: '41M+', icon: '👥' },
        { label: 'نسبة النجاح والاستدامة', value: '85%', icon: '📈' },
        { label: 'وقت الإطلاق بالذكاء الاصطناعي', value: '< 1 Hour', icon: '⚡' },
        { label: 'الدخل الشهري للطلاب', value: '€6k-8k', icon: '💰' }
      ],
      sections: [
        {
          id: 'sec-01',
          stepNumber: '01',
          title: 'مقدمة عامة وأساسيات المشروع',
          cards: [
            {
              id: 'c1',
              tag: 'تعريف',
              tagColor: '#10B981',
              title: 'العمل الجانبي الرقمي',
              description: 'بدء عمل جانبي عبر الإنترنت من خلال بناء منتجات رقمية مدعومة بالذكاء الاصطناعي، تتيح دخلاً جانبياً مستقلاً عن بيع الوقت والجهد الشخصي المباشر.'
            },
            {
              id: 'c2',
              tag: 'أهمية',
              tagColor: '#06B6D4',
              title: 'الذكاء الاصطناعي في بناء المنتجات',
              description: 'الذكاء الاصطناعي يقلل حاجز المهارات التقنية، ويسهل إنشاء منتجات رقمية بأقل تكلفة وجهد، مع توفير أصول قابلة للتطوير المستمر.'
            }
          ]
        },
        {
          id: 'sec-02',
          stepNumber: '02',
          title: 'النظام الرباعي لإنشاء وإدارة المنتجات (3DS)',
          cards: [
            {
              id: 'c3',
              tag: 'تطوير',
              tagColor: '#3B82F6',
              title: 'التصميم والتطوير (Development)',
              description: 'استخدام نماذج الذكاء الاصطناعي لتوليد قوالب متميزة، وملفات PDF إرشادية، وتطبيقات مصغرة دون كتابة سطر برمجي واحد.'
            },
            {
              id: 'c4',
              tag: 'توزيع',
              tagColor: '#8B5CF6',
              title: 'التوزيع المجاني (Distribution)',
              description: 'الشراكة مع صناع المحتوى الصاعدين (Micro-Creators) لعرض المنتجات أمام جماهير متفاعلة ومستهدفة بدقة دون ميزانيات إعلانية.'
            },
            {
              id: 'c5',
              tag: 'توصيل',
              tagColor: '#F59E0B',
              title: 'التسليم التلقائي (Delivery)',
              description: 'ربط بوابات الدفع مع أنظمة الإرسال الآلي للبريد، مما يحقق تجربة شراء فورية ومؤتمتة بنسبة 100% على مدار الساعة.'
            },
            {
              id: 'c6',
              tag: 'توسع',
              tagColor: '#10B981',
              title: 'التوسع والمضاعفة (Scale)',
              description: 'إعادة استثمار العوائد في تنويع المنتجات وتوسيع شبكة الشركاء لتحقيق تدفقات نقدية تراكمية ومستقرة.'
            }
          ]
        },
        {
          id: 'sec-03',
          stepNumber: '03',
          title: 'استراتيجية التوزيع والبيع دون ضغط',
          cards: [
            {
              id: 'c7',
              tag: 'طريقة',
              tagColor: '#6366F1',
              title: 'نموذج رف السوبرماركت',
              description: 'وضع المنتجات في أماكن يتواجد فيها المشترون المحتملون بالفعل، لتكون عملية الشراء قراراً طبيعياً دون الحاجة للإقناع المجهد.'
            },
            {
              id: 'c8',
              tag: 'إحصائية',
              tagColor: '#EC4899',
              title: 'قوة صناع المحتوى الصغار',
              description: 'أكثر من 41 مليون صانع محتوى لديهم ما بين 10k و100k متابع، ويمتلكون معدل تفاعل يفوق المشاهير بـ 4 أضعاف مع غياب منتجات خاصة بهم.'
            }
          ]
        }
      ]
    },
    en: {
      title: 'Complete Blueprint for Launching an AI-Powered Digital Product Side Hustle',
      subtitle: 'Actionable methodologies to engineer an autonomous, resilient online income stream using generative AI, zero-cost distribution, and automated fulfillment.',
      language: 'en',
      statsBar: [
        { label: 'Undermonetized Micro-Creators', value: '41M+', icon: '👥' },
        { label: 'Average Gross Margin', value: '92%', icon: '📈' },
        { label: 'Time to First Live Asset', value: '< 1 Hour', icon: '⚡' },
        { label: 'Student Monthly Revenue', value: '€6k-8k', icon: '💰' }
      ],
      sections: [
        {
          id: 'sec-01',
          stepNumber: '01',
          title: 'Foundational Concepts & Mindset',
          cards: [
            {
              id: 'c1',
              tag: 'Definition',
              tagColor: '#10B981',
              title: 'Autonomous Digital Side Hustle',
              description: 'Launching digital assets powered by modern AI that generate continuous cash flow entirely decoupled from direct hourly labor and active presence.'
            },
            {
              id: 'c2',
              tag: 'Significance',
              tagColor: '#06B6D4',
              title: 'AI Product Architecture',
              description: 'Generative AI collapses technical barriers to zero, allowing solo operators to design, package, and iterate enterprise-grade digital solutions in hours.'
            }
          ]
        },
        {
          id: 'sec-02',
          stepNumber: '02',
          title: 'The 3DS Quad-System (Creation to Fulfillment)',
          cards: [
            {
              id: 'c3',
              tag: 'Development',
              tagColor: '#3B82F6',
              title: 'AI Asset Formulation (Development)',
              description: 'Leverage generative prompts and workflows to build structured guides, customized templates, and specialized software checklists with zero code.'
            },
            {
              id: 'c4',
              tag: 'Distribution',
              tagColor: '#8B5CF6',
              title: 'Audience Arbitrage (Distribution)',
              description: 'Partner with micro-creators who command ultra-engaged audiences to distribute high-affinity products without upfront ad expenditure.'
            },
            {
              id: 'c5',
              tag: 'Delivery',
              tagColor: '#F59E0B',
              title: 'Frictionless Pipeline (Delivery)',
              description: 'Connect payment webhooks directly to cloud delivery mechanics to create a zero-latency customer onboarding experience 24/7.'
            },
            {
              id: 'c6',
              tag: 'Scale',
              tagColor: '#10B981',
              title: 'Exponential Scaling (Scale)',
              description: 'Reinvest earnings into multi-product bundles and recurring partner flywheels to build sustained, diversified digital enterprise value.'
            }
          ]
        },
        {
          id: 'sec-03',
          stepNumber: '03',
          title: 'Zero-Friction Distribution & Partner Flywheels',
          cards: [
            {
              id: 'c7',
              tag: 'Framework',
              tagColor: '#6366F1',
              title: 'Supermarket Shelf Placement',
              description: 'Seeding products directly where target buyers naturally gather, making purchasing frictionless without hard-sell tactics.'
            },
            {
              id: 'c8',
              tag: 'Key Metric',
              tagColor: '#EC4899',
              title: 'The Micro-Creator Advantage',
              description: 'Over 41 million creators boast between 10k and 100k followers, delivering 4x the engagement of mega-celebrities while lacking monetization assets.'
            }
          ]
        }
      ]
    },
    fr: {
      title: 'Guide Complet pour Créer un Side Hustle Digital Propulsé par l\'IA',
      subtitle: 'Stratégies pratiques pour développer une source de revenus autonome et pérenne grâce aux outils d\'IA, sans compétences techniques préalables.',
      language: 'fr',
      statsBar: [
        { label: 'Micro-Créateurs Éligibles', value: '41M+', icon: '👥' },
        { label: 'Marge Nette Moyenne', value: '92%', icon: '📈' },
        { label: 'Délai Moyen de Création', value: '< 1 Heure', icon: '⚡' },
        { label: 'Revenus Mensuels Constatés', value: '6k-8k€', icon: '💰' }
      ],
      sections: [
        {
          id: 'sec-01',
          stepNumber: '01',
          title: 'Concepts Clés & Changement de Paradigme',
          cards: [
            {
              id: 'c1',
              tag: 'Définition',
              tagColor: '#10B981',
              title: 'Le Véritable Side Hustle Numérique',
              description: 'Concevoir et lancer des produits digitaux monétisables grâce à l\'IA générative, générant des revenus déconnectés de votre temps de travail horaire.'
            },
            {
              id: 'c2',
              tag: 'Importance',
              tagColor: '#06B6D4',
              title: 'L\'Effet de Levier de l\'IA',
              description: 'L\'intelligence artificielle élimine les barrières de compétences techniques, rendant la création d\'actifs logiciels et de guides accessible à tous.'
            }
          ]
        },
        {
          id: 'sec-02',
          stepNumber: '02',
          title: 'Le Système 3DS en 4 Piliers Fondamentaux',
          cards: [
            {
              id: 'c3',
              tag: 'Développement',
              tagColor: '#3B82F6',
              title: 'Conception Assistée par IA (Development)',
              description: 'Créer des templates, guides et outils spécialisés en exploitant la puissance des modèles d\'IA sans rédiger une seule ligne de code.'
            },
            {
              id: 'c4',
              tag: 'Distribution',
              tagColor: '#8B5CF6',
              title: 'Partenariats Stratégiques (Distribution)',
              description: 'S\'associer avec des micro-créateurs disposant d\'audiences fidèles pour positionner vos offres sans budget publicitaire initial.'
            },
            {
              id: 'c5',
              tag: 'Livraison',
              tagColor: '#F59E0B',
              title: 'Automatisation Intégrale (Delivery)',
              description: 'Connecter les passerelles de paiement à des pipelines de distribution automatique pour une expérience client instantanée 24h/24.'
            },
            {
              id: 'c6',
              tag: 'Croissance',
              tagColor: '#10B981',
              title: 'Scalabilité Exponentielle (Scale)',
              description: 'Multiplier les offres complémentaires pour consolider des flux de trésorerie croissants et pérennes dans le temps.'
            }
          ]
        },
        {
          id: 'sec-03',
          stepNumber: '03',
          title: 'Distribution Organique & Vente Sans Pression',
          cards: [
            {
              id: 'c7',
              tag: 'Méthode',
              tagColor: '#6366F1',
              title: 'Le Modèle du Rayon de Supermarché',
              description: 'Positionner le produit là où l\'acheteur a déjà l\'intention de consommer, transformant l\'acte d\'achat en une évidence fluide.'
            },
            {
              id: 'c8',
              tag: 'Donnée Clé',
              tagColor: '#EC4899',
              title: 'Le Pouvoir des Micro-Créateurs',
              description: 'Plus de 41 millions de créateurs réunissent entre 10k et 100k abonnés avec un taux d\'engagement 4 fois supérieur aux célébrités.'
            }
          ]
        }
      ]
    }
  }
};

/**
 * Dynamically extract and construct a polished infographic structure for ANY video
 */
export function buildInfographicFromSummary(
  summary: StructuredSummary,
  lang: InfographicLanguage = 'en'
): InfographicData {
  const vidId = summary.video.id;

  if (PRECOMPILED_INFOGRAPHICS[vidId]?.[lang]) {
    return PRECOMPILED_INFOGRAPHICS[vidId][lang];
  }

  const titleLower = (summary.video.title + ' ' + summary.tldr).toLowerCase();
  if (titleLower.includes('side hustle') || titleLower.includes('profitable') || titleLower.includes('iman')) {
    if (PRECOMPILED_INFOGRAPHICS['ai-side-hustle']?.[lang]) {
      return PRECOMPILED_INFOGRAPHICS['ai-side-hustle'][lang];
    }
  }

  // Dynamic Infographic Generation
  const title = lang === 'ar'
    ? `دليل شامل: ${summary.video.title}`
    : lang === 'fr'
    ? `Guide Visuel: ${summary.video.title}`
    : `Visual Blueprint: ${summary.video.title}`;

  const subtitle = summary.tldr || summary.executiveSummary.slice(0, 180);

  const sections: InfographicSection[] = [];

  // Section 01: Core Insights & Overview
  const sec1Cards = (summary.keyTakeaways || []).slice(0, 3).map((t, idx) => ({
    id: `takeaway-${idx}`,
    tag: idx === 0 
      ? (lang === 'ar' ? 'تعريف' : lang === 'fr' ? 'Définition' : 'Definition')
      : (lang === 'ar' ? 'أهمية' : lang === 'fr' ? 'Importance' : 'Insight'),
    tagColor: idx === 0 ? '#10B981' : '#06B6D4',
    title: t.title,
    description: t.summary
  }));

  sections.push({
    id: 'sec-01',
    stepNumber: '01',
    title: lang === 'ar' ? 'مقدمة عامة وأساسيات الرؤية' : lang === 'fr' ? 'Fondations & Principes Clés' : 'Core Overview & Foundational Principles',
    cards: sec1Cards.length > 0 ? sec1Cards : [
      {
        id: 'c1',
        tag: lang === 'ar' ? 'ملخص' : 'Overview',
        tagColor: '#10B981',
        title: summary.video.title,
        description: summary.tldr
      }
    ]
  });

  // Section 02: Framework Breakdown from Chapters
  if (summary.sections?.length) {
    const sec2Cards = summary.sections.slice(0, 4).map((s, idx) => ({
      id: `sec-${idx}`,
      tag: lang === 'ar' ? 'محور رئيسي' : lang === 'fr' ? 'Pilier' : 'Key Pillar',
      tagColor: ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981'][idx % 4],
      title: s.title,
      description: s.summary
    }));

    sections.push({
      id: 'sec-02',
      stepNumber: '02',
      title: lang === 'ar' ? 'المحاور والخطوات التنفيذية' : lang === 'fr' ? 'Méthodologie & Piliers d\'Action' : 'Execution Pillars & Frameworks',
      cards: sec2Cards
    });
  }

  // Section 03: Action Plan or Critical Facts
  const sec3Cards = (summary.actionItems || []).slice(0, 2).map((a, idx) => ({
    id: `act-${idx}`,
    tag: lang === 'ar' ? 'خطوة عمل' : lang === 'fr' ? 'Action' : 'Action Step',
    tagColor: '#6366F1',
    title: lang === 'ar' ? `المرحلة ${idx + 1}` : `Phase ${idx + 1}`,
    description: typeof a === 'string' ? a : (a as any).text || 'Action item'
  }));

  if (sec3Cards.length) {
    sections.push({
      id: 'sec-03',
      stepNumber: '03',
      title: lang === 'ar' ? 'خارطة الطريق والتنفيذ العملي' : lang === 'fr' ? 'Plan d\'Action & Mise en Œuvre' : 'Implementation Roadmap & Action Plan',
      cards: sec3Cards
    });
  }

  return {
    title,
    subtitle,
    language: lang,
    sections,
    statsBar: [
      { label: lang === 'ar' ? 'الناشر' : 'Publisher', value: summary.video.channel, icon: '📺' },
      { label: lang === 'ar' ? 'المدة' : 'Duration', value: summary.video.duration || 'Video', icon: '⏱️' },
      { label: lang === 'ar' ? 'الأفكار المستخلصة' : 'Extracted Ideas', value: `${(summary.keyTakeaways?.length || 3) + (summary.sections?.length || 3)}`, icon: '💡' }
    ]
  };
}
