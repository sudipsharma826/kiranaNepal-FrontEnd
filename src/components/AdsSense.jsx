import { useEffect } from 'react';

const AdSpaceContainer = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = import.meta.env.VITE_ADSENSE_SCRIPT_URL;
    script.onload = () => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const adClient = import.meta.env.VITE_ADSENSE_CLIENT;
  const adSlot = import.meta.env.VITE_ADSENSE_SLOT;
  const adFormat = "auto";
  const fullWidthResponsive = true;
  const adStyle = { display: 'block' };

  const tagStyle = {
    background: 'linear-gradient(to right, red, blue)',
    color: 'white',
    ...(document.body.classList.contains('dark')
      ? { background: 'linear-gradient(to right, #444, #888)' }
      : {}),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div className="relative w-full h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg overflow-hidden">
        <p className="text-sm font-semibold absolute top-2 right-2 px-2 py-1 rounded" style={tagStyle}>
          Ad Space
        </p>
        <div className="adsense-container" style={{ textAlign: 'center', ...adStyle }}>
          <ins
            className="adsbygoogle"
            style={{ ...adStyle }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
          ></ins>
        </div>
      </div>
    </div>
  );
};

export default AdSpaceContainer;
