"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  IconBrain,
  IconCalendar,
  IconChat,
  IconHome,
  IconPlug,
  IconUsers,
  IconZap,
  NucleoMark,
} from "./icons";

type NavItem = { href: string; label: string; icon: ReactNode };

const operativo: NavItem[] = [
  { href: "/", label: "Dashboard", icon: <IconHome /> },
  { href: "/cervello", label: "Cervello Documentale", icon: <IconBrain /> },
  { href: "/workflow", label: "Motore Workflow", icon: <IconZap /> },
  { href: "/appuntamenti", label: "Appuntamenti AI", icon: <IconCalendar /> },
  { href: "/chatbot", label: "Chatbot", icon: <IconChat /> },
];
const clienti: NavItem[] = [
  { href: "/portale", label: "Portale B2B", icon: <IconUsers /> },
  { href: "/integrazioni", label: "Integrazioni", icon: <IconPlug /> },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export const Sidebar = () => {
  const pathname = usePathname();
  const renderItem = (item: NavItem) => (
    <Link
      key={item.href}
      href={item.href}
      className={`nav-item${isActive(pathname, item.href) ? " active" : ""}`}
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  );

  return (
    <aside className="sidebar">
      <div className="brand">
        <NucleoMark className="brand-mark" />
        <div>
          <div className="brand-name">NUCLEO</div>
          <div className="brand-sub">AI Operating System</div>
        </div>
      </div>

      <nav className="nav">
        <div className="nav-section">Operativo</div>
        {operativo.map(renderItem)}
        <div className="nav-section">Clienti</div>
        {clienti.map(renderItem)}
      </nav>

      <div className="sidebar-foot">
        <div className="avatar">FM</div>
        <div>
          <div style={{ color: "#fff", fontWeight: 600 }}>Filippo M.</div>
          <div className="brand-sub" style={{ letterSpacing: "0.02em" }}>
            Edia Group
          </div>
        </div>
      </div>
    </aside>
  );
};
