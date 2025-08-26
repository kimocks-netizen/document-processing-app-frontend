'use client';

import { useEffect, useState } from 'react';
import { isLocalhost, isProductionDomain, getEnvironment, getCurrentApiUrl } from '@/lib/env';

export const EnvironmentBanner = () => {
  const [environment, setEnvironment] = useState<string>('unknown');
  const [isVisible, setIsVisible] = useState(false);
  const [apiUrl, setApiUrl] = useState<string>('');

  useEffect(() => {
    const env = getEnvironment();
    const currentApiUrl = getCurrentApiUrl();
    
    setEnvironment(env);
    setApiUrl(currentApiUrl);
    
    // Only show banner in development or when explicitly needed
    setIsVisible(env === 'development' || isLocalhost());
  }, []);

  if (!isVisible) return null;

  const getBannerColor = () => {
    if (isLocalhost()) return 'bg-blue-600';
    if (isProductionDomain()) return 'bg-green-600';
    return 'bg-yellow-600';
  };

  const getEnvironmentText = () => {
    if (isLocalhost()) return 'Local Development';
    if (isProductionDomain()) return 'Production';
    return environment === 'development' ? 'Development' : 'Production';
  };

  const getApiDisplay = () => {
    if (apiUrl.includes('localhost')) return 'localhost:3001';
    if (apiUrl.includes('fly.dev')) return 'Fly.io Backend';
    return apiUrl;
  };

  return (
    <div className={`${getBannerColor()} text-white text-center py-2 px-4 text-sm font-medium`}>
      🚀 {getEnvironmentText()} Environment - API: {getApiDisplay()}
    </div>
  );
};
