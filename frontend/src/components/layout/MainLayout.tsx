"use client";
import React from 'react';
import Link from 'next/link';

export type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">Xero MCP Wireframe</div>
          <nav className="flex items-center gap-4">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-6">{children}</main>
      <footer className="border-t text-center text-sm text-gray-500 py-3">v1.0.0</footer>
    </div>
  );
};

export default MainLayout;
