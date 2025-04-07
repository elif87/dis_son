"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Switch } from '@headlessui/react';

interface Script {
  id: string;
  type: string;
  scriptId: string;
  scriptCode: string;
  isActive: boolean;
}

const defaultScriptCodes = {
  'google-analytics': `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=SCRIPT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'SCRIPT_ID');
</script>`,
  'google-tag-manager': `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','SCRIPT_ID');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=SCRIPT_ID"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`,
  'meta-pixel': `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'SCRIPT_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=SCRIPT_ID&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`,
  'custom': ''
};

export default function IstatistiklerPage() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [newScript, setNewScript] = useState<{
    type: string;
    scriptId: string;
    scriptCode: string;
  }>({
    type: '',
    scriptId: '',
    scriptCode: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showScriptCode, setShowScriptCode] = useState(false);

  const scriptTypes = [
    { id: 'google-analytics', name: 'Google Analytics' },
    { id: 'google-tag-manager', name: 'Google Tag Manager' },
    { id: 'meta-pixel', name: 'Meta Pixel' },
    { id: 'custom', name: 'Özel Script' },
  ];

  useEffect(() => {
    fetchScripts();
  }, []);

  useEffect(() => {
    if (newScript.type && newScript.type !== 'custom') {
      let scriptCode = defaultScriptCodes[newScript.type as keyof typeof defaultScriptCodes] || '';
      if (newScript.scriptId) {
        scriptCode = scriptCode.replace(/SCRIPT_ID/g, newScript.scriptId);
      }
      setNewScript(prev => ({ ...prev, scriptCode }));
    }
  }, [newScript.type, newScript.scriptId]);

  const fetchScripts = async () => {
    try {
      const response = await fetch('/api/scripts');
      if (!response.ok) {
        throw new Error('Scriptler yüklenirken bir hata oluştu');
      }
      const data = await response.json();
      setScripts(data.map((script: any) => ({
        ...script,
        scriptCode: script.customScript
      })));
    } catch (error) {
      console.error('Scriptler yüklenirken hata:', error);
      toast.error('Scriptler yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      console.log('Gönderilen veri:', {
        type: newScript.type,
        scriptId: newScript.scriptId,
        scriptCode: newScript.scriptCode,
        isActive: true,
      });

      const response = await fetch('/api/scripts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: newScript.type,
          scriptId: newScript.scriptId,
          scriptCode: newScript.scriptCode,
          isActive: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Hata detayı:', errorData);
        throw new Error('Script eklenirken bir hata oluştu');
      }

      const addedScript = await response.json();
      console.log('Eklenen script:', addedScript);
      
      setScripts([...scripts, {
        ...addedScript,
        scriptCode: addedScript.customScript
      }]);
      setNewScript({ type: '', scriptId: '', scriptCode: '' });
      setShowScriptCode(false);
      toast.success('Script başarıyla eklendi');
    } catch (error) {
      console.error('Script eklenirken detaylı hata:', error);
      toast.error('Script eklenirken bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleScriptStatus = async (scriptId: string) => {
    try {
      const script = scripts.find(s => s.id === scriptId);
      if (!script) return;

      const response = await fetch(`/api/scripts/${scriptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !script.isActive,
        }),
      });

      if (!response.ok) {
        throw new Error('Script durumu güncellenirken bir hata oluştu');
      }

      setScripts(scripts.map(s => 
        s.id === scriptId ? { ...s, isActive: !s.isActive } : s
      ));
      toast.success('Script durumu güncellendi');
    } catch (error) {
      console.error('Script durumu güncellenirken hata:', error);
      toast.error('Script durumu güncellenirken bir hata oluştu');
    }
  };

  const deleteScript = async (scriptId: string) => {
    try {
      const response = await fetch(`/api/scripts/${scriptId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Script silinirken bir hata oluştu');
      }

      setScripts(scripts.filter(s => s.id !== scriptId));
      toast.success('Script başarıyla silindi');
    } catch (error) {
      console.error('Script silinirken hata:', error);
      toast.error('Script silinirken bir hata oluştu');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Script Yönetimi</h1>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Yeni Script Ekle</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="scriptType" className="block text-sm font-medium text-gray-700 mb-1">
                Script Türü
              </label>
              <select
                id="scriptType"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newScript.type}
                onChange={(e) => {
                  setNewScript({ 
                    type: e.target.value, 
                    scriptId: '', 
                    scriptCode: e.target.value === 'custom' ? '' : defaultScriptCodes[e.target.value as keyof typeof defaultScriptCodes] || ''
                  });
                }}
                required
              >
                <option value="">Script türü seçin</option>
                {scriptTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {newScript.type && newScript.type !== 'custom' && (
              <div>
                <label htmlFor="scriptId" className="block text-sm font-medium text-gray-700 mb-1">
                  Script ID
                </label>
                <input
                  type="text"
                  id="scriptId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newScript.scriptId}
                  onChange={(e) => setNewScript({ ...newScript, scriptId: e.target.value })}
                  placeholder={newScript.type === 'google-analytics' ? 'G-XXXXXXXX' : 
                             newScript.type === 'google-tag-manager' ? 'GTM-XXXXXXX' : 
                             'XXXXXXXXXX'}
                  required
                />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="scriptCode" className="block text-sm font-medium text-gray-700">
                  Script Kodu
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setShowScriptCode(!showScriptCode)}
                >
                  {showScriptCode ? 'Kodu Gizle' : 'Kodu Göster'}
                </button>
              </div>
              {showScriptCode && (
                <textarea
                  id="scriptCode"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  value={newScript.scriptCode}
                  onChange={(e) => setNewScript({ ...newScript, scriptCode: e.target.value })}
                  rows={10}
                  placeholder="<script>...</script>"
                  required
                />
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className={`w-full bg-gradient-to-r from-[#234b8a] to-[#3561a8] text-white py-3 px-4 rounded-md hover:from-[#3561a8] hover:to-[#234b8a] transition-all duration-300 font-medium ${
                  isSaving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSaving ? 'Ekleniyor...' : 'Script Ekle'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Mevcut Scriptler</h2>
          <div className="space-y-4">
            {scripts.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Henüz hiç script eklenmemiş</p>
            ) : (
              scripts.map((script) => (
                <div key={script.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {scriptTypes.find(t => t.id === script.type)?.name || 'Özel Script'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {script.type === 'custom' ? 'Özel Script' : `ID: ${script.scriptId}`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Switch
                      checked={script.isActive}
                      onChange={() => toggleScriptStatus(script.id)}
                      className={`${
                        script.isActive ? 'bg-green-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                    >
                      <span
                        className={`${
                          script.isActive ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                    <button
                      type="button"
                      onClick={() => setShowScriptCode(!showScriptCode)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteScript(script.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 