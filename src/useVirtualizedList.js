import { useState, useEffect, useRef } from "react";

export const useVirtualizedList = ({
  overscanRowCount = 5,
  rowHeight = 30
}) => {
  const wrapper = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleWrapperHeight, setVisibleWrapperHeight] = useState(0);

  const isItemVisible = index => {
    const elementPos = index * rowHeight;

    const topOvercount =
      elementPos > scrollPosition - overscanRowCount * rowHeight;
    const botOvercount =
      elementPos + rowHeight <
      scrollPosition + visibleWrapperHeight + overscanRowCount * rowHeight;

    return topOvercount && botOvercount;
  };

  const getWrapper = () => wrapper.current;

  useEffect(() => {
    getWrapper().addEventListener(
      "scroll",
      e => setScrollPosition(e.target.scrollTop),
      true
    );

    const visibleHeight = parseFloat(
      window.getComputedStyle(getWrapper(), null).getPropertyValue("height")
    );

    setVisibleWrapperHeight(visibleHeight);
  }, []);

  return [wrapper, isItemVisible];
};