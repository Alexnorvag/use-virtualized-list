import React from "react";
import ReactDOM from "react-dom";

import { useVirtualizedList } from "./useVirtualizedList";

const App = () => {
  const [wrapper, isItemVisible] = useVirtualizedList({});

  return (
    <div className={"parent-wrapper"} style={{ height: "10000px" }}>
      <div ref={wrapper}>
        {[...Array(1000).keys()].map(
          (item, index) =>
            isItemVisible(index) && (
              <div key={index} className="item">
                {`Item number: ${item}`}
              </div>
            )
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
