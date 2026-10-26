export interface Project {
  number: string;
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categories: string[];
  description: string;
  features: string[];
  technologies: string[];
  deploymentInfo?: string;
  featured?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
}

export const projectCategories = [
  'All Projects',
  'Agentic AI',
  'AI Automation',
  'Machine Learning',
  'RAG & Generative AI',
  'Full-Stack Development',
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const projects: Project[] = [
  {
    number: '01',
    id: 'lead-generation-multi-agent-system',
    title: 'Lead Generation Multi-Agent System',
    subtitle: 'Autonomous Lead Intake, Qualification, Research & Scheduling Pipeline',
    category: 'Agentic AI | AI Automation | CRM Integration',
    categories: ['Agentic AI', 'AI Automation'],
    featured: true,
    description:
      'Built an end-to-end multi-agent lead generation and qualification workflow that automates lead intake, duplicate detection, AI-powered research, lead scoring, human approval, and meeting scheduling.',
    features: [
      'Designed an n8n-orchestrated pipeline that processes new CRM leads and performs duplicate detection before qualification.',
      'Implemented a LangGraph-based lead qualification agent with typed state, research tools, deterministic scoring, enrichment, and confidence-based evaluation.',
      'Integrated Chroma-backed retrieval-augmented research and an LLM-as-judge evaluation step with retry logic for low-confidence results.',
      'Implemented Supabase-backed lead storage and PostgreSQL persistence for lead records, qualification scores, and outreach history, exposed through a FastAPI /process-lead endpoint.',
      'Added Tenacity-based exponential backoff for transient failures and graph-level retries for low-confidence research results.',
      'Designed a human-in-the-loop approval workflow before outreach and scheduling, with Slack notifications and calendar/WhatsApp/email automation.',
    ],
    technologies: [
      'n8n',
      'Python',
      'FastAPI',
      'LangGraph',
      'LLMs',
      'Supabase',
      'PostgreSQL',
      'ChromaDB',
      'Tenacity',
      'Slack',
      'WhatsApp Business API',
      'Email APIs',
      'Calendar APIs',
      'Vercel',
      'Render',
    ],
    deploymentInfo: 'n8n Cloud, FastAPI on Render, Vercel, and Supabase',
    demoUrl: 'https://youtu.be/TW8fyo_fQlI',
    imageUrl:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85',
  },
  {
    number: '02',
    id: 'ai-email-assistant',
    title: 'AI Email Assistant',
    subtitle: 'Automated Message Classification, Priority Scoring & Triage',
    category: 'AI Automation | Workflow Automation',
    categories: ['AI Automation'],
    description:
      'Developed an AI-powered email processing workflow that classifies incoming messages, identifies priority, generates concise summaries, and recommends appropriate actions.',
    features: [
      'Automated email intake and processing through n8n.',
      'Integrated Google Gemini API for structured email classification and summarization.',
      'Implemented conditional routing based on email priority and classification.',
      'Normalized processed email data and logged classification, priority, and summary to Google Sheets.',
      'Designed the workflow to reduce manual email triage and improve information organization.',
    ],
    technologies: [
      'n8n',
      'Google Gemini API',
      'Gmail',
      'Google Sheets',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=1200&q=85',
  },
  {
    number: '03',
    id: 'personal-expense-intelligence-platform',
    title: 'Personal Expense Intelligence Platform',
    subtitle: 'Financial Transaction Intelligence, ML Categorization & Live Dashboard',
    category: 'Machine Learning | Financial Data Intelligence | Full-Stack Development',
    categories: ['Machine Learning', 'Full-Stack Development'],
    description:
      'Architected a financial transaction intelligence platform that combines transaction ingestion, document parsing, machine learning-based categorization, anomaly detection, and an interactive dashboard.',
    features: [
      'Designed a FastAPI-based microservices architecture with React and Vite for the frontend and Apache Kafka for transaction ingestion.',
      'Implemented bank statement parsing for PDF, CSV, and XLSX files, using pdfplumber and Tesseract OCR where applicable.',
      'Built a transaction classification engine using TF-IDF and Logistic Regression, with an active-learning workflow that incorporates user corrections.',
      'Implemented anomaly detection using Isolation Forest and Z-score normalization to flag unusual or potentially duplicate transactions.',
      'Developed a real-time dashboard using React, Tailwind CSS, and Recharts with Gemini assistant and Server-Sent Events.',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'Scikit-learn',
      'TF-IDF',
      'Logistic Regression',
      'MiniLM',
      'React',
      'Vite',
      'Tailwind CSS',
      'Recharts',
      'Apache Kafka',
      'Redis',
      'PostgreSQL',
      'Docker',
      'Gemini API',
      'pdfplumber',
      'Tesseract OCR',
      'Server-Sent Events',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
  },
  {
    number: '04',
    id: 'personal-llm-assistant-rag',
    title: 'Personal LLM Assistant — RAG-Based',
    subtitle: 'Context-Grounded Information Retrieval & Vector Search',
    category: 'Generative AI | Retrieval-Augmented Generation',
    categories: ['RAG & Generative AI'],
    description:
      'Built a retrieval-augmented generation assistant that retrieves relevant contextual information before generating responses with a large language model.',
    features: [
      'Implemented a RAG pipeline using FAISS for vector similarity search.',
      'Generated semantic embeddings using Sentence Transformers and all-MiniLM-L6-v2.',
      'Integrated the Gemini 1.5 Flash API for context-grounded responses.',
      'Created a JSON-based ingestion pipeline for structured context processing.',
      'Developed an interactive command-line chat loop for real-time queries.',
    ],
    technologies: [
      'Python',
      'FAISS',
      'Sentence Transformers',
      'all-MiniLM-L6-v2',
      'Google Gemini API',
      'Vector Search',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=85',
  },
  {
    number: '05',
    id: 'image-recognition-deep-neural-networks',
    title: 'Image Recognition Using Deep Neural Networks',
    subtitle: 'Computer Vision Model Architecture, Training & Performance Tuning',
    category: 'Deep Learning | Computer Vision',
    categories: ['Machine Learning'],
    description:
      'Implemented and trained deep neural network models for image classification, focusing on model development, training, evaluation, and performance improvement.',
    features: [
      'Built and trained neural network models using TensorFlow and Keras.',
      'Applied deep learning techniques to image classification.',
      'Experimented with model optimization and performance improvements.',
      'Used debugging and iterative experimentation to improve model behavior.',
    ],
    technologies: [
      'Python',
      'TensorFlow',
      'Keras',
      'Jupyter Notebook',
      'Deep Learning',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    number: '06',
    id: 'resume-interview-bot-rag-gemini',
    title: 'Resume-Based Interview Bot Using RAG and Gemini',
    subtitle: 'Tailored Technical Interview Question Generator via Semantic Extraction',
    category: 'Agentic AI | Generative AI | RAG | NLP',
    categories: ['Agentic AI', 'RAG & Generative AI'],
    description:
      'Developed an AI-powered interview question generation application that analyzes uploaded resumes and generates personalized technical questions grounded in the candidate\'s skills, tools, and project experience.',
    features: [
      'Implemented PDF text extraction, cleaning, and chunking using PyPDF and LangChain.',
      'Built a retrieval-augmented generation pipeline to provide resume-specific context.',
      'Integrated HuggingFace embeddings and ChromaDB for semantic retrieval.',
      'Used Google Gemini to generate personalized technical interview questions.',
      'Created a Streamlit interface with PDF upload, contextual question generation, and resume reset functionality.',
      'Designed the retrieval workflow to reduce generic questions by grounding generation in resume content.',
    ],
    technologies: [
      'Python',
      'Streamlit',
      'LangChain',
      'Google Gemini',
      'HuggingFace Embeddings',
      'ChromaDB',
      'PyPDF',
      'Vector Databases',
      'NLP',
      'Prompt Engineering',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85',
  },
];
