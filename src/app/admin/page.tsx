"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Settings } from 'lucide-react';
import SafeDiv from '@/components/SafeDiv';
import AdminSettings from '@/components/AdminSettings';

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoading, signOut, error } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (isLoading) {
    return (
      <SafeDiv className="min-h-screen bg-gray-50">
        <SafeDiv className="h-16 bg-white shadow-sm animate-pulse" />
        <SafeDiv className="container mx-auto px-4 py-8">
          <SafeDiv className="animate-pulse space-y-6">
            <SafeDiv className="h-8 bg-gray-200 rounded w-1/4" />
            <SafeDiv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SafeDiv key={i} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                  <SafeDiv className="h-4 bg-gray-200 rounded w-3/4" />
                  <SafeDiv className="h-4 bg-gray-200 rounded w-1/2" />
                  <SafeDiv className="h-4 bg-gray-200 rounded w-2/3" />
                </SafeDiv>
              ))}
            </SafeDiv>
          </SafeDiv>
        </SafeDiv>
      </SafeDiv>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SafeDiv className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <SafeDiv className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SafeDiv className="flex justify-between items-center h-16">
            <SafeDiv className="flex items-center">
              <Settings className="h-6 w-6 text-emerald-600 mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">
                Painel Administrativo
              </h1>
            </SafeDiv>
            <SafeDiv className="flex items-center gap-4">
              <SafeDiv className="flex items-center">
                <SafeDiv className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-emerald-600">
                    {user.email?.[0].toUpperCase()}
                  </span>
                </SafeDiv>
                <span className="ml-2 text-sm text-gray-600 hidden sm:block">
                  {user.email}
                </span>
              </SafeDiv>
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
                title="Sair"
              >
                <LogOut size={20} />
              </button>
            </SafeDiv>
          </SafeDiv>
        </SafeDiv>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <SafeDiv className="mb-6">
            <SafeDiv className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
              {error}
            </SafeDiv>
          </SafeDiv>
        )}

        <SafeDiv className="bg-white rounded-lg shadow-sm">
          <AdminSettings />
        </SafeDiv>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <SafeDiv className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SafeDiv className="py-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} SiriaExpress. Todos os direitos reservados.
          </SafeDiv>
        </SafeDiv>
      </footer>
    </SafeDiv>
  );
} 