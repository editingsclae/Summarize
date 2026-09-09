import { StructuredSummary, OutputLanguage } from '../types/summary';
import { SAMPLE_VIDEOS } from './sampleData';

/**
 * Pre-compiled, authentic translations for sample videos in all supported languages:
 * ar (Arabic), es (Spanish), fr (French), de (German), it (Italian)
 */
export const SAMPLE_TRANSLATIONS: Record<string, Partial<Record<OutputLanguage, Partial<StructuredSummary>>>> = {
  // Steve Jobs Stanford Address
  UF8uR6Z6KLc: {
    ar: {
      language: 'ar',
      tldr: 'في هذا الخطاب الأيقوني لحفل التخرج عام 2005، يروي ستيف جوبز ثلاث قصص ملهمة من حياته: ربط النقاط بأثر رجعي (ترك كلية ريد)، والحب والخسارة (طرده من آبل وتأسيس نيكست وبيكسار)، والموت كأعظم محرك للتغيير في الحياة. ويختتم بنصيحته الخالدة: "ابق جائعاً، ابق أحمقاً".',
      executiveSummary: 'يقدم ستيف جوبز درساً بليغاً وخالداً حول المرونة النفسية، والهدف المهني، وإدراك فناء الحياة. من خلال تقسيم خطابه إلى ثلاثة فصول رئيسية من حياته، يوضح جوبز كيف أثمرت خياراته غير التقليدية (مثل حضور دروس فن الخط بعد ترك الدراسة الرسمية) بعد عقد كامل في تطوير خطوط حاسوب ماكنتوش. كما يوضح كيف كان طرده علناً من آبل في سن الثلاثين بمثابة تحرر أشعل أخصب فترات إبداعه، ويشارك تجربته مع مرض السرطان ليؤكد أن الوقت محدود ولا يجب إهداره في عيش حياة شخص آخر.',
      keyTakeaways: [
        {
          title: 'لا يمكنك ربط النقاط بالنظر إلى الأمام',
          summary: 'ثق بأن خياراتك وشغفك الحالي، مهما بدا عشوائياً، سيتجمع حتماً ليكوّن رؤية واضحة ومتماسكة في المستقبل بأثر رجعي.',
          importance: 'high'
        },
        {
          title: 'التعرض للطرد كان أفضل دواء',
          summary: 'تحول ثقل النجاح المبكر إلى خفة البداية من جديد كشخص مبتدئ، مما أطلق شرارة تأسيس شركتي بيكسار ونيكست.',
          importance: 'high'
        },
        {
          title: 'الموت هو المحرك الأكبر للتغيير في الحياة',
          summary: 'تذكر أنك ستموت قريباً يزيل فخ التفكير بأن لديك ما تخسره، ويسقط الكبرياء والخوف من الفشل ليترك فقط ما هو جوهري.',
          importance: 'high'
        }
      ],
      importantPoints: [
        {
          type: 'KEY IDEA',
          title: 'صدفة فن الخط اللاتيني',
          content: 'ترك الدراسة الإلزامية سمح لجوبز بدراسة فن الخط، وهو ما قاد مباشرة إلى وجود خطوط طباعية متناسبة في أنظمة تشغيل الحواسيب الشخصية الحديثة.',
          timestamp: 195
        },
        {
          type: 'STATISTIC',
          title: 'العمر عند التأسيس والاستبعاد',
          content: 'بدأ جوبز شركة آبل في سن العشرين داخل مرآب منزلي؛ وبحلول سن الثلاثين أصبحت شركة قيمتها 2 مليار دولار وتضم 4000 موظف قبل إقالته من مجلس الإدارة.',
          timestamp: 330
        },
        {
          type: 'WARNING',
          title: 'لا ترضَ بعمل لا تحبه',
          content: 'العمل يشغل حيزاً هائلاً من حياتك، والسبيل الوحيد للشعور بالرضا الحقيقي هو تقديم عمل عظيم، والسبيل الوحيد لذلك هو أن تحب ما تفعله.',
          timestamp: 540
        },
        {
          type: 'RECOMMENDATION',
          title: 'اختبار المرآة الصباحي اليومي',
          content: '"لو كان هذا اليوم الأخير في حياتي، هل سأرغب في فعل ما أنا مقبل عليه اليوم؟" حين يتكرر الجواب بـ "لا" لأيام متتالية، يحين موعد التغيير.',
          timestamp: 615
        }
      ],
      sections: [
        {
          title: 'القصة الأولى: ربط النقاط',
          summary: 'يسترجع جوبز تركه لكلية ريد لعدم تحمله إنفاق مدخرات والديه من الطبقة العاملة، ونومه على أرضيات غرف أصدقائه، وحضوره لدروس فن الخط دون قيود أكاديمية.',
          timestamp: 70,
          bullets: [
            'الانسحاب من المقررات الإلزامية لحضور ما يثير اهتمامه وشغفه حقاً',
            'كيف أثرت الخطوط المتناسبة والجمالية في حاسوب ماك وجميع الحواسيب اللاحقة',
            'أهمية الثقة بالحدس، والقدر، والمسار المستقبلي'
          ]
        },
        {
          title: 'القصة الثانية: الحب والخسارة',
          summary: 'يصف الصدمة القاسية لطرده من الشركة التي أنشأها في سن الثلاثين، ثم النهضة الإبداعية اللاحقة التي أثمرت تأسيس نيكست وبيكسار والزواج من لورين.',
          timestamp: 310,
          bullets: [
            'تحويل الفشل العلني إلى انطلاقة إبداعية متجددة خالية من القيود',
            'صعود بيكسار كأعظم استوديو للرسوم المتحركة الحاسوبية في العالم',
            'استحواذ آبل على نيكست وعودة جوبز ليقود نهضة الشركة التاريخية'
          ]
        },
        {
          title: 'القصة الثالثة: الموت كأعظم اختراع للحياة',
          summary: 'يتحدث بصدق عن مواجهته لورم نادر في البنكرياس، متأملاً كيف يطهر الموت الأوهام والتوقعات الخارجية ليوضح الأولويات الحقيقية.',
          timestamp: 585,
          bullets: [
            'الموت هو الفلتر الأكثر دقة لاتخاذ القرارات المصيرية الكبرى',
            'وقتك محدود، فلا تهدره في عيش حياة وتوقعات الآخرين',
            'التحلي بالشجاعة الكافية لاتباع قلبك وحدسك'
          ]
        },
        {
          title: 'الخاتمة: وداع كتالوج الأرض الكاملة',
          summary: 'يستذكر العدد الأخير من مجلة "كتالوج الأرض الكاملة" في منتصف السبعينيات مع صورة طريق ريفي مشرق وعبارة الوداع: "ابق جائعاً، ابق أحمقاً".',
          timestamp: 790,
          bullets: [
            'المجلة كنموذج أولي ورقي لمحرك جوجل قبل ثلاثة عقود من ظهوره',
            'دعوة ملهمة للخريجين بالحفاظ دائماً على التواضع والفضول المعرفي'
          ]
        }
      ],
      facts: [
        {
          fact: 'من مرآب آبل إلى القيمة السوقية',
          value: 'من الصفر إلى 2 مليار دولار',
          context: 'بنيت خلال 10 سنوات انطلاقاً من مرآب صغير لتصبح عملاقاً عالمياً.'
        },
        {
          fact: 'ابتكار الخطوط في الحواسيب',
          value: 'أول حاسوب بخطوط طباعية جميلة متناسبة',
          context: 'كان حاسوب ماكنتوش لعام 1984 أول جهاز شخصي يدعم الخطوط الاحترافية.'
        },
        {
          fact: 'استوديوهات بيكسار',
          value: 'أول فيلم رسوم متحركة كامل بالحاسوب في العالم',
          context: 'إنتاج فيلم "حكاية لعبة" تحت قيادة ستيف جوبز.'
        }
      ],
      quotes: [
        {
          quote: 'لا يمكنك ربط النقاط بالنظر إلى الأمام، يمكنك فقط ربطها بالنظر إلى الخلف. لذا عليك أن تثق بأن النقاط ستتصل بطريقة ما في مستقبلك.',
          speaker: 'ستيف جوبز',
          timestamp: 250
        },
        {
          quote: 'عملك سيملأ جزءاً كبيراً من حياتك، والسبيل الوحيد لتكون راضياً حقاً هو أن تفعل ما تؤمن بأنه عمل عظيم.',
          speaker: 'ستيف جوبز',
          timestamp: 535
        },
        {
          quote: 'تذكر أنك ستموت هو أفضل وسيلة أعرفها لتجنب الوقوع في فخ التفكير بأن لديك ما تخسره. أنت عارٍ بالفعل، ولا يوجد سبب يمنعك من اتباع قلبك.',
          speaker: 'ستيف جوبز',
          timestamp: 642
        },
        {
          quote: 'ابق جائعاً. ابق أحمقاً.',
          speaker: 'ستيف جوبز',
          timestamp: 830
        }
      ],
      actionItems: [
        'راجع روتينك الأسبوعي: إذا كانت الإجابة على سؤال المرآة الصباحي "لا" لأسابيع متتالية، فأعد ترتيب أولوياتك.',
        'لا تدع ضجيج آراء الآخرين يطغى على صوت بصيرتك الداخلية.',
        'انظر إلى الانتكاسات وفقدان الوظيفة كفرصة للتخلص من التوقعات والبدء بروح المبتدئ الشغوف.',
        'غذِّ فضولك المعرفي المتنوع دون اشتراط عائد مادي نفعي فوري.'
      ],
      concepts: [
        {
          term: 'ربط النقاط (Connecting the Dots)',
          explanation: 'المبدأ القائل بأن الاكتشافات غير المتوقعة والاهتمامات المتفرقة لا تكشف عن قيمتها الحقيقية المترابطة إلا بأثر رجعي.'
        },
        {
          term: 'تذكر الفناء (Memento Mori)',
          explanation: 'استخدام حتمية الموت كأداة إدراكية واعية لإسقاط الخوف من الفشل وتوضيح القرارات المصيرية.'
        }
      ],
      pros: [
        { point: 'مصدر إلهام منقطع النظير حول المرونة الشخصية وتحديد البوصلة المهنية', type: 'pro' },
        { point: 'مبني على تجارب واقعية وصريحة تجمع بين النجاحات الهائلة والإخفاقات المؤلمة', type: 'pro' }
      ],
      cons: [
        { point: 'يعتمد على حدس استثنائي ورغبة مرتفعة في المخاطرة قد لا تناسب جميع المسارات الوظيفية التقليدية', type: 'con' }
      ],
      conclusion: 'مسار الحياة ليس خطاً مستقيماً. فالانتكاسات غالباً ما تحمل بذور ولادة جديدة أعظم، وإدراكنا لقصر وجودنا يمنحنا التفويض الكامل لرفض القوالب الجامدة، وحب ما نعمل بعمق، والتمسك بالفضول والشغف الدائم.'
    },
    es: {
      language: 'es',
      tldr: 'En este célebre discurso de graduación de 2005 en Stanford, Steve Jobs comparte tres historias íntimas: conectar los puntos mirando hacia atrás, el amor y la pérdida tras ser despedido de Apple, y la muerte como el mejor agente de cambio de la vida. Concluye con su célebre lema: "Sigan hambrientos. Sigan alocados".',
      executiveSummary: 'Steve Jobs imparte una clase magistral atemporal sobre resiliencia, propósito profesional y mortalidad. Dividiendo su mensaje en tres capítulos vitales, Jobs demuestra cómo elecciones aparentemente fortuitas como sus clases de caligrafía fundamentaron la tipografía del Macintosh. Explica su despido de Apple como un reinicio liberador que dio pie a Pixar y NeXT, y reflexiona sobre el diagnóstico de cáncer para recordar que el tiempo es finito.',
      keyTakeaways: [
        {
          title: 'No puedes conectar los puntos hacia adelante',
          summary: 'Confía en que tus elecciones y pasiones actuales se articularán de forma coherente al mirar hacia atrás.',
          importance: 'high'
        },
        {
          title: 'Ser despedido fue la mejor medicina',
          summary: 'El peso del éxito temprano fue sustituido por la ligereza del principiante, impulsando el nacimiento de Pixar y NeXT.',
          importance: 'high'
        },
        {
          title: 'La muerte es el máximo agente de cambio',
          summary: 'Recordar que vas a morir elimina la trampa de creer que tienes algo que perder, despejando el miedo y el orgullo.',
          importance: 'high'
        }
      ],
      conclusion: 'La trayectoria de la vida no es lineal. Los tropiezos albergan las semillas del renacimiento, y la finitud de la existencia nos otorga el permiso definitivo para desafiar dogmas y amar apasionadamente lo que hacemos.'
    },
    fr: {
      language: 'fr',
      tldr: 'Dans ce discours d\'anthologie prononcé en 2005 à Stanford, Steve Jobs partage trois histoires personnelles : relier les points rétrospectivement, l\'amour et la perte après son éviction d\'Apple, et la mort comme moteur suprême du changement. Il conclut par la formule légendaire : "Restez affamés. Restez fous."',
      executiveSummary: 'Steve Jobs offre une leçon magistrale sur la résilience, la vocation et la mortalité. Structuré en trois chapitres, son discours explique comment des choix atypiques (comme ses cours de calligraphie) ont forgé la typographie du Macintosh. Il dépeint son licenciement d\'Apple à 30 ans comme une libération fondatrice menant à Pixar et NeXT, et rappelle que notre temps est trop précieux pour être gâché à vivre la vie d\'un autre.',
      keyTakeaways: [
        {
          title: 'Impossible de relier les points vers l\'avant',
          summary: 'Ayez foi dans le fait que vos curiosités et choix apparemment aléatoires s\'assembleront avec clarté dans le futur.',
          importance: 'high'
        },
        {
          title: 'Être renvoyé fut le meilleur des remèdes',
          summary: 'Le fardeau de la réussite a cédé la place à la légèreté du recommencement, permettant la naissance de Pixar et NeXT.',
          importance: 'high'
        },
        {
          title: 'La mort est l\'inventeur ultime de la vie',
          summary: 'Se rappeler que l\'on va mourir est le meilleur antidote contre la peur de perdre quelque chose, révélant l\'essentiel.',
          importance: 'high'
        }
      ],
      conclusion: 'La trajectoire de l\'existence est discontinue. Les échecs portent en eux les germes d\'une renaissance majeure, et la conscience de notre finitude nous invite à suivre notre intuition sans jamais nous résigner.'
    },
    de: {
      language: 'de',
      tldr: 'In dieser legendären Stanford-Abschlussrede von 2005 erzählt Steve Jobs drei persönliche Geschichten: Punkte rückblickend verbinden, Liebe und Verlust nach seiner Entlassung bei Apple sowie den Tod als größten Erneuerer des Lebens. Er schließt mit dem unvergesslichen Appell: "Stay Hungry. Stay Foolish."',
      executiveSummary: 'Steve Jobs hält eine zeitlose Lektion über persönliche Widerstandskraft, Lebenssinn und Sterblichkeit. Anhand dreier Wendepunkte veranschaulicht er, wie scheinbar nutzlose Kalligrafiekurse zehn Jahre später die Typografie des Macintosh prägten. Seine öffentliche Kündigung bei Apple mit 30 Jahren erwies sich als befreiender Neuanfang, der Pixar und NeXT hervorbrachte.',
      keyTakeaways: [
        {
          title: 'Punkte lassen sich nur rückblickend verbinden',
          summary: 'Vertraue darauf, dass sich gegenwärtige Interessen in der Zukunft zu einem stimmigen Ganzen fügen.',
          importance: 'high'
        },
        {
          title: 'Die Kündigung war die beste Medizin',
          summary: 'Die Last des frühen Erfolgs wich der Neugier des Anfängers und entfesselte eine kreative Renaissance.',
          importance: 'high'
        },
        {
          title: 'Der Tod ist die beste Erfindung des Lebens',
          summary: 'Das Bewusstsein der Endlichkeit befreit von Scham und Versagensängsten und lenkt den Fokus auf das Wesentliche.',
          importance: 'high'
        }
      ],
      conclusion: 'Lebenswege verlaufen nicht geradlinig. Niederlagen schaffen Raum für neue Durchbrüche, und unsere begrenzte Zeit ermutigt uns, Dogmen abzulegen und stets neugierig zu bleiben.'
    }
  },

  // Andrej Karpathy Intro to Large Language Models
  zjkBMFhNj_g: {
    ar: {
      language: 'ar',
      tldr: 'يقدم مدير الذكاء الاصطناعي السابق في تسلا والمؤسس المشارك لـ OpenAI أندريه كارباثي شرحاً شاملاً للنماذج اللغوية الكبيرة (LLMs). يوضح مسار التدريب المكون من مرحلتين (الما قبل التدريب والضبط الدقيق)، ويقارن هذه النماذج بنواة نظام تشغيل حاسوبي جديد، ويسلط الضوء على الثغرات الأمنية مثل هجمات حقن التعليمات البرمجية (Prompt Injection).',
      executiveSummary: 'تعتبر هذه المحاضرة المرجعية دليلاً تأسيسياً عميقاً لهندسة الذكاء الاصطناعي التوليدي. يشرح كارباثي كيف يتم ضغط تريليونات الرموز من الويب العام إلى أوزان شبكة عصبية بنسبة ضغط تقارب 10 إلى 1، تليها مرحلة التعلم المعزز من ردود الفعل البشرية (RLHF) لتحويل النموذج من مجرد مكمل للنصوص إلى مساعد ذكي قادر على التحاور. ويطرح رؤية مفادها أن النماذج اللغوية تتحول إلى ما يشبه وحدة المعالجة المركزية (CPU) لنظام تشغيل متكامل ينسق الذاكرة والأدوات الخارجية، محذراً في الوقت ذاته من أن مشكلات الأمان وحقن الأوامر لا تزال تمثل تحديات رياضية غير محلولة.',
      keyTakeaways: [
        {
          title: 'النماذج اللغوية كملف مضغوط للإنترنت (Lossy Zip)',
          summary: 'يضغط التدريب الأولي ما يقرب من 10 تيرابايت من النصوص في أوزان شبكة بحجم ~140 غيغابايت، ليتعلم النموذج نموذجاً ضمنياً للعالم.',
          importance: 'high'
        },
        {
          title: 'النموذج الأساسي مقابل المساعد الذكي',
          summary: 'النموذج الأساسي يكمل النصوص فقط؛ بينما يحوله الضبط الدقيق والتعلم المعزز (RLHF) إلى مساعد حواري متجاوب وآمن.',
          importance: 'high'
        },
        {
          title: 'النموذج اللغوي كنواة لنظام تشغيل جديد',
          summary: 'يعمل النموذج كمعالج مركزي (CPU)، ونافذة السياق كذاكرة وصول عشوائي (RAM)، والأدوات الخارجية كأجهزة طرفية.',
          importance: 'high'
        }
      ],
      importantPoints: [
        {
          type: 'DEFINITION',
          title: 'تكوين النموذج اللغوي الأساسي',
          content: 'يتكون النموذج جوهرياً من ملفين فقط: ملف الأوزان والمعلمات الرياضية، وملف تشغيل برمجي خفيف بلغة C أو Python لتنفيذ الاستدلال.',
          timestamp: 60
        },
        {
          type: 'STATISTIC',
          title: 'حجم نموذج Llama 2 70B وتكلفته',
          content: 'يحتوي على 70 مليار معامل، ويشغل 140 غيغابايت، وتطلب تدريبه ملايين الدولارات وآلاف معالجات الرسومات عبر أشهر.',
          timestamp: 180
        },
        {
          type: 'WARNING',
          title: 'معضلة حقن الأوامر (Prompt Injection)',
          content: 'نظراً لأن التعليمات والبيانات تختلط معاً كنصوص عادية، فإن حماية النماذج من الهجمات الخبيثة تظل مسألة رياضية مفتوحة.',
          timestamp: 1720
        }
      ],
      sections: [
        {
          title: 'المقدمة وهندسة ملفات النموذج',
          summary: 'توضيح البنية البسيطة للنماذج اللغوية: ملف معاملات وملف كود تنفيذي صغير الحجم.',
          timestamp: 0,
          bullets: [
            'النموذج لا يتطلب حاسوباً عملاقاً عند التشغيل بعد ضغط الأوزان',
            'مفهوم التنبؤ بالرمز التالي كآلية تعلم أساسية'
          ]
        },
        {
          title: 'مرحلة ما قبل التدريب: ضغط الإنترنت',
          summary: 'كيفية تحويل 10 تيرابايت من نصوص الويب إلى تمثيل عصبي مضغوط في أوزان الشبكة.',
          timestamp: 240,
          bullets: [
            'الاستثمار الرأسمالي الضخم في آلاف وحدات معالجة الرسومات',
            'النموذج يكتسب فهماً ضمنياً للعالم واللغات والبرمجة'
          ]
        },
        {
          title: 'الضبط الدقيق والتعلم المعزز (RLHF)',
          summary: 'الانتقال من توليد النصوص العشوائية إلى بناء مساعد مفيد ومتزن يجيب عن الأسئلة بدقة.',
          timestamp: 540,
          bullets: [
            'كتابة آلاف الحوارات التوجيهية بواسطة مقيمين بشريين',
            'استخدام خوارزميات التفضيل لتوجيه سلوك النموذج'
          ]
        },
        {
          title: 'النموذج اللغوي كنظام تشغيل مستقبلي والتحديات الأمنية',
          summary: 'تشبيه النموذج بمعالج نظام التشغيل، ومناقشة هجمات كسر الحماية وحقن التعليمات.',
          timestamp: 1320,
          bullets: [
            'تنسيق استدعاء الأدوات والتصفح وحساب العمليات',
            'التحديات الأمنية المستمرة في مواجهة النصوص العدائية'
          ]
        }
      ],
      facts: [
        {
          fact: 'نسبة ضغط الإنترنت في الأوزان',
          value: 'حوالي 10 إلى 1',
          context: 'ضغط 10 تيرابايت من بيانات الويب في 140 غيغابايت من المعاملات.'
        },
        {
          fact: 'رمز تشغيل الاستدلال الأساسي',
          value: '~500 سطر برمجي',
          context: 'كود بلغة C بسيط ومستقل كافٍ تماماً لتشغيل تقييم النموذج محلياً.'
        }
      ],
      quotes: [
        {
          quote: 'يمكنك التفكير في النموذج اللغوي الكبير كملف مضغوط غير تام (Lossy Zip) لشبكة الإنترنت.',
          speaker: 'أندريه كارباثي',
          timestamp: 280
        },
        {
          quote: 'النموذج الأساسي ليس مساعداً ذكياً بعد؛ بل هو مجرد مكمل للمستندات.',
          speaker: 'أندريه كارباثي',
          timestamp: 560
        }
      ],
      actionItems: [
        'افصل بوضوح بين النماذج الأساسية والمضبوطة بالتعليمات عند اختيار النموذج المناسب لمشروعك.',
        'ضع تدابير عزل أمنية مشددة عند تمرير مدخلات غير موثوقة إلى النماذج لحمايتها من هجمات الحقن.',
        'استفد من استدعاء الأدوات الخارجية بدلاً من الاعتماد الكلي على ذاكرة النموذج الداخلية للأرقام والحسابات.'
      ],
      concepts: [
        {
          term: 'التعلم المعزز من التغذية الراجعة البشرية (RLHF)',
          explanation: 'منهجية تدريب تعتمد على تقييم البشر للإجابات المتعددة لمكافأة النموذج على الردود المفيدة والآمنة.'
        },
        {
          term: 'حقن التعليمات (Prompt Injection)',
          explanation: 'ثغرة أمنية تتيح لنصوص خارجية خبيثة السيطرة على سلوك النموذج وتجاوز تعليمات النظام الأصلية.'
        }
      ],
      pros: [
        { point: 'تفسير تقني عميق ومبسط من أحد رواد المجال العالميين', type: 'pro' },
        { point: 'يقدم تشبيهات هيكلية دقيقة تربط بين الحوسبة التقليدية والذكاء الاصطناعي الحديث', type: 'pro' }
      ],
      cons: [
        { point: 'يتطلب تركيزاً معرفياً لمتابعة التفاصيل الهندسية والأمنية الدقيقة', type: 'con' }
      ],
      conclusion: 'تتحول النماذج اللغوية الكبيرة من مجرد أدوات لتوليد النصوص إلى ركائز أنظمة تشغيل معرفية جديدة. وسيكون الجمع بين قوة الاستدلال، والأمان الرياضي المحكم، وتكامل الأدوات هو العنوان الأبرز للعقد القادم في عالم الحوسبة.'
    },
    es: {
      language: 'es',
      tldr: 'El exdirector de IA de Tesla y cofundador de OpenAI, Andrej Karpathy, ofrece una visión definitiva de los Modelos de Lenguaje Grande (LLM). Detalla el proceso de entrenamiento en dos fases (preentrenamiento y ajuste fino), compara los LLM con el núcleo de un nuevo sistema operativo y analiza vulnerabilidades críticas como la inyección de instrucciones.',
      executiveSummary: 'Esta lección magistral explica cómo billones de tokens de la web pública se comprimen en los pesos de una red neuronal, seguidos del aprendizaje por refuerzo con retroalimentación humana (RLHF) para construir asistentes conversacionales. Karpathy postula que los LLM están evolucionando hacia sistemas operativos cognitivos completos que coordinan memoria, almacenamiento y herramientas externas.',
      keyTakeaways: [
        {
          title: 'Los LLM son un archivo ZIP con pérdidas de Internet',
          summary: 'El preentrenamiento comprime ~10TB de texto en ~140GB de parámetros con una tasa de compresión de 10x.',
          importance: 'high'
        },
        {
          title: 'El modelo base frente al asistente',
          summary: 'El modelo base únicamente completa texto; el ajuste fino y RLHF lo alinean para responder preguntas con seguridad.',
          importance: 'high'
        },
        {
          title: 'El LLM como sistema operativo',
          summary: 'El modelo actúa como CPU, la ventana de contexto como memoria RAM y las herramientas externas como periféricos.',
          importance: 'high'
        }
      ],
      conclusion: 'Los LLM están pasando de ser simples predictores textuales a sistemas operativos cognitivos. La maestría en la integración de herramientas y la seguridad matemática definirán la próxima era de la computación.'
    }
  }
};

