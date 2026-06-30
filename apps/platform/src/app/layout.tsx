import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { IconSearch } from "@/components/icons";
import "./globals.css";

export const metadata: Metadata = {
  title: "NUCLEO AI — Platform",
  description: "Sistema Operativo AI per PMI italiane",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body>
        <div className="app">
          <Sidebar />
          <div className="main">
            <header className="topbar">
              <div className="row" style={{ gap: 10 }}>
                <span className="crumb">NUCLEO AI</span>
                <span className="arrow">/</span>
                <strong>Workspace</strong>
              </div>
              <div className="row" style={{ gap: 14 }}>
                <div className="ws-switch">
                  <IconSearch style={{ width: 16, height: 16 }} />
                  <span className="muted">Cerca…</span>
                </div>
                <div className="ws-switch">Studio Rossi SRL ▾</div>
              </div>
            </header>
            <main className="content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
