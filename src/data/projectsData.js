/**
 * ============================================================================
 * DELIVERED PROJECTS DATA
 * ============================================================================
 * History Maker Tech — Portfolio & Case Studies
 * 
 * NOTE FOR OWNER:
 * You can easily update, add, or delete projects in this list below.
 * Each project contains:
 *  - id: unique identifier
 *  - title: project or client name
 *  - category: 'Web Engineering' | 'Custom Software' | 'Mobile Apps' | 'AI & CRM' | 'E-Commerce'
 *  - status: e.g. 'Delivered & Live', 'Production Active', 'Enterprise Deployment'
 *  - metric: key highlight or measurable result achieved
 *  - description: concise summary of the business solution delivered
 *  - tech: array of technologies used
 *  - clientLocation: location or industry (optional)
 * ============================================================================
 */

export const PROJECT_CATEGORIES = [
  'All',
  'Web Engineering',
  'Custom Software',
  'Mobile Apps',
  'AI & CRM'
];

export const DELIVERED_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Enterprise Logistics & Fleet Dispatch Engine',
    category: 'Custom Software',
    categoryTag: 'Custom Software',
    status: 'Delivered & Live',
    metric: '4.8x Faster Dispatch · 99.98% Uptime',
    description: 'High-throughput enterprise logistics platform engineered with real-time GPS telemetry, automated driver route allocation, instant invoice reconciliation, and sub-second inventory sync.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'AWS'],
    clientLocation: 'Logistics & Supply Chain'
  },
  {
    id: 'proj-2',
    title: 'OmniFlow AI WhatsApp Automation & CRM',
    category: 'AI & CRM',
    categoryTag: 'AI & CRM',
    status: 'Production Active',
    metric: '85% Inquiries Automated · 24/7 Response',
    description: 'Autonomous multi-tier conversational agent integrated directly with Meta WhatsApp Business API. Auto-qualifies inbound customer leads, triggers CRM pipelines, and updates sales teams in real time.',
    tech: ['Python', 'FastAPI', 'WhatsApp Cloud API', 'OpenAI', 'Redis'],
    clientLocation: 'B2B Retail & Services'
  },
  {
    id: 'proj-3',
    title: 'Pulse Health Telemedicine & Clinical Mobile App',
    category: 'Mobile Apps',
    categoryTag: 'Mobile Apps',
    status: 'Client Handover Completed',
    metric: '25,000+ Active Patients · 4.9★ Rating',
    description: 'Cross-platform iOS and Android healthcare portal with end-to-end encrypted video consults, instant electronic prescription routing, dynamic calendar scheduling, and automated SMS reminders.',
    tech: ['React Native', 'TypeScript', 'WebRTC', 'Firebase', 'Node.js'],
    clientLocation: 'Healthcare & Wellness'
  },
  {
    id: 'proj-4',
    title: 'Aura Luxury Headless E-Commerce Platform',
    category: 'Web Engineering',
    categoryTag: 'Web Engineering',
    status: 'Delivered & Live',
    metric: '320ms Page Loads · +42% Conversion Rate',
    description: 'Architected an ultra-fast headless storefront with bespoke cart workflows, instant multi-currency checkout, dynamic inventory reserve locks, and automated courier tracking integration.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Stripe', 'Node.js'],
    clientLocation: 'Premium E-Commerce'
  },
  {
    id: 'proj-5',
    title: 'Veritas FinTech Escrow & Automated Invoicing Suite',
    category: 'Custom Software',
    categoryTag: 'Custom Software',
    status: 'Enterprise Deployment',
    metric: '100% Automated Invoicing · Zero Discrepancies',
    description: 'Full-cycle enterprise financial tracking portal featuring automated GST-compliant tax invoicing, milestone disbursement management, audit log security, and role-based accounting permissions.',
    tech: ['React', 'Express.js', 'MongoDB', 'AWS Lambda', 'Docker'],
    clientLocation: 'Financial Services'
  },
  {
    id: 'proj-6',
    title: 'SmartInventory Cloud Warehouse Management System',
    category: 'Custom Software',
    categoryTag: 'Custom Software',
    status: 'Production Active',
    metric: '60% Less Stockout · Real-Time Barcode Audit',
    description: 'Multi-location inventory tracking system with dynamic barcode/QR generation, handheld scanner syncing, supplier purchase order automations, and predictive re-order threshold alerts.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind', 'Docker'],
    clientLocation: 'Wholesale & Manufacturing'
  }
];
