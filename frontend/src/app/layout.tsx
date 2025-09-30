import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Xero MCP Wireframe Chatbot',
  description: 'Wireframe-style chatbot interface for Xero MCP integration',
  keywords: ['xero', 'mcp', 'chatbot', 'wireframe', 'accounting'],
  authors: [{ name: 'Xero MCP Chatbot Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        <div className="min-h-full">
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">
                    Xero MCP Chatbot
                  </h1>
                  <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-md">
                    Wireframe Mode
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    Constitutional Compliance: ✅
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-12">
                <div className="text-sm text-gray-500">
                  Xero MCP Wireframe Chatbot v1.0.0
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span>MCP-First Integration ✅</span>
                  <span>JSON-RPC 2.0 ✅</span>
                  <span>Wireframe UI ✅</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
