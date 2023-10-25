import { useEffect } from 'react';

export const GoogleTagManager = () => {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'G-XDL9FRE62L');
  }, []);

  return null;
};

export default GoogleTagManager;

