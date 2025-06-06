'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Eğer zaten giriş yapmışsa admin paneline yönlendir
    const adminToken = Cookies.get('adminToken');
    if (adminToken) {
      router.push('/admin');
      router.refresh();
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basit bir doğrulama - gerçek uygulamada bu bilgiler güvenli bir şekilde saklanmalıdır
    if (username === 'admin' && password === 'admin123') {
      // Giriş başarılı - 24 saatlik cookie oluştur
      Cookies.set('adminToken', 'true', { expires: 1 });
      
      // Kısa bir gecikme ekle
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Callback URL varsa oraya, yoksa admin paneline yönlendir
      const callbackUrl = searchParams?.get('callbackUrl');
      router.refresh();
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push('/admin');
      }
      router.refresh();
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Girişi
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Kullanıcı Adı</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Kullanıcı Adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Şifre</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Giriş Yap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 