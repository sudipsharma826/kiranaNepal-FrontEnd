import { useEffect } from 'react';

const AdSpaceContainer = () => {
  const adClient = import.meta.env.VITE_ADSENSE_CLIENT;
  const adSlot = import.meta.env.VITE_ADSENSE_SLOT;

  const tagStyle = {
    background: 'linear-gradient(to right, red, blue)',
    color: 'white',
    ...(document.body.classList.contains('dark')
      ? { background: 'linear-gradient(to right, #444, #888)' }
      : {}),
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = import.meta.env.VITE_ADSENSE_SCRIPT_URL;
    script.setAttribute("crossorigin", "anonymous");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        if (window.adsbygoogle && document.querySelector('.adsbygoogle')) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error('Adsense error:', e);
      }
    }, 800); // Slight delay to ensure visibility

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div className="relative w-full min-h-[90px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg overflow-hidden">
        <p className="text-sm font-semibold absolute top-2 right-2 px-2 py-1 rounded" style={tagStyle}>
          Ad Space
        </p>
        <div className="adsense-container w-full text-center">
        <ins class="adsbygoogle"
     style="display:block"
     data-ad-client={adClient}
     data-ad-slot={adSlot}
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
        </div>
      </div>
    </div>
  );
};

export default AdSpaceContainer;
