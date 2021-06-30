import { useState, useEffect  } from "react";

import {Dimensions} from "../types/interfaces";

const useWindowDimensions = (): Dimensions => {
  const [windowDimensions, setWindowDimensions] = useState<Dimensions>({
    height: 0,
    width: 0,
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
