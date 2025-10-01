'use client';

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { MessageCircle, Settings, BarChart3, Users, FileText, DollarSign } from 'lucide-react';

interface WireframeTile {
  id: string;
  title: string;
  type: 'chat' | 'invoices' | 'contacts' | 'accounts' | 'transactions' | 'reports';
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  status: 'active' | 'pending' | 'disabled';
}

const wireframeTiles: WireframeTile[] = [
  {
    id: 'chat',
    title: 'Chat Interface',
    type: 'chat',
    icon: MessageCircle,
    description: 'Natural language interactions with Xero via MCP',
    status: 'active',
  },
  {
    id: 'invoices',
    title: 'Invoices',
    type: 'invoices',
    icon: FileText,
    description: 'CRUD operations on Xero invoices',
    status: 'pending',
  },
  {
    id: 'contacts',
    title: 'Contacts',
    type: 'contacts',
    icon: Users,
    description: 'Manage Xero contacts and customers',
    status: 'pending',
  },
  {
    id: 'accounts',
    title: 'Accounts',
    type: 'accounts',
    icon: BarChart3,
    description: 'Chart of accounts management',
    status: 'pending',
  },
  {
    id: 'transactions',
    title: 'Transactions',
    type: 'transactions',
    icon: DollarSign,
    description: 'Financial transaction processing',
    status: 'pending',
  },
  {
    id: 'reports',
    title: 'Reports',
    type: 'reports',
    icon: BarChart3,
    description: 'Financial reports and analytics',
    status: 'disabled',
  },
];

export default function HomePage() {
  const [selectedTile, setSelectedTile] = useState<string | null>(null);

  const handleTileClick = (tileId: string) => {
    setSelectedTile(tileId);
    // TODO: Navigate to specific module (Task T040+)
    console.log(`Navigate to ${tileId} module`);
  };

  const getTileStatusColor = (status: WireframeTile['status']) => {
    switch (status) {
      case 'active':
        return 'border-green-400 bg-green-50';
      case 'pending':
        return 'border-yellow-400 bg-yellow-50';
      case 'disabled':
        return 'border-gray-300 bg-gray-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getTileStatusBadge = (status: WireframeTile['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'disabled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Xero MCP Dashboard
        </h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <Settings className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">
                Constitutional Compliance Status
              </h3>
              <div className="mt-1 flex flex-wrap gap-4 text-xs">
                <span className="text-blue-700">✅ MCP-First Integration</span>
                <span className="text-blue-700">✅ JSON-RPC 2.0 Protocol</span>
                <span className="text-blue-700">✅ Wireframe UI Design</span>
                <span className="text-blue-700">✅ Modular Architecture</span>
                <span className="text-blue-700">✅ Extensibility Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MCP Modules Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wireframeTiles.map((tile, index) => {
          const IconComponent = tile.icon;
          return (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all
                ${getTileStatusColor(tile.status)}
                ${selectedTile === tile.id ? 'ring-2 ring-blue-500' : ''}
                ${tile.status === 'disabled' ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={() => tile.status !== 'disabled' && handleTileClick(tile.id)}
            >
              {/* Status Badge */}
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getTileStatusBadge(
                    tile.status
                  )}`}
                >
                  {tile.status}
                </span>
              </div>

              {/* Icon */}
              <div className="mb-4">
                <IconComponent className="h-8 w-8 text-gray-600" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {tile.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{tile.description}</p>

              {/* Wireframe Elements */}
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              </div>

              {/* Action Indicator */}
              {tile.status === 'active' && (
                <div className="absolute bottom-2 right-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Implementation Status
        </h3>
        <div className="mb-4">
          <Link className="text-blue-600 underline mr-4" href="/dashboard">Go to Dashboard</Link>
          <Link className="text-blue-600 underline" href="/auth/callback?code=dummy&state=abc">Simulate OAuth Callback</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">✅ Completed:</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Backend FastAPI setup</li>
              <li>• Frontend NextJS with TypeScript</li>
              <li>• Wireframe UI components</li>
              <li>• Constitutional compliance framework</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">🚧 In Progress:</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• MCP Server integration</li>
              <li>• Xero OAuth2 authentication</li>
              <li>• Chat interface implementation</li>
              <li>• CRUD operations modules</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </MainLayout>
  );
}