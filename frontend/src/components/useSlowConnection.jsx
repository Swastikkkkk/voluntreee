// useSlowConnection.js
import { useState, useEffect } from 'react';

export default function useSlowConnection(threshold = 1.5) {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection && connection.downlink < threshold) {
      setIsSlow(true);
    }
  }, []);

  return isSlow;
}
