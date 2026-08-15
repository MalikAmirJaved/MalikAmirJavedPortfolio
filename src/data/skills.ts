import type { IconType } from "react-icons";
import {
  SiDjango,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiPostgresql,
  SiMongodb,
  SiSqlite,
  SiRedis,
  SiNginx,
  SiLinux,
  SiExpress,
  SiGo,
  SiElectron,
  SiDotnet,
  SiSocket,
} from "react-icons/si";
import {
  TbApi,
  TbBrandCSharp,
  TbLanguage,
} from "react-icons/tb";
import { BsChatDots } from "react-icons/bs";

export type SkillGroup = {
  title: string;
  icon: IconType;
  accent: string; // tailwind gradient classes for the icon chip
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend",
    icon: SiDjango,
    accent: "from-emerald-400 to-teal-600",
    skills: [
      "Django REST Framework",
      "Daphne",
      "WebSockets",
      "Redis",
      "Node.js",
      "Express.js",
      "Go (basics)",
    ],
  },
  {
    title: "Frontend",
    icon: SiReact,
    accent: "from-sky-400 to-cyan-600",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "TanStack Query",
      "Shadcn UI",
    ],
  },
  {
    title: "Desktop",
    icon: SiElectron,
    accent: "from-indigo-400 to-violet-600",
    skills: [
      "Electron.js",
      ".NET 10 / Avalonia (C#) — currently learning",
    ],
  },
  {
    title: "Databases",
    icon: SiPostgresql,
    accent: "from-blue-400 to-sky-600",
    skills: ["PostgreSQL", "MongoDB", "SQLite", "Redis"],
  },
  {
    title: "DevOps / Infra",
    icon: SiLinux,
    accent: "from-amber-400 to-orange-600",
    skills: [
      "Linux Server Deployment",
      "Nginx",
      "Environment Configuration",
      "systemd",
    ],
  },
  {
    title: "Languages",
    icon: TbLanguage,
    accent: "from-rose-400 to-pink-600",
    skills: ["Urdu (Native)", "English (Professional)"],
  },
];

export const currentlyBuilding = {
  title: "Currently Building",
  tech: [SiDotnet, SiReact, SiNodedotjs, SiGo],
  description:
    ".NET 10 / Avalonia desktop agent with cross-platform OS monitoring, AT-SPI browser tracking, enterprise policy extension deployment.",
};

// Tech icon lookup used across hero badges + project cards
export const techIcons: Record<string, IconType> = {
  Django: SiDjango,
  "Django REST Framework": SiDjango,
  React: SiReact,
  "React.js": SiReact,
  Next: SiNextdotjs,
  "Next.js": SiNextdotjs,
  Node: SiNodedotjs,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  ".NET": SiDotnet,
  ".NET 10": SiDotnet,
  Go: SiGo,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  "Redux Toolkit": SiRedux,
  Express: SiExpress,
  "Express.js": SiExpress,
  "Socket.IO": BsChatDots,
  WebSockets: SiSocket,
  Redis: SiRedis,
  SQLite: SiSqlite,
  Nginx: SiNginx,
  Linux: SiLinux,
  Daphne: TbApi,
  Avalonia: TbBrandCSharp,
  Electron: SiElectron,
};

export function getTechIcon(name: string): IconType | undefined {
  return techIcons[name] ?? techIcons[name.split(" ")[0]];
}
