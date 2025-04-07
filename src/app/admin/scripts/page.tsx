"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Script {
  id: string;
  type: string;
  scriptId: string;
  isActive: boolean;
  customScript?: string;
}

export default function ScriptsPage() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const [newScript, setNewScript] = useState({
    type: 'meta-pixel',
    scriptId: '',
    isActive: true,
    customScript: ''
  });

  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    try {
      const response = await fetch('/api/scripts');
      const data = await response.json();
      setScripts(data);
    } catch (error) {
      console.error('Scripts yüklenirken hata:', error);
      toast.error('Scripts yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/scripts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newScript),
      });

      if (!response.ok) throw new Error('Script eklenirken hata oluştu');

      toast.success('Script başarıyla eklendi');
      fetchScripts();
      setNewScript({
        type: 'meta-pixel',
        scriptId: '',
        isActive: true,
        customScript: ''
      });
    } catch (error) {
      console.error('Script eklenirken hata:', error);
      toast.error('Script eklenirken bir hata oluştu');
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/scripts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) throw new Error('Script güncellenirken hata oluştu');

      toast.success('Script durumu güncellendi');
      fetchScripts();
    } catch (error) {
      console.error('Script güncellenirken hata:', error);
      toast.error('Script güncellenirken bir hata oluştu');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu scripti silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/scripts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Script silinirken hata oluştu');

      toast.success('Script başarıyla silindi');
      fetchScripts();
    } catch (error) {
      console.error('Script silinirken hata:', error);
      toast.error('Script silinirken bir hata oluştu');
    }
  };

  if (loading) return <div className="p-4">Yükleniyor...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Scripts Yönetimi</h1>

      {/* Yeni Script Ekleme Formu */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Yeni Script Ekle</h2>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Script Tipi
            </label>
            <select
              value={newScript.type}
              onChange={(e) => setNewScript({ ...newScript, type: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="meta-pixel">Meta Pixel</option>
              <option value="google-tag-manager">Google Tag Manager</option>
              <option value="custom">Özel Script</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Script ID
            </label>
            <input
              type="text"
              value={newScript.scriptId}
              onChange={(e) => setNewScript({ ...newScript, scriptId: e.target.value })}
              placeholder="Meta Pixel ID veya GTM ID"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {newScript.type === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Özel Script
              </label>
              <textarea
                value={newScript.customScript}
                onChange={(e) => setNewScript({ ...newScript, customScript: e.target.value })}
                placeholder="<script>...</script>"
                className="w-full p-2 border rounded h-32"
                required
              />
            </div>
          )}

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newScript.isActive}
                onChange={(e) => setNewScript({ ...newScript, isActive: e.target.checked })}
                className="rounded text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">Aktif</span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Script Ekle
          </button>
        </div>
      </form>

      {/* Mevcut Scriptler Listesi */}
      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold p-4 border-b">Mevcut Scriptler</h2>
        <div className="divide-y">
          {scripts.length === 0 ? (
            <p className="p-4 text-gray-500">Henüz script eklenmemiş.</p>
          ) : (
            scripts.map((script) => (
              <div key={script.id} className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{script.type}</h3>
                  <p className="text-sm text-gray-500">ID: {script.scriptId}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleToggleActive(script.id, script.isActive)}
                    className={`px-3 py-1 rounded text-sm ${
                      script.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {script.isActive ? 'Aktif' : 'Pasif'}
                  </button>
                  <button
                    onClick={() => handleDelete(script.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 