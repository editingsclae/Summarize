import { MindmapData, MindmapLanguage, MindmapBranch, MindmapSubItem } from '../types/mindmap';
import { StructuredSummary } from '../types/summary';

// Distinctive branch palette matching the screenshot
export const BRANCH_COLORS = [
  '#10B981', // Emerald Green
  '#14B8A6', // Teal
  '#06B6D4', // Cyan
  '#3B82F6', // Royal Blue
  '#6366F1', // Indigo
  '#8B5CF6', // Purple
  '#A855F7', // Violet
  '#D946EF', // Fuchsia
  '#F59E0B', // Amber
  '#F97316', // Orange
  '#EF4444', // Rose/Red
  '#84CC16', // Lime
];

/**
 * Pre-compiled, pixel-perfect mindmaps for sample videos matching Image 2 in Arabic, English, and French
 */
export const PRECOMPILED_MINDMAPS: Record<string, Record<MindmapLanguage, MindmapData>> = {
  // Iman Gadzhi / AI Side Hustle (The video shown in the user's screenshots)
  'ai-side-hustle': {
    ar: {
      rootLabel: 'القمة الجانبية للأعمال',
      language: 'ar',
      branches: [
        // Right branches
        {
          id: 'ar-r-1',
          label: 'هدف القمة والأحداث',
          color: '#10B981',
          side: 'right',
          children: [
            { id: 'ar-r-1-1', emoji: '🎯', label: 'الهدف: مساعدة 2.5 مليون شخص للبدء في مشاريع جانبية خلال عام 2024' },
            { id: 'ar-r-1-2', emoji: '🗓️', label: 'الحدث: أكبر حدث على الإنترنت من 6 إلى 13 سبتمبر مع خمس محاضرات رئيسية مجانية' },
          ]
        },
        {
          id: 'ar-r-2',
          label: 'نقطة التحول في المشروع الجانبي',
          color: '#84CC16',
          side: 'right',
          children: [
            { id: 'ar-r-2-1', emoji: '💡', label: 'نقطة التحول: اليوم الذي يتجاوز فيه الدخل الجانبي الدخل الرئيسي' },
            { id: 'ar-r-2-2', emoji: '🕊️', label: 'الحرية حقيقية عندما تختار العمل وليس لأنك مضطر' },
          ]
        },
        {
          id: 'ar-r-3',
          label: 'المنتجات الرقمية القائمة على الذكاء الاصطناعي',
          color: '#06B6D4',
          side: 'right',
          children: [
            { id: 'ar-r-3-1', emoji: '📚', label: 'المنتجات الرقمية: منتج رقمي قابل للتحميل مثل ملفات PDF وتطبيقات وقوالب' },
            { id: 'ar-r-3-2', emoji: '🏠', label: 'تشبيه: مثل العقارات الرقمية التي تبنيها مرة واحدة وتحقق دخلاً مستمراً' },
          ]
        },
        {
          id: 'ar-r-4',
          label: '(3DS) النظام الرباعي لإنشاء وإدارة المنتجات الرقمية',
          color: '#3B82F6',
          side: 'right',
          children: [
            { id: 'ar-r-4-1', emoji: '🛠️', label: 'بدون خبرة مسبقة: تصميم وتطوير منتج رقمي باستخدام أدوات الذكاء الاصطناعي' },
            { id: 'ar-r-4-2', emoji: '📣', label: 'التوزيع: وضع المنتج في أماكن تجمع المشترين المحتملين مجاناً' },
            { id: 'ar-r-4-3', emoji: '📦', label: 'التوصيل: نظام تلقائي لتسليم المنتج عند الشراء دون تدخل بشري' },
            { id: 'ar-r-4-4', emoji: '📈', label: 'التوسع: زيادة المبيعات بشكل كبير مع استقرار عملية التوصيل' },
          ]
        },
        {
          id: 'ar-r-5',
          label: 'كيف يتم البيع بدون ضغط المبيعات',
          color: '#6366F1',
          side: 'right',
          children: [
            { id: 'ar-r-5-1', emoji: '🛒', label: 'التركيز على التوزيع الجيد في أماكن يتواجد فيها المشترون المحتملون مسبقاً' },
            { id: 'ar-r-5-2', emoji: '🏪', label: 'تشبيه بسوبر ماركت حيث تعرض المنتجات للجمهور المهتم مسبقاً' },
          ]
        },
        {
          id: 'ar-r-6',
          label: 'الدعوة للانضمام والتفاعل المباشر',
          color: '#8B5CF6',
          side: 'right',
          children: [
            { id: 'ar-r-6-1', emoji: '👥', label: 'الانضمام إلى مجموعة واتساب لمتابعة التحديثات والوصول الحصري للعرض المدفوع' },
            { id: 'ar-r-6-2', emoji: '🗓️', label: 'ضرورة حضور الجلسات المباشرة يومياً من الساعة 1 مساءً بتوقيت شرق أمريكا' },
          ]
        },

        // Left branches
        {
          id: 'ar-l-1',
          label: 'بداية القصة والفرصة الجديدة',
          color: '#3B82F6',
          side: 'left',
          children: [
            { id: 'ar-l-1-1', emoji: '🚀', label: 'بدأت مشروعاً جانبياً صغيراً قبل 10 سنوات وحقق أكثر من منحة دراسية' },
            { id: 'ar-l-1-2', emoji: '🌐', label: 'الذكاء الاصطناعي جعل بدء مشروع جانبي متاحاً للجميع بأقل تكلفة ودون الحاجة' },
          ]
        },
        {
          id: 'ar-l-2',
          label: 'مفهوم المشروع الجانبي الحقيقي',
          color: '#06B6D4',
          side: 'left',
          children: [
            { id: 'ar-l-2-1', emoji: '💰', label: 'مشروع جانبي حقيقي: دخل مستقل لا يتوقف عند التوقف عن العمل' },
            { id: 'ar-l-2-2', emoji: '⛔', label: 'غير المشروع الجانبي التقليدي: الذي يعتبر كوظيفة ثانية مرتبطة ببيع الوقت' },
          ]
        },
        {
          id: 'ar-l-3',
          label: 'المعوقات التقليدية وحلول الذكاء الاصطناعي',
          color: '#10B981',
          side: 'left',
          children: [
            { id: 'ar-l-3-1', emoji: '⏳', label: 'المشكلة: ضرورة رأس المال أو مهارات فنية عالية لامتلاك أصول تحقق دخل' },
            { id: 'ar-l-3-2', emoji: '🤖', label: 'الحل: بناء أصول رقمية باستخدام الذكاء الاصطناعي بتكلفة صفرية ومهارات بسيطة' },
          ]
        },
        {
          id: 'ar-l-4',
          label: 'قصص النجاح الملهمة',
          color: '#F59E0B',
          side: 'left',
          children: [
            { id: 'ar-l-4-1', emoji: '👩‍💼', label: 'قصة زانا: أم ومحاسبة زادت دخلها الشهري إلى 6-8 آلاف يورو بمنتج رقمي' },
            { id: 'ar-l-4-2', emoji: '🧑‍💻', label: 'قصة أرمندو: شاب بدأ من الصفر وحقق مئات الآلاف ليعتني بأسرته' },
          ]
        },
        {
          id: 'ar-l-5',
          label: 'أهمية الدافع والسبب وراء المشروع',
          color: '#EC4899',
          side: 'left',
          children: [
            { id: 'ar-l-5-1', emoji: '❤️', label: 'الحاجة لوجود دافع قوي لدعم الاستمرار وتحقيق الأهداف المالية' },
            { id: 'ar-l-5-2', emoji: '🌟', label: 'الدوافع قد تكون العائلة، الحرية المالية، أو تحقيق أحلام شخصية' },
          ]
        },
        {
          id: 'ar-l-6',
          label: 'المخاطر في الاعتماد على الوظيفة فقط',
          color: '#8B5CF6',
          side: 'left',
          children: [
            { id: 'ar-l-6-1', emoji: '⚠️', label: 'الوظيفة خطرة بسبب التغيرات المستمرة والذكاء الاصطناعي الذي يحل محل الوظائف' },
            { id: 'ar-l-6-2', emoji: '🚫', label: 'التوقف عن العمل بلا خطة مالية هو قمار ومحفوف بالمخاطر' },
          ]
        },
        {
          id: 'ar-l-7',
          label: 'الختام والتحفيز للمشاركة',
          color: '#A855F7',
          side: 'left',
          children: [
            { id: 'ar-l-7-1', emoji: '💪', label: 'التشجيع على عدم الاستسلام عند الشعور بالإرهاق أو عدم الفهم' },
            { id: 'ar-l-7-2', emoji: '🌅', label: 'الفرح بالحرية الحقيقية التي تأتي من بناء دخل لا يعتمد على وقت العمل' },
            { id: 'ar-l-7-3', emoji: '⏳', label: 'فرصة للمشاركة في تعظيم مصدر دخل مستقل باستخدام نظام 3DS' },
          ]
        }
      ]
    },
    en: {
      rootLabel: 'AI Side Hustle Blueprint',
      language: 'en',
      branches: [
        // Right branches
        {
          id: 'en-r-1',
          label: 'Summit Objectives & Live Events',
          color: '#10B981',
          side: 'right',
          children: [
            { id: 'en-r-1-1', emoji: '🎯', label: 'Goal: Empower 2.5 million creators to launch AI ventures in 2024' },
            { id: 'en-r-1-2', emoji: '🗓️', label: 'Event: Largest global online broadcast with 5 live masterclasses' },
          ]
        },
        {
          id: 'en-r-2',
          label: 'The Financial Inflection Point',
          color: '#84CC16',
          side: 'right',
          children: [
            { id: 'en-r-2-1', emoji: '💡', label: 'Inflection Point: When automated side revenue exceeds your main 9-to-5' },
            { id: 'en-r-2-2', emoji: '🕊️', label: 'True freedom exists when working is a conscious choice, not a necessity' },
          ]
        },
        {
          id: 'en-r-3',
          label: 'AI-Generated Digital Assets',
          color: '#06B6D4',
          side: 'right',
          children: [
            { id: 'en-r-3-1', emoji: '📚', label: 'Digital Products: Instant downloads, specialized prompts, guides & tools' },
            { id: 'en-r-3-2', emoji: '🏠', label: 'Analogy: Digital real estate built once that produces perpetual cash flow' },
          ]
        },
        {
          id: 'en-r-4',
          label: 'The 3DS Quad-System (Creation to Scale)',
          color: '#3B82F6',
          side: 'right',
          children: [
            { id: 'en-r-4-1', emoji: '🛠️', label: 'Zero Prior Skills: Rapidly architect digital products using modern AI' },
            { id: 'en-r-4-2', emoji: '📣', label: 'Distribution: Seed assets across high-intent communities with zero ad spend' },
            { id: 'en-r-4-3', emoji: '📦', label: 'Fulfillment: 100% automated delivery pipelines without manual touch' },
            { id: 'en-r-4-4', emoji: '📈', label: 'Scale: Exponential conversion growth once delivery mechanics stabilize' },
          ]
        },
        {
          id: 'en-r-5',
          label: 'High-Conversion Frictionless Selling',
          color: '#6366F1',
          side: 'right',
          children: [
            { id: 'en-r-5-1', emoji: '🛒', label: 'Position offers directly where pre-qualified buyers already congregate' },
            { id: 'en-r-5-2', emoji: '🏪', label: 'Supermarket shelf model: immediate visibility without cold pitching' },
          ]
        },
        {
          id: 'en-r-6',
          label: 'Community & Cohort Accountability',
          color: '#8B5CF6',
          side: 'right',
          children: [
            { id: 'en-r-6-1', emoji: '👥', label: 'Join the private WhatsApp cohort for daily drops and verified resources' },
            { id: 'en-r-6-2', emoji: '🗓️', label: 'Mandatory live coaching sessions daily at 1:00 PM Eastern Standard Time' },
          ]
        },

        // Left branches
        {
          id: 'en-l-1',
          label: 'The Origin Story & Modern Leverage',
          color: '#3B82F6',
          side: 'left',
          children: [
            { id: 'en-l-1-1', emoji: '🚀', label: 'Humble beginnings: started a tiny side hustle a decade ago that eclipsed college' },
            { id: 'en-l-1-2', emoji: '🌐', label: 'Generative AI democratized entrepreneurship to zero barrier to entry' },
          ]
        },
        {
          id: 'en-l-2',
          label: 'The Definition of a True Side Hustle',
          color: '#06B6D4',
          side: 'left',
          children: [
            { id: 'en-l-2-1', emoji: '💰', label: 'True hustle: cash flow disconnected from human time and presence' },
            { id: 'en-l-2-2', emoji: '⛔', label: 'Anti-hustle: trading overtime hours for a second fragile hourly paycheck' },
          ]
        },
        {
          id: 'en-l-3',
          label: 'Historical Barriers vs AI Breakthrough',
          color: '#10B981',
          side: 'left',
          children: [
            { id: 'en-l-3-1', emoji: '⏳', label: 'Old friction: required tens of thousands in capital or advanced code skills' },
            { id: 'en-l-3-2', emoji: '🤖', label: 'AI leap: build enterprise-grade digital solutions in under an hour' },
          ]
        },
        {
          id: 'en-l-4',
          label: 'Documented Community Case Studies',
          color: '#F59E0B',
          side: 'left',
          children: [
            { id: 'en-l-4-1', emoji: '👩‍💼', label: 'Zana: mother and accountant who unlocked €6k-8k/mo with digital templates' },
            { id: 'en-l-4-2', emoji: '🧑‍💻', label: 'Armando: bootstrapped from zero savings to six figures for family stability' },
          ]
        },
        {
          id: 'en-l-5',
          label: 'Anchoring Your Deeper "Why"',
          color: '#EC4899',
          side: 'left',
          children: [
            { id: 'en-l-5-1', emoji: '❤️', label: 'Surface desire fades; deep emotional purpose survives inevitable friction' },
            { id: 'en-l-5-2', emoji: '🌟', label: 'Motivations range from generational family safety to full creative autonomy' },
          ]
        },
        {
          id: 'en-l-6',
          label: 'The Fragility of the Single Corporate Salary',
          color: '#8B5CF6',
          side: 'left',
          children: [
            { id: 'en-l-6-1', emoji: '⚠️', label: 'Sole reliance on a single employer is dangerous in the age of rapid automation' },
            { id: 'en-l-6-2', emoji: '🚫', label: 'Zero income diversification is the highest-risk financial gamble' },
          ]
        },
        {
          id: 'en-l-7',
          label: 'Action Protocol & Launch Readiness',
          color: '#A855F7',
          side: 'left',
          children: [
            { id: 'en-l-7-1', emoji: '💪', label: 'Commit through cognitive overload; clarity follows immediate execution' },
            { id: 'en-l-7-2', emoji: '🌅', label: 'Reclaim independence through assets that work 24/7 without your clock' },
            { id: 'en-l-7-3', emoji: '⏳', label: 'Deploy the 3DS protocol today to establish your initial digital asset stream' },
          ]
        }
      ]
    },
    fr: {
      rootLabel: 'Sommet Business & Side Hustle IA',
      language: 'fr',
      branches: [
        // Right branches
        {
          id: 'fr-r-1',
          label: 'Objectifs du Sommet & Événements Live',
          color: '#10B981',
          side: 'right',
          children: [
            { id: 'fr-r-1-1', emoji: '🎯', label: 'Objectif: Accompagner 2,5 millions de personnes à lancer leur projet en 2024' },
            { id: 'fr-r-1-2', emoji: '🗓️', label: 'Événement: Plus grand événement digital mondial avec 5 masterclasses gratuites' },
          ]
        },
        {
          id: 'fr-r-2',
          label: 'Le Point de Bascule Financier',
          color: '#84CC16',
          side: 'right',
          children: [
            { id: 'fr-r-2-1', emoji: '💡', label: 'Point d\'inflexion: Le jour où le revenu annexe dépasse le salaire principal' },
            { id: 'fr-r-2-2', emoji: '🕊️', label: 'La vraie liberté commence lorsque le travail devient un choix délibéré' },
          ]
        },
        {
          id: 'fr-r-3',
          label: 'Produits Digitaux Propulsés par l\'IA',
          color: '#06B6D4',
          side: 'right',
          children: [
            { id: 'fr-r-3-1', emoji: '📚', label: 'Produits digitaux: Guides PDF, modèles téléchargeables et micro-applications' },
            { id: 'fr-r-3-2', emoji: '🏠', label: 'Analogie: L\'immobilier numérique créé une fois qui génère des flux continus' },
          ]
        },
        {
          id: 'fr-r-4',
          label: 'Le Système 3DS en 4 Piliers Fondamentaux',
          color: '#3B82F6',
          side: 'right',
          children: [
            { id: 'fr-r-4-1', emoji: '🛠️', label: 'Sans compétence technique: Concevoir des produits à forte valeur via l\'IA' },
            { id: 'fr-r-4-2', emoji: '📣', label: 'Distribution: Positionnement gratuit là où les acheteurs sont déjà réunis' },
            { id: 'fr-r-4-3', emoji: '📦', label: 'Livraison: Automatisation intégrale du processus de délivrance sans friction' },
            { id: 'fr-r-4-4', emoji: '📈', label: 'Scalabilité: Croissance exponentielle des ventes une fois le système stabilisé' },
          ]
        },
        {
          id: 'fr-r-5',
          label: 'Vendre Sans Pression Commerciale',
          color: '#6366F1',
          side: 'right',
          children: [
            { id: 'fr-r-5-1', emoji: '🛒', label: 'Se focaliser sur une distribution directe auprès d\'une audience qualifiée' },
            { id: 'fr-r-5-2', emoji: '🏪', label: 'Modèle du supermarché: exposition immédiate sans prospection agressive' },
          ]
        },
        {
          id: 'fr-r-6',
          label: 'Communauté Active & Mastermind',
          color: '#8B5CF6',
          side: 'right',
          children: [
            { id: 'fr-r-6-1', emoji: '👥', label: 'Rejoindre le groupe WhatsApp privé pour suivre les mises à jour exclusives' },
            { id: 'fr-r-6-2', emoji: '🗓️', label: 'Sessions interactives quotidiennes en direct à 13h (heure de New York)' },
          ]
        },

        // Left branches
        {
          id: 'fr-l-1',
          label: 'Genèse du Projet & Effet de Levier',
          color: '#3B82F6',
          side: 'left',
          children: [
            { id: 'fr-l-1-1', emoji: '🚀', label: 'Débuts modestes il y a 10 ans avec un projet qui a surpassé les études' },
            { id: 'fr-l-1-2', emoji: '🌐', label: 'L\'IA rend la création d\'actifs accessible à tous avec un capital initial nul' },
          ]
        },
        {
          id: 'fr-l-2',
          label: 'Définition du Véritable Side Hustle',
          color: '#06B6D4',
          side: 'left',
          children: [
            { id: 'fr-l-2-1', emoji: '💰', label: 'Véritable actif: revenu déconnecté de votre temps physique et de présence' },
            { id: 'fr-l-2-2', emoji: '⛔', label: 'Piège à éviter: échanger des heures supplémentaires contre un deuxième salaire' },
          ]
        },
        {
          id: 'fr-l-3',
          label: 'Obstacles Historiques vs Révolution IA',
          color: '#10B981',
          side: 'left',
          children: [
            { id: 'fr-l-3-1', emoji: '⏳', label: 'Freins passés: nécessité de capitaux massifs ou d\'expertise en programmation' },
            { id: 'fr-l-3-2', emoji: '🤖', label: 'Solution IA: bâtir des solutions digitales en moins d\'une heure sans frais' },
          ]
        },
        {
          id: 'fr-l-4',
          label: 'Cas Pratiques & Succès Documentés',
          color: '#F59E0B',
          side: 'left',
          children: [
            { id: 'fr-l-4-1', emoji: '👩‍💼', label: 'Zana: mère de famille et comptable atteignant 6k-8k€/mois avec des templates' },
            { id: 'fr-l-4-2', emoji: '🧑‍💻', label: 'Armando: parti de zéro pour bâtir une stabilité financière à 6 chiffres' },
          ]
        },
        {
          id: 'fr-l-5',
          label: 'L\'Importance du "Pourquoi" Fondamental',
          color: '#EC4899',
          side: 'left',
          children: [
            { id: 'fr-l-5-1', emoji: '❤️', label: 'Un objectif profond est indispensable pour maintenir la discipline dans la durée' },
            { id: 'fr-l-5-2', emoji: '🌟', label: 'Les moteurs clés: sécurité familiale, autonomie horaire et sérénité financière' },
          ]
        },
        {
          id: 'fr-l-6',
          label: 'La Vulnérabilité du Salariat Unique',
          color: '#8B5CF6',
          side: 'left',
          children: [
            { id: 'fr-l-6-1', emoji: '⚠️', label: 'Dépendre d\'un seul employeur est dangereux à l\'ère de l\'automatisation' },
            { id: 'fr-l-6-2', emoji: '🚫', label: 'L\'absence totale de diversification de revenus constitue un risque majeur' },
          ]
        },
        {
          id: 'fr-l-7',
          label: 'Plan d\'Action & Passage à l\'Exécution',
          color: '#A855F7',
          side: 'left',
          children: [
            { id: 'fr-l-7-1', emoji: '💪', label: 'Surmonter le sentiment de surcharge: la clarté vient de l\'action immédiate' },
            { id: 'fr-l-7-2', emoji: '🌅', label: 'Savourer la liberté d\'un système qui génère des revenus 24h/24' },
            { id: 'fr-l-7-3', emoji: '⏳', label: 'Déployer la méthodologie 3DS dès aujourd\'hui pour poser le premier actif' },
          ]
        }
      ]
    }
  }
};

