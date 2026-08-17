export type ModuleNode = {
  name: string;
  children?: ModuleNode[];
};

export type ProjectCategory = "Web App" | "Enterprise" | "Desktop" | "Marketing";

export type Project = {
  slug: string;
  title: string;
  shortTitle?: string;
  category: ProjectCategory;
  tags: ProjectCategory[]; // used for filter tabs
  status: string;
  company: string;
  companyType?: string;
  tech: string[];
  shortDescription: string;
  fullDescription: string;
  highlights?: string[];
  moduleTree: ModuleNode;
  roleNotes?: string[];
  imageFolder: string; // folder under /public
  order: number;
};

const m = (name: string, children?: ModuleNode[]): ModuleNode => ({
  name,
  children,
});

export const projects: Project[] = [
  {
    slug: "clickmaster-erp",
    title: "ClickMaster ERP",
    category: "Enterprise",
    tags: ["Web App", "Enterprise"],
    status: "Live — 2024–Present",
    company: "ClickMasters Digital Marketing Agency",
    tech: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Socket.IO",
      "Redux Toolkit",
      "Tailwind CSS",
    ],
    shortDescription:
      "Multi-tenant Enterprise Resource Planning system powering HR, Finance, Inventory, Sales, QA, Project Management, and more — actively used by clients.",
    fullDescription:
      "Architected and developed a comprehensive multi-tenant ERP covering the full business lifecycle. Features real-time updates via Socket.IO, deeply modular architecture across 13 major modules, and is actively maintained in production.",
    moduleTree: m("ClickMaster ERP", [
      m("Human Resources", [
        m("Dashboard"),
        m("Payroll", [m("Employee Salary")]),
        m("AI Attendance"),
        m("Employee Info"),
        m("Exit Management"),
        m("Performance"),
        m("Time & Attendance"),
        m("Leave Dashboard"),
        m("Recruitment", [m("Jobs/Candidates")]),
        m("Calendars"),
        m("Staff Requests"),
        m("Required Skills"),
        m("Employee Warnings"),
      ]),
      m("Project Management", [
        m("Home"),
        m("Teams"),
        m("Goals"),
        m("My Tasks"),
        m("Task Reports"),
        m("My Projects"),
        m("SOP"),
        m("Milestone"),
        m("Calendar"),
      ]),
      m("Inventory Management", [
        m("Dashboard"),
        m("Inventory"),
        m("Vendors"),
      ]),
      m("Sales CRM", [
        m("Customers"),
        m("Leads"),
        m("Quotes"),
        m("Invoices"),
        m("Calendar"),
      ]),
      m("Chats"),
      m("Quality Assurance", [
        m("Dashboard"),
        m("Testing Management", [m("All Task"), m("Bug Reports"), m("Settings")]),
      ]),
      m("Request Section"),
      m("User Logs"),
      m("ERP Monitoring", [m("Snap Shots")]),
      m("Customer", [m("Dashboard"), m("Customers")]),
      m("Finance Management", [
        m("Dashboard"),
        m("Expenses"),
        m("Recurring Expenses"),
        m("Purchase Order"),
        m("Bills"),
        m("Payments Made"),
        m("Recurring Bills"),
        m("Vendor Credit"),
      ]),
      m("Blog Publisher", [
        m("Dashboard"),
        m("Websites"),
        m("All Blogs"),
        m("Create Blog"),
        m("Bulk Upload"),
      ]),
      m("Configurations", [
        m("Camera Configurations"),
        m("Attendance Devices"),
        m("Company Settings"),
      ]),
    ]),
    imageFolder: "/erp",
    order: 1,
  },
  {
    slug: "hospital-management-system",
    title: "Hospital Management System",
    shortTitle: "HMS",
    category: "Enterprise",
    tags: ["Web App", "Enterprise"],
    status: "Live — 2024–Present",
    company: "ClickMasters Digital Marketing Agency",
    tech: [
      "React.js",
      "Vite",
      "Redux Toolkit",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
    ],
    shortDescription:
      "Full-featured HMS supporting IPD/OPD management, OT scheduling, ward management, lab, radiology, pharmacy, and real-time financial tracking.",
    fullDescription:
      "A comprehensive Hospital Management System built for real hospital workflows. Supports IPD/OPD management, OT scheduling, ward management, lab and radiology operations, pharmacy with medicine stock, and real-time financial tracking across all departments.",
    moduleTree: m("HMS", [
      m("ADMIN", [
        m("Dashboards"),
        m("Departments"),
        m("Doctors Management"),
        m("Staff Management"),
        m("Lab Management"),
        m("Patient Management"),
        m("Finance Management", [
          m("OPD"),
          m("IPD"),
          m("Lab"),
          m("Radiology"),
        ]),
      ]),
      m("DOCTOR", [
        m("Dashboard"),
        m("My Appointments"),
        m("Patient Records"),
        m("Prescriptions"),
        m("Reports"),
        m("Notes/Diagnosis"),
        m("Settings"),
      ]),
      m("RECEPTIONIST", [
        m("Dashboards"),
        m("Wards"),
        m("Appointments"),
        m("OPD", [m("New"), m("Manage")]),
        m("IPD", [m("Admission List"), m("SSP"), m("Private")]),
        m("OT Schedule"),
        m("Refunds"),
        m("Pharmacy", [m("Medicine List"), m("Prescription"), m("Stock")]),
        m("Inventory"),
        m("Calendar"),
        m("Expenses"),
        m("Summary"),
      ]),
      m("LAB", [
        m("Dashboards"),
        m("Test Management"),
        m("Patient Management"),
        m("Report Management"),
        m("Billing Management"),
        m("Expenses"),
        m("Ultrasound"),
      ]),
      m("RADIOLOGY", [m("Ultrasound", [m("Patient")])]),
    ]),
    imageFolder: "/hms",
    order: 2,
  },
  {
    slug: "nexus-crm",
    title: "Nexus CRM",
    category: "Enterprise",
    tags: ["Web App", "Enterprise"],
    status: "Live — 2025–Present",
    company: "ClickMasters Digital Marketing Agency",
    tech: [
      "Next.js",
      "Django REST Framework",
      "Daphne",
      "WebSockets",
      "Redis",
      "PostgreSQL",
      "TypeScript",
    ],
    shortDescription:
      "Multi-module business platform with HR, Inventory, Sales, Finance, AI Monitoring, and a granular permissions system — the most architecturally complex system I've built.",
    fullDescription:
      "The most architecturally complex system I've built — a multi-module business platform covering HR, Inventory, Sales, Finance and AI-powered monitoring. Built on Django REST Framework with Daphne + WebSockets for real-time updates and PostgreSQL for data. Features a granular role-based permissions system controlling access across every module.",
    moduleTree: m("Nexus CRM", [
      m("Dashboard"),
      m("Human Resources", [
        m("Employee Management"),
        m("Payroll"),
        m("Time & Attendance"),
        m("Leave Management"),
        m("Shift Management", [m("Shifts"), m("Templates")]),
        m("Inventory Assets", [m("Assets"), m("Kits"), m("Assignments")]),
        m("Performance"),
        m("Recruitment"),
        m("Exit Management"),
        m("HR Policies"),
        m("Compensation & Loan"),
      ]),
      m("Inventory", [
        m("Dashboard"),
        m("Warehouse Management"),
        m("Categories"),
        m("Brands"),
        m("Product Management"),
        m("Suppliers & Vendors"),
        m("Customers"),
        m("Purchase Management"),
        m("Stock Management"),
        m("Inventory Transfers"),
        m("Barcode & QR"),
        m("Selling/POS"),
        m("Alerts"),
        m("Audit Logs"),
      ]),
      m("Sales", [
        m("Dashboard"),
        m("Leads"),
        m("Quotes"),
        m("Invoices"),
        m("Return & Refund"),
        m("Sales Customers"),
      ]),
      m("Finance", [
        m("Dashboard"),
        m("Accounts"),
        m("Customer Invoice"),
        m("Return & Refund"),
        m("Expenses"),
        m("Finance Reports"),
        m("Payables/Supplier Bills"),
        m("Payments"),
        m("Finance Payroll"),
        m("Finance Audit Logs"),
        m("Forecast"),
      ]),
      m("AI Monitoring", [
        m("Live Dashboard"),
        m("Activity Tracking"),
        m("Inventory Monitoring"),
        m("Workforce Monitoring"),
        m("Alerts & Events"),
        m("Reports & Insights"),
        m("Camera Configuration"),
      ]),
      m("Settings", [
        m("Company Profile"),
        m("Terms & Conditions"),
        m("Users & Roles"),
        m("Permissions"),
        m("Departments"),
        m("Designations"),
        m("Preferences"),
      ]),
    ]),
    imageFolder: "/nexus",
    order: 3,
  },
  {
    slug: "alpha-ai-tracker",
    title: "Alpha AI Tracker",
    category: "Desktop",
    tags: ["Desktop"],
    status: "In Progress — 2026–Present",
    company: "ClickMasters Digital Marketing Agency",
    companyType: "ClickMasters Project",
    tech: [
      ".NET 10",
      "Avalonia",
      "Go",
      "PostgreSQL",
      "Redis",
      "Next.js",
      "React",
      "Redux Toolkit",
      "SQLite",
    ],
    shortDescription:
      "Cross-platform employee monitoring desktop agent with browser journey tracking, AT-SPI accessibility integration, hardware detection, and a Go-powered REST API backend — currently in active development.",
    fullDescription:
      "A full-stack monorepo system consisting of three independently deployable services: a .NET 10 / Avalonia desktop agent (the tracking client on the employee machine), a Go + PostgreSQL + Redis REST API server, and a Next.js admin dashboard. The desktop agent collects GUI application sessions, browser journeys (including incognito via AT-SPI), installed software/packages, hardware peripherals, network info, and file explorer events — all stored locally in SQLite and synced to the server. Features AES-256-GCM encrypted config, automated GitHub Releases self-update (Linux dpkg / Windows silent installer / macOS dmg), and a branding-single-source system where one file controls the entire product identity across all installers and UI surfaces.",
    highlights: [
      "Desktop client (~85% complete): Cross-platform process collection (Windows/Linux/macOS), cgroup-based multi-process app deduplication (VS Code, Chrome → one session per logical window), AT-SPI browser journey tracking with incognito support, hybrid URL fallback via browser History DB, file explorer journey tracking, hardware device plug/unplug tracking (USB + analog audio), encrypted config (AES-256-GCM transport→machine key), single-instance mutex, auto-update from GitHub Releases",
      "Server (~50% complete): 19 append-only SQL migrations, 11 sync endpoints, full CRUD for employees/users/departments, JWT + Redis one-time secret auth, catalog dedup by fingerprint, staleness sweep background job",
      "Web dashboard: Next.js App Router, ~30 authenticated route sections (dashboard, employees, apps, logs, charts, reports, attendance, DLP, screenshots, settings), mostly scaffolded",
      "Monorepo architecture: three services with no shared tooling, each building independently; branding and version controlled from two files (APP_IDENTIFIERS + VERSION)",
    ],
    moduleTree: m("Alpha AI Tracker", [
      m("Desktop Client", [
        m("Splash"),
        m("Login"),
        m("Permission Setup"),
        m("Dashboard"),
        m("System Specs"),
        m("Installed Apps"),
      ]),
      m("Server API", [
        m("/api/v1: auth"),
        m("employees"),
        m("departments"),
        m("device-hardware"),
        m("installed-apps"),
        m("installed-packages"),
        m("network-info"),
        m("session-events"),
        m("app-sessions"),
        m("app-items"),
        m("app-status"),
        m("hardware-devices"),
        m("permission-status"),
        m("storage-devices"),
      ]),
      m("Web Dashboard", [
        m("Dashboard"),
        m("Executive Dashboard"),
        m("Employee Portal"),
        m("Employees", [m("Detail"), m("Activity")]),
        m("Departments"),
        m("Roles"),
        m("Onboarding"),
        m("Apps"),
        m("Shadow IT"),
        m("Logs", [m("Comprehensive"), m("Graphical"), m("Insights")]),
        m("Charts", [m("Activity"), m("Productivity")]),
        m("Reports"),
        m("AI Summary"),
        m("Attendance"),
        m("Shifts"),
        m("Timesheets"),
        m("Goals"),
        m("KPIs"),
        m("Projects"),
        m("DLP Alerts"),
        m("DLP Rules"),
        m("Audit Log"),
        m("Screenshots"),
        m("Live Stream"),
        m("Settings", [
          m("Billing"),
          m("Compliance"),
          m("Notifications"),
          m("Permissions"),
          m("Security"),
          m("Tracking"),
          m("User Management"),
        ]),
      ]),
    ]),
    imageFolder: "/alpha-ai-tracker",
    order: 4,
  },
  {
    slug: "matric-engineering",
    title: "Matric Engineering",
    category: "Enterprise",
    tags: ["Web App", "Enterprise"],
    status: "Live — 2025–Present",
    company: "ClickMasters Digital Marketing Agency",
    tech: ["Next.js", "Django REST Framework", "PostgreSQL", "TypeScript"],
    shortDescription:
      "Project and site management system for a telecom engineering firm — covering site activities, inventory, task management, and field operations.",
    fullDescription:
      "Project and site management system built for a telecom engineering firm. Covers site activities across multiple work types (dismantling, site relocation, CoW site, DAS iBS site), inventory management, and task management for field operations.",
    moduleTree: m("Matric Engineering", [
      m("Dashboard"),
      m("Project Management", [
        m("All Projects"),
        m("Sites"),
        m("Site Activities", [
          m("Dismantling Only"),
          m("Site Relocation"),
          m("CoW Site"),
          m("DAS iBS Site"),
        ]),
      ]),
      m("Inventory Management", [m("Vendors"), m("Inventory")]),
      m("Task Management", [m("My Tasks")]),
      m("Settings"),
      m("Help & Support"),
    ]),
    imageFolder: "/matrics",
    order: 5,
  },
  {
    slug: "zamr-engineering",
    title: "ZAMR Engineering",
    category: "Marketing",
    tags: ["Marketing"],
    status: "Live — 2025",
    company: "ClickMasters Digital Marketing Agency",
    companyType: "Client: Sydney civil engineering consultancy",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    shortDescription:
      "Pixel-accurate marketing website for a Sydney-based civil engineering consultancy — built to exact Figma specs with responsive design and org chart component.",
    fullDescription:
      "Pixel-accurate marketing website for a Sydney-based civil engineering consultancy. Built to exact Figma specs with responsive design, smooth animations with Framer Motion, and a custom org chart component.",
    moduleTree: m("ZAMR Engineering", [
      m("Marketing Website", [
        m("About"),
        m("Services"),
        m("Projects"),
        m("Why ZAMR Engineering"),
        m("Our Team"),
        m("Trusted & Accredited"),
        m("Engineering For Impact"),
      ]),
    ]),
    imageFolder: "/zamr",
    order: 6,
  },
];

export const projectCategories = [
  "All",
  "Web App",
  "Enterprise",
  "Desktop",
  "Marketing",
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const filterTabs = ["All", "Web App", "Enterprise", "Desktop", "Marketing"];
