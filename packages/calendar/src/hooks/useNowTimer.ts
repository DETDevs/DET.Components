import { useEffect, useState } from 'react';

/** Vuelve a renderizar el componente cada minuto.  */
export const useNowTimer = () => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);
};
