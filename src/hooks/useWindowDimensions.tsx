import { useState, useEffect  } from "react";

export interface WindowDimensions {
  height: number | undefined;
  width: number | undefined;
}

const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    height: undefined,
    width: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      const {
        innerHeight: height,
        innerWidth: width,
      } = window;

      setWindowDimensions({
        height,
        width,
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;
