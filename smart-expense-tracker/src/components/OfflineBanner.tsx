import { useEffect, useState } from 'react';

const OfflineBanner = () => {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const ping = async () => {
      try {
        await fetch('http://localhost:8080/api/categories');
        setOffline(false);
      } catch {
        setOffline(true);
      }
    };
    ping(); // only once on mount
  }, []);

  if (!offline) return null;

  return (
    <div style={{
      background: '#ffcc00',
      padding: '10px',
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#000'
    }}>
      ⚠️ You are working offline. Data is stored locally.
    </div>
  );
};

export default OfflineBanner;
