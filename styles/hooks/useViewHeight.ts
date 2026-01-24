import { useCallback, useState } from "react";

export const useViewHeight = () => {
  const [height, setHeight] = useState(0);

  const onLayout = useCallback((event) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  }, []);

  return { height, onLayout };
};
