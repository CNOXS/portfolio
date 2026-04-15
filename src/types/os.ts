import { IconType } from "react-icons";
import { FaFolderOpen, FaPerson } from "react-icons/fa6";
import { GiLandMine, GiSandSnake } from "react-icons/gi";
import { IoIosSettings, IoMdMail } from "react-icons/io";
import { MdCalculate, MdDescription } from "react-icons/md";

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  icon: IconType;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface AppInfo {
  id: string;
  title: string;
  icon: IconType;
  iconBg: string;
  iconColor: string;
  category: 'portfolio' | 'utility' | 'game';
}

export const APPS: AppInfo[] = [
  { id: 'about', title: 'About Me', icon: FaPerson, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', category: 'portfolio' },
  { id: 'projects', title: 'Projects', icon: FaFolderOpen, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', category: 'portfolio' },
  { id: 'contact', title: 'Contact', icon: IoMdMail, iconBg: 'bg-gray-100', iconColor: 'text-gray-600', category: 'portfolio' },
  { id: 'calculator', title: 'Calculator', icon: MdCalculate, iconBg: 'bg-orange-100', iconColor: 'text-orange-600', category: 'utility' },
  { id: 'notepad', title: 'Notepad', icon: MdDescription, iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600', category: 'utility' },
  { id: 'snake', title: 'Snake', icon: GiSandSnake, iconBg: 'bg-green-100', iconColor: 'text-green-600', category: 'game' },
  { id: 'minesweeper', title: 'Minesweeper', icon: GiLandMine, iconBg: 'bg-red-100', iconColor: 'text-red-600', category: 'game' },
  { id: 'settings', title: 'Settings', icon: IoIosSettings, iconBg: 'bg-gray-100', iconColor: 'text-gray-600', category: 'utility' },
];

export const WALLPAPERS = [
  { id: 'default', name: 'Fluid Abstract', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsHuWu22b-84b8UMMaqd_Of6nxx5qxXt165hpwFzfG22PR3WJfEs5RmPr14X7z7nt8sx1iIjtAs2yheNPbjPkPWKZeFujvkSl6pRhrs1uD8kizIO-oYBqE8hDwgM_PvyuDWnI07Hbo6D-meWP1Z63t4NJTc4vVBf0XRgJwEx__ryIbNXq-OOQBKo9bdspmc7-K6nDi9KelCgklIzrfCZZznDogRKOA_hsepRDZEqrTU-5aLL3LKW5xpCR3x0FOwjlEdtnptaa71tIx' },
  { id: 'gradient', name: 'Blue Gradient', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXFJFcL2FLqIH7JoAoPp_gRP_qDRKJr8pbbusubHkI-k6_SkONX8t4UvaivxzQmg7czD-gU8mLAgghNYCbmke1qFdA1PqBahLIKMJglmdM82in8zQEJONbVY476eOfqc3p0vIT9V65f6cAHsqPJE4jHgd_ATZmG_RsHfaNJK3C8anv8Ge_wz1AHzV3Eph9HkNjynmVDvu8bEhQZyPjSyNPyW3opB_G-u0PN552_9utMl7Nx4ZAMh86A5QIO2zqiHOVooeMzAD2YDe4' },
  { id: 'dark', name: 'Dark Space', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOoq_guLF_k7iU214Za14uad2U7wUjFHJRpuJmFfWtDC9Q-7UKmtl0VvL_DHUaFGkcis49hl5xm3_3m4QHS2BMd--5t1hySXJLk0iQbCjVzKsreUV1U3EDEaOdt7ucUB4XbBlx1WQkq77jtQ3Ln_R-TLSTUNVyIfdTx7h6ILUB4w3FrjKw0D4mtRQcdAJU98o32ajxik4KMtLUC5BODcilDCmwqtCa5I5ugP5rO-hWwwIsv7emXmIoY4fl8JpdJNZ8JmZuTXiA8T0q' },
  { id: 'sunset', name: 'Warm Sunset', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkwyP8onbVPoeigkGsq-yGfFreHYrXvsWoPEkk3NHijc6SQfcJfFlwVwL_mgGqShWvNSIff3Y3Ln9mN_mGdoIYCTdDxZ4jgLQb8WF_YFuGl24LPfC05YYIkX-hJuTToPw_XdT_OXJUgPdFmmhImRagMg5kqyGDpJwBsYBea7axTCCj3cZEwkZLkcMcaV9VCquIMS6OunaTdC-IqQt-XO_DUcHswFdWAfGp5wiENumusG1_KZMlVMXO2SzsFCqsN87cgsOkj7AAL2oo' },
];