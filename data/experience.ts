export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  type?: string;
  summary: string;
  contributions: string[];
  techStack: string[];
  achievement?: string;
  featured?: boolean;
}

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-synycs',
    role: 'AI/ML Engineer Intern',
    company: 'Synycs',
    location: 'Remote',
    period: 'March 2026 – April 2026',
    type: 'Internship',
    featured: true,
    summary:
      'Engineered a real-time Personal Expense Intelligence Platform leveraging microservices, NLP classification models, and statistical anomaly detection.',
    contributions: [
      'Built an end-to-end Personal Expense Intelligence Platform for real-time financial transaction analysis.',
      'Designed and developed a microservices architecture using FastAPI for transaction processing and machine learning inference.',
      'Implemented transaction classification models using TF-IDF, Logistic Regression, and MiniLM.',
      'Developed an anomaly detection system using Z-score analysis and Isolation Forest to identify unusual spending patterns.',
    ],
    techStack: [
      'Python',
      'FastAPI',
      'Machine Learning',
      'TF-IDF',
      'Logistic Regression',
      'MiniLM',
      'Isolation Forest',
      'Z-score',
      'Microservices',
    ],
  },
  {
    id: 'exp-beyond-career',
    role: 'Web Development Intern',
    company: 'Beyond Career',
    location: 'Remote',
    period: 'February 2025 – May 2025',
    type: 'Internship',
    summary:
      'Developed high-performance web applications, collaborated on full-stack backend integrations, and participated in peer code reviews.',
    contributions: [
      'Developed and maintained responsive web applications using modern front-end technologies.',
      'Collaborated with backend developers to integrate server-side logic and application functionality.',
      'Optimized web applications for improved speed, performance, and scalability.',
      'Participated in code reviews and contributed to collaborative software development practices.',
    ],
    techStack: [
      'Frontend Development',
      'Responsive Web Design',
      'Backend Integration',
      'Web Performance Optimization',
      'Code Reviews',
    ],
  },
  {
    id: 'exp-blackbuck-engineers',
    role: 'Full Stack Developer Intern',
    company: 'Blackbuck Engineers (APSCHE)',
    location: 'Remote',
    period: 'May 2024 – July 2024',
    type: 'Internship',
    summary:
      'Developed full-stack web applications using Django and JavaScript, built RESTful APIs for seamless communication, and managed application deployment and cross-stack troubleshooting.',
    contributions: [
      'Developed full stack web applications using Django framework for backend and JavaScript for frontend.',
      'Created RESTful APIs for seamless communication between client and server components.',
      'Deployed and maintained web applications, troubleshooting issues across the stack.',
    ],
    techStack: [
      'Python',
      'Django',
      'JavaScript',
      'RESTful APIs',
      'Backend Development',
      'Frontend Integration',
      'Deployment',
      'Troubleshooting',
    ],
  },
  {
    id: 'exp-infosys-foundation',
    role: 'Python Web Developer Training',
    company: 'Infosys Foundation Finishing School for Employability Program',
    period: 'May 2024 – July 2024',
    type: 'Training & Certification',
    achievement: 'Grade A+',
    summary:
      'Completed intensive training in Python backend systems and web frameworks, graduating with Grade A+ distinction for project performance.',
    contributions: [
      'Completed intensive Python web development training and earned Grade A+ for performance and project work.',
      'Gained practical backend development experience using Python and Django/Flask frameworks.',
      'Strengthened problem-solving, debugging, and web application optimization skills through hands-on projects.',
    ],
    techStack: [
      'Python',
      'Django',
      'Flask',
      'Backend Development',
      'Debugging',
      'Web Application Development',
    ],
  },
];

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  score: string;
}

export const education: EducationItem[] = [
  {
    id: 'edu-btech',
    degree: 'B.Tech in Artificial Intelligence and Data Science',
    institution: 'Bonam Venkata Chalamayya Engineering College',
    location: 'Odalarevu',
    period: '2021 – 2025',
    score: 'CGPA: 8.52',
  },
  {
    id: 'edu-intermediate',
    degree: 'Intermediate Education',
    institution: 'Ravi Teja Junior College',
    location: 'Allavaram',
    period: '2019 – 2021',
    score: 'Percentage: 89%',
  },
];

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
}

export const certifications: CertificationItem[] = [
  {
    id: 'cert-aws',
    name: 'AWS Academy Machine Learning Foundations',
    issuer: 'AWS Academy',
  },
  {
    id: 'cert-servicenow',
    name: 'ServiceNow Certified System Administrator',
    issuer: 'ServiceNow',
  },
];
