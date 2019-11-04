import React from "react";
import ReactDOM from "react-dom";

import { useVirtualizedList } from "./useVirtualizedList";

const dataList = [...Array(9999).keys()];

const colors = ["#ff77aa", "#aaff77", "#77aaff", "#ffffff"];

const style = {
  container: {
    position: "relative",
    width: "50vw",
    height: "50vh",
    borderBottom: "none",
    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.46)",
    margin: "0 auto"
  },
  listWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: "auto"
  },
  list: height => ({
    position: "relative",
    height
  }),
  item: (index, height) => ({
    position: "absolute",
    top: height * index,
    left: 0,
    right: 0,
    height,
    backgroundColor: colors[index % colors.length]
  })
};

const App = ({ rowHeight = 50 }) => {
  const [wrapper, isItemVisible] = useVirtualizedList({ rowHeight });
  const { container, listWrapper, list, item } = style;

  return (
    <div style={container}>
      <div style={listWrapper} ref={wrapper}>
        <div style={list(dataList.length * rowHeight)}>
          {dataList.map(
            (listItem, index) =>
              isItemVisible(index) && (
                <div key={index} style={item(index, rowHeight)}>
                  {`Item number: ${listItem}`}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
