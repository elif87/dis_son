declare global {
  interface Window {
    gtag: (command: string, action: string, params: any) => void;
  }
}

export const sendGAEvent = (action: string, params: { event_category: string; event_label: string }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
}; 