"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Sadece development veya production modunda önemli metrikleri yakala
    // metric.name örneğin: 'FCP', 'LCP', 'CLS', 'FID', 'TTFB', 'INP'
    
    // Yalnızca kritik Web Vitals metriklerini konsola (veya analytics'e) yazdır
    if (metric.name === 'LCP' || metric.name === 'CLS' || metric.name === 'INP') {
      const isGood = 
        (metric.name === 'LCP' && metric.value <= 2500) ||
        (metric.name === 'CLS' && metric.value <= 0.1) ||
        (metric.name === 'INP' && metric.value <= 200);

      const color = isGood ? 'color: #2a5c3d; font-weight: bold;' : 'color: #8f171a; font-weight: bold;';
      
      console.log(
        `%c[Web Vitals] ${metric.name}:`, 
        color, 
        `${Math.round(metric.value * 100) / 100} ${metric.name === 'CLS' ? '' : 'ms'}`,
        !isGood ? '(Needs Improvement)' : '(Good)'
      );
    }
  });

  return null;
}
