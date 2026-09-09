import { StructuredSummary } from '../types/summary';
import { TranscriptSegment } from '../types/video';

export interface SampleVideo {
  id: string;
  title: string;
  channel: string;
  duration: string;
  durationSeconds: number;
  publishedAt: string;
  thumbnail: string;
  url: string;
  category: string;
  views?: string;
  badgeText?: string;
  verified?: boolean;
  relativeTime?: string;
  transcript?: string;
  segments?: TranscriptSegment[];
  summary: StructuredSummary;
}

export const SAMPLE_VIDEOS: SampleVideo[] = [
  {
    id: 'future-of-ai',
    title: 'The Future of AI',
    channel: 'Kurzgesagt – In a Nutshell',
    duration: '42:17',
    durationSeconds: 2537,
    publishedAt: 'Sep 14, 2026',
    views: '2.4M views',
    badgeText: 'THE FUTURE OF AI',
    verified: true,
    relativeTime: '2 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    url: 'https://www.youtube.com/watch?v=future-of-ai',
    category: 'Artificial Intelligence',
    transcript: 'Artificial Intelligence is shifting from basic tools to autonomous cognitive agents. In this video, we explore the evolutionary trajectory of neural networks, reinforcement learning, and alignment mechanisms over the coming decades.',
    segments: [
      { start: 0, duration: 60, text: 'Introduction to the accelerating pace of artificial intelligence.' },
      { start: 60, duration: 180, text: 'The transition from generative models to agentic reasoning engines.' },
      { start: 240, duration: 200, text: 'Societal and economic implications of widespread automation.' },
      { start: 440, duration: 250, text: 'Long-term safety, alignment, and cognitive architecture.' }
    ],
    summary: {
      video: {
        id: 'future-of-ai',
        title: 'The Future of AI',
        channel: 'Kurzgesagt – In a Nutshell',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        publishedAt: 'Sep 14, 2026',
        url: 'https://www.youtube.com/watch?v=future-of-ai',
        description: 'An in-depth breakdown of the trajectory and societal impact of next-generation AI.'
      },
      tldr: 'Next-generation AI is evolving from passive generative models into active cognitive agents, creating profound shifts across science, technology, and economic systems.',
      executiveSummary: 'This comprehensive analysis explores the transition from conversational models to agentic reasoning engines. The video assesses computing infrastructure scaling, energy requirements, and the societal adaptations needed to harness autonomous cognitive systems safely and productively.',
      keyTakeaways: [
        { title: 'Agentic Architectures', summary: 'AI models now operate tools and execute multi-step plans autonomously.' },
        { title: 'Scaling Laws & Efficiency', summary: 'Algorithmic breakthroughs are drastically cutting inference energy costs.' },
        { title: 'Safety & Alignment', summary: 'Rigorous mathematical verification is replacing heuristic safety filters.' }
      ],
      importantPoints: [
        { point: 'Cognitive agency allows AI systems to pursue goals across days rather than single turns.', type: 'IMPORTANT' },
        { point: 'Energy and compute demand will redefine datacenter architectures by 2030.', type: 'STATISTIC' }
      ],
      sections: [
        {
          title: 'The Evolution of AI',
          summary: 'Historical milestones leading to modern agentic systems.',
          bullets: ['Pattern Recognition', 'Transformers & Generative AI', 'Autonomous Cognitive Agents']
        }
      ],
      facts: [
        { label: 'Compute Scaling', content: 'Inference efficiency has improved 100x over 3 years.' }
      ],
      actionItems: [
        'Understand foundational AI workflows in your domain.',
        'Adopt tool-augmented agents to automate complex administrative tasks.'
      ],
      concepts: [
        { term: 'Cognitive Agency', explanation: 'The ability of an AI system to formulate sub-goals and interact with tools autonomously.' }
      ],
      pros: ['Exponential increase in scientific discovery speed', 'Democratized access to high-tier education and coding'],
      cons: ['Rapid economic dislocation of entry-level knowledge work', 'Unsolved alignment challenges in open-ended agents'],
      conclusion: 'The future of AI is not about replacing human creativity, but amplifying human agency through autonomous cognitive tools.',
      summaryLength: 'detailed',
      style: 'professional',
      language: 'en',
      generatedAt: '2026-09-08T20:00:00Z'
    }
  },
  {
    id: 'how-to-build-a-startup',
    title: 'How to Build a Startup',
    channel: 'Ali Abdaal',
    duration: '18:32',
    durationSeconds: 1112,
    publishedAt: 'Aug 10, 2026',
    views: '1.2M views',
    badgeText: 'BUILD A STARTUP',
    verified: true,
    relativeTime: '5 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    url: 'https://www.youtube.com/watch?v=how-to-build-a-startup',
    category: 'Business & Productivity',
    transcript: 'Building a sustainable startup in 2026 starts with identifying acute user friction, testing minimum viable products with low-code tools, and building distribution from day zero.',
    segments: [
      { start: 0, duration: 60, text: 'Finding real customer pain points and validating market demand.' },
      { start: 60, duration: 180, text: 'Rapid prototyping and launching an MVP within 48 hours.' },
      { start: 240, duration: 200, text: 'Building distribution channels and flywheel retention.' }
    ],
    summary: {
      video: {
        id: 'how-to-build-a-startup',
        title: 'How to Build a Startup',
        channel: 'Ali Abdaal',
        thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        publishedAt: 'Aug 10, 2026',
        url: 'https://www.youtube.com/watch?v=how-to-build-a-startup',
        description: 'A step-by-step practical guide to launching and scaling a lean business.'
      },
      tldr: 'Launch fast, validate demand before writing extensive code, and build a consistent distribution channel to build a high-margin startup.',
      executiveSummary: 'Ali Abdaal breaks down the practical blueprint for starting a modern business. Key pillars include validating willingness-to-pay early, iterating rapidly with AI scaffolding, and prioritizing unit economics over vanity metrics.',
      keyTakeaways: [
        { title: 'Pre-Selling', summary: 'Validate market interest through deposits before investing heavily.' },
        { title: 'Rapid Prototyping', summary: 'Use modern AI frameworks to ship functional MVPs in days.' },
        { title: 'Distribution First', summary: 'A great product without audience reach is doomed to fail.' }
      ],
      importantPoints: [
        { point: 'Distribution is the hardest competitive moat to replicate.', type: 'IMPORTANT' }
      ],
      sections: [
        {
          title: 'The Startup Playbook',
          summary: 'Actionable stages from ideation to scale.',
          bullets: ['Problem Discovery', 'Validation & MVP', 'Customer Retention', 'Scaling Channels']
        }
      ],
      facts: [],
      actionItems: [
        'Interview 10 target users about their primary daily frustration.',
        'Create a landing page with a clear value proposition and waitlist.'
      ],
      concepts: [
        { term: 'Product-Market Fit', explanation: 'The inflection point where user demand outpaces customer acquisition effort.' }
      ],
      pros: ['High leverage and autonomy', 'Scalable financial upside'],
      cons: ['High uncertainty in early stages', 'Requires relentless iteration'],
      conclusion: 'Starting a company is more accessible than ever when leveraging AI tools and distribution-first thinking.',
      summaryLength: 'detailed',
      style: 'action-oriented',
      language: 'en',
      generatedAt: '2026-09-08T18:00:00Z'
    }
  },
  {
    id: 'clean-energy-explained',
    title: 'Clean Energy Explained',
    channel: 'Veritasium',
    duration: '28:16',
    durationSeconds: 1696,
    publishedAt: 'Jul 22, 2026',
    views: '3.8M views',
    badgeText: 'CLEAN ENERGY',
    verified: true,
    relativeTime: '1 day ago',
    thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    url: 'https://www.youtube.com/watch?v=clean-energy-explained',
    category: 'Science & Technology',
    transcript: 'Transitioning to clean energy is not just about generating renewable electricity; it is a grid storage, transmission, and thermodynamics challenge. We break down the physics and engineering realities of solar, wind, nuclear, and next-generation battery chemistries.',
    segments: [
      { start: 0, duration: 60, text: 'The global energy transition landscape.' },
      { start: 60, duration: 180, text: 'Intermittency challenges of solar and wind power.' },
      { start: 240, duration: 200, text: 'Grid-scale battery storage and pumped hydro.' },
      { start: 440, duration: 250, text: 'Small Modular Nuclear Reactors (SMRs) and Baseload Power.' }
    ],
    summary: {
      video: {
        id: 'clean-energy-explained',
        title: 'Clean Energy Explained',
        channel: 'Veritasium',
        thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
        publishedAt: 'Jul 22, 2026',
        url: 'https://www.youtube.com/watch?v=clean-energy-explained',
        description: 'An engineering exploration of renewable generation, grid storage, and clean baseload energy.'
      },
      tldr: 'Renewable energy generation has achieved cost parity with fossil fuels, but solving grid-level long-duration energy storage and baseload stability is the critical final hurdle.',
      executiveSummary: 'This video analyzes the thermodynamics and grid physics of decarbonizing global power systems. While solar PV and onshore wind costs have plummeted, modernizing transmission corridors and installing utility-scale storage are necessary to maintain grid reliability.',
      keyTakeaways: [
        { title: 'Cost Parity Achieved', summary: 'Solar and wind are now the cheapest forms of new power generation per megawatt-hour.' },
        { title: 'The Storage Bottleneck', summary: 'Long-duration chemical and mechanical storage must scale to manage seasonal intermittency.' },
        { title: 'Nuclear Baseload', summary: 'Next-gen SMRs provide clean, high-density baseload power to complement renewables.' }
      ],
      importantPoints: [
        { point: 'Grid storage capacity must increase 10x by 2035 to support 80% renewable penetration.', type: 'STATISTIC' }
      ],
      sections: [
        {
          title: 'The Clean Energy Stack',
          summary: 'Core technologies driving grid decarbonization.',
          bullets: ['Solar & Wind Generation', 'Grid Storage', 'Nuclear SMRs', 'Smart Transmission']
        }
      ],
      facts: [
        { label: 'Storage Metric', content: 'Lithium iron phosphate (LFP) pack costs fell below $60/kWh.' }
      ],
      actionItems: [
        'Understand energy efficiency measures in home and enterprise settings.',
        'Follow developments in long-duration flow batteries and thermal storage.'
      ],
      concepts: [
        { term: 'Baseload Power', explanation: 'The minimum constant level of electrical demand needed across the grid 24/7.' }
      ],
      pros: ['Zero operational greenhouse gas emissions', 'Long-term price stability for electricity'],
      cons: ['High upfront capital expenditure', 'Raw material supply chain constraints'],
      conclusion: 'A reliable clean energy grid requires combining low-cost renewables with flexible storage and firm zero-carbon baseload.',
      summaryLength: 'detailed',
      style: 'educational',
      language: 'en',
      generatedAt: '2026-09-08T15:00:00Z'
    }
  },
  {
    id: 'the-psychology-of-money',
    title: 'The Psychology of Money',
    channel: 'The School of Life',
    duration: '12:45',
    durationSeconds: 765,
    publishedAt: 'Jun 18, 2026',
    views: '5.1M views',
    badgeText: 'THE PSYCHOLOGY OF MONEY',
    verified: true,
    relativeTime: '2 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?auto=format&fit=crop&w=800&q=80',
    url: 'https://www.youtube.com/watch?v=the-psychology-of-money',
    category: 'Psychology & Finance',
    transcript: 'Our relationship with money is rarely rational; it is governed by fear, status anxiety, ego, and early childhood conditioning. In this essay, we explore how understanding the psychological drivers of wealth leads to true financial peace.',
    segments: [
      { start: 0, duration: 60, text: 'Why financial decisions are emotional rather than mathematical.' },
      { start: 60, duration: 180, text: 'The difference between being rich and being truly wealthy.' },
      { start: 240, duration: 200, text: 'Escaping the comparison trap and finding "enough".' }
    ],
    summary: {
      video: {
        id: 'the-psychology-of-money',
        title: 'The Psychology of Money',
        channel: 'The School of Life',
        thumbnail: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?auto=format&fit=crop&w=800&q=80',
        publishedAt: 'Jun 18, 2026',
        url: 'https://www.youtube.com/watch?v=the-psychology-of-money',
        description: 'An insightful exploration of how human psychology, ego, and emotional security shape financial behavior.'
      },
      tldr: 'True wealth is having autonomy over your time rather than displaying status symbols. Emotional control matters far more than financial intellect.',
      executiveSummary: 'This philosophical study unpacks the emotional and psychological complexities around money. It illustrates that financial well-being is defined by controlling one’s desires, valuing personal freedom, and building resilience against social comparison.',
      keyTakeaways: [
        { title: 'Wealth vs. Spending', summary: 'Spending money to show people how much money you have is the fastest way to have less money.' },
        { title: 'Time Autonomy', summary: 'The highest dividend money pays is the ability to control your time.' },
        { title: 'The Concept of "Enough"', summary: 'Inability to feel satisfied destroys more wealth than market downturns.' }
      ],
      importantPoints: [
        { point: 'Financial peace is 80% behavior and mindset, and only 20% spreadsheet mechanics.', type: 'KEY_CONCEPT' }
      ],
      sections: [
        {
          title: 'Psychological Pillars',
          summary: 'Core lessons on financial emotional maturity.',
          bullets: ['Status vs Independence', 'The Power of Compounding', 'Defining "Enough"', 'Margin of Safety']
        }
      ],
      facts: [],
      actionItems: [
        'Define your baseline definition of "enough" in writing.',
        'Prioritize saving for freedom and peace of mind over visible luxury goods.'
      ],
      concepts: [
        { term: 'Time Autonomy', explanation: 'The freedom to wake up every morning and say "I can do whatever I want today".' }
      ],
      pros: ['Reduces anxiety and social comparison', 'Fosters long-term financial resilience'],
      cons: ['Requires counter-cultural discipline in a consumerist society'],
      conclusion: 'Managing money successfully has less to do with how smart you are and more to do with how you behave.',
      summaryLength: 'detailed',
      style: 'executive',
      language: 'en',
      generatedAt: '2026-09-08T12:00:00Z'
    }
  },
  {
    id: 'zjkBMFhNj_g',
    title: '[1hr Talk] Intro to Large Language Models',
    channel: 'Andrej Karpathy',
    duration: '1:00:23',
    durationSeconds: 3623,
    publishedAt: 'Nov 2023',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
    category: 'Artificial Intelligence',
    transcript: 'Hi everyone, this is my intro to Large Language Models (LLMs). This talk is meant for a general audience with no background in AI or computer science required. The core of an LLM is two files: a parameters file containing network weights and a run file with code to evaluate the model. For example, Llama 2 70B has 70 billion parameters, each stored as a 2-byte float, taking up 140 gigabytes. The C code to run inference is only about 500 lines. To train this model, you start with stage 1: Pre-training. You take a massive chunk of the internet—about 10 terabytes of text—and feed it through thousands of GPUs over several months at a cost of millions of dollars. The neural network learns by repeatedly guessing the next word. In doing so, it compresses the internet into network weights at roughly a 10 to 1 compression ratio. You can think of an LLM as a lossy zip file of the internet. The base model is not yet an assistant; it is a document completer. If you ask it "What is the capital of France?", it might respond with another quiz question. To turn it into an assistant, you go to stage 2: Fine-tuning. Here you write instruction conversations—questions and high-quality responses written by human contractors. You train the model on tens of thousands of these dialogues. Then you apply Reinforcement Learning from Human Feedback (RLHF), where human labelers rank multiple candidate responses, and a reward model steers the LLM toward safe, helpful, and concise answers. Looking ahead, LLMs are evolving into the next Operating System. The LLM acts as the CPU kernel, its context window is RAM, tools like calculators or web search are peripheral devices, and vector stores are the hard disk. However, significant security challenges remain, most notably prompt injection attacks, where untrusted third-party text can hijack the system instructions. defending against this remains an open mathematical challenge.',
    segments: [
      { start: 0, duration: 60, text: 'Hi everyone, this is my 1-hour talk introducing Large Language Models.' },
      { start: 60, duration: 180, text: 'An LLM consists of just two files: a weights file and a lightweight run file in C.' },
      { start: 240, duration: 300, text: 'Pre-training takes ~10TB of web text and compresses it into 140GB of neural network parameters.' },
      { start: 540, duration: 360, text: 'The base model is a document completer. Fine-tuning and RLHF align it into a conversational assistant.' },
      { start: 900, duration: 420, text: 'Reinforcement Learning from Human Feedback (RLHF) uses human preference rankings to steer responses.' },
      { start: 1320, duration: 400, text: 'Thinking of LLMs as the CPU of a new operating system coordinating memory, tools, and storage.' },
      { start: 1720, duration: 380, text: 'Prompt injection and adversarial jailbreaks represent critical unsolved security frontiers.' }
    ],
    summary: {
      video: {
        id: 'zjkBMFhNj_g',
        url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
        title: '[1hr Talk] Intro to Large Language Models',
        channel: 'Andrej Karpathy',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        duration: '1:00:23',
        durationSeconds: 3623,
        publishedAt: 'Nov 2023',
        description: 'A 1-hour action-packed introduction to Large Language Models (LLMs), training pipelines, fine-tuning, security risks, and future operating system analogies.'
      },
      tldr: 'Former Tesla AI Director and OpenAI co-founder Andrej Karpathy delivers a definitive overview of Large Language Models (LLMs). He breaks down the 2-step training pipeline (Pre-training and Fine-tuning), compares LLMs to the nascent kernel of a new computing Operating System, and unpacks pressing security vulnerabilities including prompt injection and jailbreaks.',
      executiveSummary: 'This lecture is an authoritative primer on modern generative AI architecture. Karpathy deconstructs how trillions of tokens from the public web are compressed into neural network weights (pre-training), followed by reinforcement learning and instruction tuning (RLHF) to create conversational assistants. He posits that LLMs are not mere text predictors but evolving into full-fledged CPU-like runtime engines that coordinate RAM, disk storage, and external tools, while warning that vulnerabilities like prompt injection remain fundamentally unsolved.',
      keyTakeaways: [
        {
          title: 'LLMs are a Lossy Zip File of the Internet',
          summary: 'Pre-training compresses ~10TB of text into ~140GB of network weights at a roughly 10x compression ratio, learning an implicit world model.',
          importance: 'high'
        },
        {
          title: 'The Two-Stage Training Pipeline is Standard',
          summary: 'Stage 1 (Pre-training) costs millions of dollars across thousands of GPUs; Stage 2 (Fine-tuning & RLHF) aligns the model for human dialogue using curated question-answer pairs.',
          importance: 'high'
        },
        {
          title: 'LLMs Represent the Next Operating System Kernel',
          summary: 'Future computing stacks will see the LLM act as the CPU kernel, with context windows serving as RAM, tools as peripheral devices, and vector stores as disk storage.',
          importance: 'high'
        },
        {
          title: 'Prompt Injection is the SQL Injection of the AI Era',
          summary: 'Because code and data are interleaved as natural language tokens, robustly defending against adversarial prompt injections remains an open mathematical challenge.',
          importance: 'medium'
        }
      ],
      importantPoints: [
        {
          type: 'FACT',
          title: 'Pre-training Scale',
          content: 'Llama 2 70B was trained on roughly 2 trillion tokens processed through 6,000 GPUs over 12 days, costing approximately $2M+ in compute.',
          timestamp: 520
        },
        {
          type: 'STATISTIC',
          title: 'Compression Ratio',
          content: 'The base model compresses roughly 10 Terabytes of raw internet text down to 140 Gigabytes of parameters.',
          timestamp: 785
        },
        {
          type: 'WARNING',
          title: 'Adversarial Prompt Injection',
          content: 'Attacks can hide inside white text on web pages or document metadata, hijacking the LLM instructions without the user noticing.',
          timestamp: 2540
        },
        {
          type: 'RECOMMENDATION',
          title: 'Thinking Time vs Token Generation',
          content: 'Give models "scratchpads" or allow multi-step chain-of-thought to compute intermediate reasoning steps rather than expecting instantaneous correct answers.',
          timestamp: 2110
        },
        {
          type: 'KEY IDEA',
          title: 'System 1 vs System 2 Thinking',
          content: 'Current LLMs operate primarily like Daniel Kahneman\'s System 1 (instinctive, fast pattern matching); future architectures require System 2 deliberate tree-search reflection.',
          timestamp: 2280
        }
      ],
      sections: [
        {
          title: 'Introduction & LLM Mental Model',
          summary: 'Karpathy establishes what an LLM actually consists of: just two files — the parameters weight file (e.g. 140GB) and a small C program (~500 lines) that executes the transformer forward pass.',
          timestamp: 45,
          bullets: [
            'Llama 2 70B architecture overview',
            'Floating point precision (FP16 / INT8 / INT4 quantization)',
            'The inference runtime is remarkably compact'
          ]
        },
        {
          title: 'Pre-Training: Scraping & Token Prediction',
          summary: 'Explains the brute-force next-word prediction objective across Common Crawl, Wikipedia, GitHub, and ArXiv, training neural networks to build a world simulation.',
          timestamp: 480,
          bullets: [
            'Web scraping filtering heuristics',
            'Next-token prediction probability distribution',
            'Base models emulate internet text rather than act like helpful assistants'
          ]
        },
        {
          title: 'Fine-Tuning & Reinforcement Learning (RLHF)',
          summary: 'Detailing how raw base models are transformed into ChatGPT-style assistants using human contractors, reward models, and Reinforcement Learning from Human Feedback.',
          timestamp: 1210,
          bullets: [
            'SFT (Supervised Fine-Tuning) with ~100k curated multi-turn conversations',
            'Comparison ranking and Elo rating optimization',
            'Hallucination mitigation trade-offs'
          ]
        },
        {
          title: 'The LLM OS & Autonomous Tool Use',
          summary: 'Visualizes the paradigm shift where LLMs are conceptualized as the CPU of modern applications, executing Python code, browsing the web, and reading external documents.',
          timestamp: 1980,
          bullets: [
            'Context window as fast working RAM',
            'Calculator & Python REPL as mathematical ALU',
            'Multimodal vision and audio extensions'
          ]
        },
        {
          title: 'Security Frontiers: Jailbreaks & Injections',
          summary: 'Deep dive into adversarial attacks, poisoned training data, and data exfiltration vectors, illustrating why securing LLMs differs fundamentally from classical software.',
          timestamp: 2500,
          bullets: [
            'Universal adversarial suffix strings',
            'Data poisoning in foundational pre-training datasets',
            'Indirect prompt injection vulnerabilities'
          ]
        }
      ],
      facts: [
        {
          fact: 'Llama 2 70B Parameter Count',
          value: '70 Billion parameters',
          context: 'Each parameter is stored as a 2-byte FP16 float, totaling 140 GB.'
        },
        {
          fact: 'Training Dataset Volume',
          value: '2 Trillion tokens',
          context: 'Approximately 10 Terabytes of filtered crawl text.'
        },
        {
          fact: 'Compute Cluster Scale',
          value: '6,000 GPUs for 12 days',
          context: 'Approximate hardware footprint utilized for training Llama 2.'
        },
        {
          fact: 'Pre-training Capital Cost',
          value: '~$2 Million - $5 Million',
          context: 'Estimated raw electricity and hardware allocation cost.'
        },
        {
          fact: 'Inference Codebase Size',
          value: '~500 lines of C code',
          context: 'Demonstrating that the algorithm is simple, but the learned weights are vast.'
        }
      ],
      quotes: [
        {
          quote: 'An LLM is not a database that queries information; it is a lossy zip file of the internet that has learned to dream in text.',
          speaker: 'Andrej Karpathy',
          timestamp: 340
        },
        {
          quote: 'Do not think of LLMs as mere chatbots. Think of them as the CPU of a new operating system.',
          speaker: 'Andrej Karpathy',
          timestamp: 2015
        },
        {
          quote: 'Prompt injection is the security challenge of our generation because data and code are fundamentally indistinguishable to an LLM.',
          speaker: 'Andrej Karpathy',
          timestamp: 2680
        }
      ],
      actionItems: [
        'Do not expose raw system prompts to untrusted third-party user text without sandboxing.',
        'Implement chain-of-thought scratchpad prompting when asking models to perform mathematical or multi-step logic.',
        'Use base models only for custom continuation or domain fine-tuning; use instruction-tuned models for conversational workflows.',
        'Monitor token context limits and implement retrieval-augmented generation (RAG) rather than expanding prompts arbitrarily.'
      ],
      concepts: [
        {
          term: 'Next-Token Prediction',
          explanation: 'The fundamental training objective where a model guesses the highest probability token following a given sequence.'
        },
        {
          term: 'RLHF (Reinforcement Learning from Human Feedback)',
          explanation: 'A technique where human preferences guide a scoring model, training the AI to be helpful, harmless, and honest.'
        },
        {
          term: 'Quantization',
          explanation: 'Reducing weight precision from 16-bit floats to 8-bit or 4-bit integers to run massive models on consumer hardware.'
        },
        {
          term: 'Prompt Injection',
          explanation: 'An attack vector where hostile instructions embedded inside data trick the LLM into ignoring its original instructions.'
        }
      ],
      pros: [
        { point: 'Exceptional zero-shot reasoning across varied domains without task-specific training', type: 'pro' },
        { point: 'Extensibility through tool calling (browsing, code execution, APIs)', type: 'pro' },
        { point: 'Compact inference runtime runnable on commodity hardware via quantization', type: 'pro' }
      ],
      cons: [
        { point: 'Hallucination rate remains non-zero for obscure facts and exact citations', type: 'con' },
        { point: 'Vulnerable to indirect prompt injection and adversarial jailbreaking', type: 'con' },
        { point: 'Astronomical capital and energy costs required for pre-training', type: 'con' }
      ],
      conclusion: 'Large Language Models are undergoing a transition from fascinating text predictors into fundamental cognitive operating systems. While scaling laws continue to advance raw performance, mastering tool integration, System 2 deliberation, and mathematical security boundaries will define the next decade of computing.',
      summaryLength: 'detailed',
      style: 'technical',
      language: 'en',
      generatedAt: new Date().toISOString()
    }
  },
  {
    id: 'UF8uR6Z6KLc',
    title: 'Steve Jobs\' 2005 Stanford Commencement Address',
    channel: 'Stanford University',
    duration: '15:04',
    durationSeconds: 904,
    publishedAt: 'Jun 2005',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    url: 'https://www.youtube.com/watch?v=UF8uR6Z6KLc',
    category: 'Keynotes & Leadership',
    transcript: 'I am honored to be with you today at your commencement from one of the finest universities in the world. I never graduated from college. Truth be told, this is the closest I\'ve ever gotten to a college graduation. Today I want to tell you three stories from my life. That\'s it. No big deal. Just three stories. The first story is about connecting the dots. I dropped out of Reed College after the first 6 months, but then stayed around as a drop-in for another 18 months or so before I really quit. So why did I drop out? It started before I was born. My biological mother was a young, unwed college graduate student, and she decided to put me up for adoption. She felt very strongly that I should be adopted by college graduates, so everything was all set for me to be adopted at birth by a lawyer and his wife. Except that when I popped out they decided at the last minute that they really wanted a girl. So my parents, who were on a waiting list, got a call in the middle of the night asking: "We have an unexpected baby boy; do you want him?" They said: "Of course." My biological mother later found out that my mother had never graduated from college and that my father had never graduated from high school. She refused to sign the final adoption papers. She only relented a few months later when my parents promised that I would someday go to college. And 17 years later I did go to college. But I naively chose a college that was almost as expensive as Stanford, and all of my working-class parents\' savings were being spent on my college tuition. After six months, I couldn\'t see the value in it. I had no idea what I wanted to do with my life and no idea how college was going to help me figure it out. And here I was spending all of the money my parents had saved their entire life. So I decided to drop out and trust that it would all work out OK. It was pretty scary at the time, but looking back it was one of the best decisions I ever made. The minute I dropped out I could stop taking the required classes that didn\'t interest me, and begin dropping in on the ones that looked interesting. Reed College at that time offered perhaps the best calligraphy instruction in the country. Throughout the campus every poster, every label on every drawer, was beautifully hand calligraphed. Because I had dropped out and didn\'t have to take the normal classes, I decided to take a calligraphy class to learn how to do this. I learned about serif and sans serif typefaces, about varying the amount of space between different letter combinations, about what makes great typography great. It was beautiful, historical, artistically subtle in a way that science can\'t capture, and I found it fascinating. None of this had even a hope of any practical application in my life. But 10 years later, when we were designing the first Macintosh computer, it all came back to me. And we designed it all into the Mac. It was the first computer with beautiful typography. If I had never dropped in on that single course in college, the Mac would have never had multiple typefaces or proportionally spaced fonts. And since Windows just copied the Mac, it\'s likely no personal computer would have them. If I had never dropped out, I would have never dropped in on this calligraphy class, and personal computers might not have the wonderful typography that they do. Of course it was impossible to connect the dots looking forward when I was in college. But it was very, very clear looking backward 10 years later. Again, you can\'t connect the dots looking forward; you can only connect them looking backward. So you have to trust that the dots will somehow connect in your future. You have to trust in something — your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life. My second story is about love and loss. I was lucky — I found what I loved to do early in life. Woz and I started Apple in my parents garage when I was 20. In 10 years Apple had grown from just the two of us in a garage into a $2 billion company with over 4000 employees. We had just released our finest creation — the Macintosh — a year earlier, and I had just turned 30. And then I got fired. How can you get fired from a company you started? Well, as Apple grew we hired someone who I thought was very talented to run the company with me, and for the first year or so things went well. But then our visions of the future began to diverge and eventually we had a falling out. When we did, our Board of Directors sided with him. So at 30 I was out. And very publicly out. What had been the focus of my entire adult life was gone, and it was devastating. I really didn\'t know what to do for a few months. I felt that I had let the previous generation of entrepreneurs down - that I had dropped the baton as it was being passed to me. I met with David Packard and Bob Noyce and tried to apologize for screwing up so badly. I was a very public failure, and I even thought about running away from the valley. But something slowly began to dawn on me — I still loved what I did. The turn of events at Apple had not changed that one bit. I had been rejected, but I was still in love. And so I decided to start over. I didn\'t see it then, but it turned out that getting fired from Apple was the best thing that could have ever happened to me. The heaviness of being successful was replaced by the lightness of being a beginner again, less sure about everything. It freed me to enter one of the most creative periods of my life. During the next five years, I started a company named NeXT, another company named Pixar, and fell in love with an amazing woman who would become my wife. Pixar went on to create the world\'s first computer animated feature film, Toy Story, and is now the most successful animation studio in the world. In a remarkable turn of events, Apple bought NeXT, I returned to Apple, and the technology we developed at NeXT is at the heart of Apple\'s current renaissance. And Laurene and I have a wonderful family together. I\'m pretty sure none of this would have happened if I hadn\'t been fired from Apple. It was awful tasting medicine, but I guess the patient needed it. Sometimes life hits you in the head with a brick. Don\'t lose faith. I\'m convinced that the only thing that kept me going was that I loved what I did. You\'ve got to find what you love. And that is as true for your work as it is for your lovers. Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle. As with all matters of the heart, you\'ll know when you find it. And, like any great relationship, it just gets better and better as the years roll on. So keep looking until you find it. Don\'t settle. My third story is about death. When I was 17, I read a quote that went something like: "If you live each day as if it was your last, someday you\'ll most certainly be right." It made an impression on me, and since then, for the past 33 years, I have looked in the mirror every morning and asked myself: "If today were the last day of my life, would I want to do what I am about to do today?" And whenever the answer has been "No" for too many days in a row, I know I need to change something. Remembering that I\'ll be dead soon is the most important tool I\'ve ever encountered to help me make the big choices in life. Because almost everything — all external expectations, all pride, all fear of embarrassment or failure - these things just fall away in the face of death, leaving only what is truly important. Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose. You are already naked. There is no reason not to follow your heart. About a year ago I was diagnosed with cancer. I had a scan at 7:30 in the morning, and it clearly showed a tumor on my pancreas. I didn\'t even know what a pancreas was. The doctors told me this was almost certainly a type of cancer that is incurable, and that I should expect to live no longer than three to six months. My doctor advised me to go home and get my affairs in order, which is doctor\'s code for prepare to die. It means to try to tell your kids everything you thought you\'d have the next 10 years to tell them in just a few months. It means to make sure everything is buttoned up so that it will be as easy as possible for your family. It means to say your goodbyes. I lived with that diagnosis all day. Later that evening I had a biopsy, where they stuck an endoscope down my throat, through my stomach and into my intestines, put a needle into my pancreas and got a few cells from the tumor. I was sedated, but my wife, who was there, told me that when they viewed the cells under a microscope the doctors started crying because it turned out to be a very rare form of pancreatic cancer that is curable with surgery. I had the surgery and I\'m fine now. This was the closest I\'ve been to facing death, and I hope it\'s the closest I get for a few more decades. Having lived through it, I can now say this to you with a bit more certainty than when death was a useful but purely intellectual concept: No one wants to die. Even people who want to go to heaven don\'t want to die to get there. And yet death is the destination we all share. No one has ever escaped it. And that is as it should be, because Death is very likely the single best invention of Life. It is Life\'s change agent. It clears out the old to make way for the new. Right now the new is you, but someday not too long from now, you will gradually become the old and be cleared away. Sorry to be so dramatic, but it is quite true. Your time is limited, so don\'t waste it living someone else\'s life. Don\'t be trapped by dogma — which is living with the results of other people\'s thinking. Don\'t let the noise of others\' opinions drown out your own inner voice. And most important, have the courage to follow your heart and intuition. They somehow already know what you truly want to become. Everything else is secondary. When I was young, there was an amazing publication called The Whole Earth Catalog, which was one of the bibles of my generation. It was created by a fellow named Stewart Brand not far from here in Menlo Park, and he brought it to life with his poetic touch. This was in the late 1960s, before personal computers and desktop publishing, so it was all made with typewriters, scissors and Polaroid cameras. It was sort of like Google in paperback form, 35 years before Google came along: it was idealistic, and overflowing with neat tools and great notions. Stewart and his team put out several issues of The Whole Earth Catalog, and then when it had run its course, they put out a final issue. It was in the mid-1970s, and I was your age. On the back cover of their final issue was a photograph of an early morning country road, the kind you might find yourself hitchhiking on if you were so adventurous. Beneath it were the words: "Stay Hungry. Stay Foolish." It was their farewell message as they signed off. Stay Hungry. Stay Foolish. And I have always wished that for myself. And now, as you graduate to begin anew, I wish that for you. Stay Hungry. Stay Foolish. Thank you all very much.',
    segments: [
      { start: 0, duration: 45, text: 'I am honored to be with you today at your commencement from one of the finest universities in the world.' },
      { start: 45, duration: 60, text: 'Today I want to tell you three stories from my life. That is it. Just three stories.' },
      { start: 105, duration: 90, text: 'The first story is about connecting the dots. I dropped out of Reed College after six months.' },
      { start: 195, duration: 80, text: 'Reed College offered perhaps the best calligraphy instruction in the country. I learned about serif and sans serif typefaces.' },
      { start: 275, duration: 75, text: 'Ten years later, when we were designing the first Macintosh computer, it all came back to me. We designed it all into the Mac.' },
      { start: 350, duration: 70, text: 'You cannot connect the dots looking forward; you can only connect them looking backward. You have to trust in something.' },
      { start: 420, duration: 90, text: 'My second story is about love and loss. Woz and I started Apple in my parents garage when I was 20. And then at 30 I got fired.' },
      { start: 510, duration: 85, text: 'Getting fired from Apple was the best thing that could have ever happened to me. The heaviness of being successful was replaced by the lightness of being a beginner again.' },
      { start: 595, duration: 80, text: 'I started NeXT, another company named Pixar, and fell in love with an amazing woman who would become my wife.' },
      { start: 675, duration: 85, text: 'Your work is going to fill a large part of your life, and the only way to do great work is to love what you do.' },
      { start: 760, duration: 70, text: 'My third story is about death. If you live each day as if it was your last, someday you will most certainly be right.' },
      { start: 830, duration: 65, text: 'Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose.' },
      { start: 895, duration: 75, text: 'Your time is limited, so do not waste it living someone else\'s life. Don\'t be trapped by dogma.' },
      { start: 970, duration: 60, text: 'Stay Hungry. Stay Foolish. Thank you all very much.' }
    ],
    summary: {
      video: {
        id: 'UF8uR6Z6KLc',
        url: 'https://www.youtube.com/watch?v=UF8uR6Z6KLc',
        title: 'Steve Jobs\' 2005 Stanford Commencement Address',
        channel: 'Stanford University',
        thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
        duration: '15:04',
        durationSeconds: 904,
        publishedAt: 'Jun 2005',
        description: 'Steve Jobs, CEO of Apple Computer and Pixar Animation Studios, urges graduates to pursue their dreams and see the opportunities in life\'s setbacks.'
      },
      tldr: 'In this iconic 2005 commencement speech, Steve Jobs tells three personal stories: connecting the dots in hindsight (dropping out of Reed College), love and loss (getting fired from Apple and founding NeXT and Pixar), and death as life\'s greatest change agent. He concludes with the immortal exhortation: "Stay Hungry. Stay Foolish."',
      executiveSummary: 'Steve Jobs delivers a timeless masterclass on resilience, career purpose, and mortality. Structuring his address around three chapters from his life, Jobs demonstrates how unconventional choices (auditing calligraphy classes) directly bore fruit a decade later in the Macintosh typography. He highlights being publicly ousted from Apple at 30 as a liberating reset that unlocked his most creative epoch, and describes his cancer diagnosis to emphasize that time is finite.',
      keyTakeaways: [
        {
          title: 'You Cannot Connect the Dots Looking Forward',
          summary: 'Trust that current seemingly random choices and passions will inevitably synthesize into coherent breakthroughs in retrospect.',
          importance: 'high'
        },
        {
          title: 'Getting Fired Was the Best Medicine',
          summary: 'The heaviness of early success was replaced by the lightness of being a beginner again, sparking Pixar and NeXT.',
          importance: 'high'
        },
        {
          title: 'Death is the Ultimate Change Agent',
          summary: 'Remembering that you are going to die eliminates the trap of thinking you have something to lose, clearing away pride and fear.',
          importance: 'high'
        }
      ],
      importantPoints: [
        {
          type: 'KEY IDEA',
          title: 'The Serendipity of Calligraphy',
          content: 'Dropping out allowed Jobs to drop in on calligraphy, which directly resulted in proportional typography in modern computer operating systems.',
          timestamp: 195
        },
        {
          type: 'STATISTIC',
          title: 'Age at Founding & Dismissal',
          content: 'Jobs started Apple at age 20 in a garage; by age 30, it was a $2 billion company with 4,000 employees before he was ousted by the board.',
          timestamp: 330
        },
        {
          type: 'WARNING',
          title: 'Do Not Settle for Work You Do Not Love',
          content: 'Work fills a large part of life; the only way to be truly satisfied is to do great work, and the only way to do that is to love what you do.',
          timestamp: 540
        },
        {
          type: 'RECOMMENDATION',
          title: 'Daily Mirror Test',
          content: '"If today were the last day of my life, would I want to do what I am about to do today?" When the answer is "No" for too many days, change is required.',
          timestamp: 615
        }
      ],
      sections: [
        {
          title: 'Story 1: Connecting the Dots',
          summary: 'Jobs recounts leaving Reed College because he couldn\'t justify spending his working-class parents\' life savings on tuition, sleeping on friends\' floors, and auditing calligraphy.',
          timestamp: 70,
          bullets: [
            'Dropping out to drop in on classes that genuinely interested him',
            'How Serif and San-Serif calligraphy influenced Mac and modern PC fonts',
            'Trusting intuition, karma, and destiny'
          ]
        },
        {
          title: 'Story 2: Love and Loss',
          summary: 'Describes the devastation of being fired from the company he created at age 30, followed by the freedom that produced NeXT, Pixar (Toy Story), and meeting his wife Laurene.',
          timestamp: 310,
          bullets: [
            'Public failure transformed into creative renaissance',
            'Pixar becoming the world\'s premiere animation studio',
            'Apple purchasing NeXT, bringing Jobs back to ignite the modern Apple resurgence'
          ]
        },
        {
          title: 'Story 3: Death as Life\'s Greatest Invention',
          summary: 'Shares his personal encounter with a rare pancreatic neuroendocrine tumor diagnosis, meditating on how mortality clears away the superficial clutter of societal expectations.',
          timestamp: 585,
          bullets: [
            'Remembering death as the single best decision-making filter',
            'Your time is limited; don\'t waste it living someone else\'s life',
            'Have the courage to follow your heart and intuition'
          ]
        },
        {
          title: 'Conclusion: The Whole Earth Catalog Farewell',
          summary: 'Recalls Stewart Brand\'s final 1970s issue of The Whole Earth Catalog featuring an early morning country road and the parting words: "Stay Hungry. Stay Foolish."',
          timestamp: 790,
          bullets: [
            'The Whole Earth Catalog as the analog Google of the 1960s',
            'A timeless wish for new graduates entering the world'
          ]
        }
      ],
      facts: [
        {
          fact: 'Apple Garage to Market Milestone',
          value: '0 to $2 Billion',
          context: 'Built across 10 years from a 2-person garage into an industry giant.'
        },
        {
          fact: 'Computer Typography Innovation',
          value: 'First Computer with Beautiful Typography',
          context: 'The 1984 Macintosh was the first PC with proportional spaced fonts.'
        },
        {
          fact: 'Pixar Animation Studios',
          value: 'World\'s First Computer Animated Feature Film',
          context: 'Toy Story created under Jobs\' tenure at Pixar.'
        }
      ],
      quotes: [
        {
          quote: 'You can\'t connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future.',
          speaker: 'Steve Jobs',
          timestamp: 250
        },
        {
          quote: 'Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.',
          speaker: 'Steve Jobs',
          timestamp: 535
        },
        {
          quote: 'Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose. You are already naked. There is no reason not to follow your heart.',
          speaker: 'Steve Jobs',
          timestamp: 642
        },
        {
          quote: 'Stay Hungry. Stay Foolish.',
          speaker: 'Steve Jobs',
          timestamp: 830
        }
      ],
      actionItems: [
        'Audit your weekly routine: If the answer to the daily mirror question is "No" for multiple consecutive weeks, realign your priorities.',
        'Do not let the noise of others\' opinions drown out your inner voice.',
        'View setbacks, layoffs, or rejection as opportunities to shed expectations and experiment as a beginner again.',
        'Cultivate diverse multidisciplinary curiosities without demanding immediate utilitarian ROI.'
      ],
      concepts: [
        {
          term: 'Connecting the Dots',
          explanation: 'The principle that serendipitous discoveries and creative pursuits only reveal their true interconnected value in hindsight.'
        },
        {
          term: 'Memento Mori (Mortality Awareness)',
          explanation: 'Using the certainty of death as an active cognitive tool to strip away fear of failure and clarify essential life choices.'
        }
      ],
      pros: [
        { point: 'Unmatched inspiration and clarity on long-term personal resilience', type: 'pro' },
        { point: 'Grounded in authentic triumphs and painful public setbacks', type: 'pro' }
      ],
      cons: [
        { point: 'Relies on extraordinary intuition and high-risk appetite that may not generalize to all career environments', type: 'con' }
      ],
      conclusion: 'Life\'s trajectory is nonlinear. Setbacks often contain the seeds of monumental rebirth, while the reality of our finite existence gives us the ultimate license to reject dogma, pursue deep love in our work, and stay forever foolish.',
      summaryLength: 'standard',
      style: 'educational',
      language: 'en',
      generatedAt: new Date().toISOString()
    }
  }
];
