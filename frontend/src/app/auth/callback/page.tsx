import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export const metadata = { title: 'OAuth Callback' };

export default async function OAuthCallbackPage({ searchParams }: { searchParams: Promise<{ code?: string; state?: string; error?: string }> }) {
  const sp = (await searchParams) || {};
  const { code, state, error } = sp;
  return (
    <MainLayout>
      <h1 className="text-xl font-semibold mb-4">OAuth Callback</h1>
      {error ? (
        <div className="text-red-600">Error: {error}</div>
      ) : code ? (
        <div data-testid="oauth-success">Received authorization code. State: {state || '(none)'}.</div>
      ) : (
        <div>No authorization response detected.</div>
      )}
    </MainLayout>
  );
}
