export function reportWebVitals({ id, name, label, value }: {
  id: string;
  name: string;
  label: string;
  value: number;
}) {
  // Filter out non-web-vitals metrics
  if (label !== 'web-vital') return;

  // Send to analytics
  const metric = {
    name,
    id,
    value,
    timestamp: Date.now(),
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Core Web Vital:', metric);
  }

  // Send to analytics service
  try {
    fetch('/api/analytics/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric),
    });
  } catch (error) {
    console.error('Failed to report web vital:', error);
  }
}