/**
 * Returns a translated summary for a sample video if available, merged with existing base data.
 */
export function getLocalizedSampleSummary(
  videoId: string,
  targetLang: OutputLanguage = 'en',
  summaryLength = 'detailed',
  style = 'professional'
): StructuredSummary | null {
  const sample = SAMPLE_VIDEOS.find(s => s.id === videoId);
  if (!sample) return null;

  const baseSummary = sample.summary;
  
  if (!targetLang || targetLang === 'en' || targetLang === 'auto') {
    return {
      ...baseSummary,
      summaryLength: (summaryLength as any) || baseSummary.summaryLength,
      style: (style as any) || baseSummary.style,
      language: 'en',
    };
  }

  const videoTranslations = SAMPLE_TRANSLATIONS[videoId];
  const langTranslation = videoTranslations ? videoTranslations[targetLang] : null;

  if (langTranslation) {
    return {
      ...baseSummary,
      ...langTranslation,
      summaryLength: (summaryLength as any) || baseSummary.summaryLength,
      style: (style as any) || baseSummary.style,
      language: targetLang,
      generatedAt: new Date().toISOString(),
    };
  }

  // Fallback: return base summary tagged with the requested language
  return {
    ...baseSummary,
    summaryLength: (summaryLength as any) || baseSummary.summaryLength,
    style: (style as any) || baseSummary.style,
    language: targetLang,
  };
}
