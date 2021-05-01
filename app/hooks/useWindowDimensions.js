import { useState, useEffect } from 'react';

const isBrowser = typeof window !== `undefined`;

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (isBrowser) {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
