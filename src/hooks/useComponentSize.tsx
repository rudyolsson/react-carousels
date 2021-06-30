import {
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";

import {Dimensions} from "../types/interfaces";

const getSize: (el: Element | null) => Dimensions = (el) => {
  if (!el) {
    return {
      width: 0,
      height: 0,
    };
  }

  const boundingRect = el.getBoundingClientRect();

  return {
    width: boundingRect.width,
    height: boundingRect.height,
  };
};

const useComponentSize = (
  ref: MutableRefObject<Element | null>,
  defaultDimensions: Dimensions = { width: 0, height: 0 }
) => {
  const [size, setSize] = useState(defaultDimensions);

  const handleComponentSize = useCallback(() => {
    setSize(getSize(ref.current));
  }, [ref]);

  useLayoutEffect(() => {
    handleComponentSize();

    window.addEventListener("resize", handleComponentSize);

    return () => window.removeEventListener("resize", handleComponentSize);
  }, [handleComponentSize]);

  return size;
};

export default useComponentSize;