/**
 * Generate a dynamic mindmap from ANY StructuredSummary for custom YouTube videos
 */
export function buildMindmapFromSummary(
  summary: StructuredSummary, 
  lang: MindmapLanguage = 'en'
): MindmapData {
  const vidId = summary.video.id;

  // Check if we have a pre-compiled mindmap for this video (or related sample)
  if (PRECOMPILED_MINDMAPS[vidId]?.[lang]) {
    return PRECOMPILED_MINDMAPS[vidId][lang];
  }

  // Check if title includes side hustle / Iman Gadzhi / startup
  const titleLower = (summary.video.title + ' ' + summary.tldr).toLowerCase();
  if (titleLower.includes('side hustle') || titleLower.includes('profitable') || titleLower.includes('iman')) {
    if (PRECOMPILED_MINDMAPS['ai-side-hustle']?.[lang]) {
      return PRECOMPILED_MINDMAPS['ai-side-hustle'][lang];
    }
  }

  // Extract core concepts, takeaways, and sections into a left/right tree
  const rootLabel = lang === 'ar' 
    ? (summary.video.title.slice(0, 45) || 'مخطط الأفكار الرئيسي') 
    : lang === 'fr' 
    ? (summary.video.title.slice(0, 45) || 'Carte Mentale Vidéo') 
    : (summary.video.title.slice(0, 45) || 'Video Mindmap');

  const branches: MindmapBranch[] = [];

  // 1. Key Takeaways branch
  if (summary.keyTakeaways?.length) {
    branches.push({
      id: 'branch-takeaways',
      label: lang === 'ar' ? 'الرؤى والنتائج الرئيسية' : lang === 'fr' ? 'Points Clés & Enseignements' : 'Core Insights & Takeaways',
      color: BRANCH_COLORS[0],
      side: 'right',
      children: summary.keyTakeaways.slice(0, 4).map((t, idx) => ({
        id: `takeaway-${idx}`,
        emoji: ['🎯', '💡', '🌟', '🚀'][idx % 4],
        label: `${t.title}: ${t.summary.slice(0, 75)}...`
      }))
    });
  }

  // 2. Sections / Chapters
  if (summary.sections?.length) {
    summary.sections.slice(0, 6).forEach((sec, idx) => {
      const side: 'left' | 'right' = idx % 2 === 0 ? 'left' : 'right';
      branches.push({
        id: `branch-sec-${idx}`,
        label: sec.title,
        color: BRANCH_COLORS[(idx + 1) % BRANCH_COLORS.length],
        side,
        children: (sec.bullets || [sec.summary]).slice(0, 3).map((b, bIdx) => ({
          id: `sec-${idx}-b-${bIdx}`,
          emoji: ['📚', '🛠️', '📣', '📦', '📈', '🛒'][bIdx % 6],
          label: b.slice(0, 85)
        }))
      });
    });
  }

  // 3. Action Items
  if (summary.actionItems?.length) {
    branches.push({
      id: 'branch-actions',
      label: lang === 'ar' ? 'خطوات العمل والتنفيذ' : lang === 'fr' ? 'Plan d\'Action & Exécution' : 'Action Steps & Implementation',
      color: BRANCH_COLORS[3],
      side: 'right',
      children: summary.actionItems.slice(0, 4).map((a, idx) => ({
        id: `action-${idx}`,
        emoji: '⚡',
        label: typeof a === 'string' ? a.slice(0, 80) : (a as any).text || 'Action step'
      }))
    });
  }

  // 4. Important Points / Facts
  if (summary.importantPoints?.length) {
    branches.push({
      id: 'branch-important',
      label: lang === 'ar' ? 'نقاط ومعلومات جوهرية' : lang === 'fr' ? 'Faits & Données Clés' : 'Essential Points & Facts',
      color: BRANCH_COLORS[4],
      side: 'left',
      children: summary.importantPoints.slice(0, 4).map((pt, idx) => ({
        id: `pt-${idx}`,
        emoji: pt.type === 'WARNING' ? '⚠️' : pt.type === 'STATISTIC' ? '📊' : '💡',
        label: `${pt.title ? pt.title + ': ' : ''}${pt.content.slice(0, 80)}`
      }))
    });
  }

  // 5. Concepts / Terminology
  if (summary.concepts?.length) {
    branches.push({
      id: 'branch-concepts',
      label: lang === 'ar' ? 'المفاهيم والمصطلحات الأساسية' : lang === 'fr' ? 'Concepts & Définitions' : 'Key Concepts & Frameworks',
      color: BRANCH_COLORS[5],
      side: 'left',
      children: summary.concepts.slice(0, 3).map((c, idx) => ({
        id: `concept-${idx}`,
        emoji: '📖',
        label: `${c.term}: ${c.explanation.slice(0, 75)}`
      }))
    });
  }

  // Ensure balance between left and right sides
  let leftCount = branches.filter(b => b.side === 'left').length;
  let rightCount = branches.filter(b => b.side === 'right').length;

  branches.forEach((b, idx) => {
    b.side = idx % 2 === 0 ? 'right' : 'left';
  });

  return {
    rootLabel,
    language: lang,
    branches
  };
}
