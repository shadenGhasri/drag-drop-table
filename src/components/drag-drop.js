import React, { useState, useCallback, useRef } from "react";
import { Table } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

const type = "dragableBodyRow";

const DragableBodyRow = ({
  indext,
  moveRow,
  className,
  style,
  ...restProps
}) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop(
    () => ({
      accept: type,
      collect: (monitor) => {
        const { index: dragIndex } = monitor.getItem() || {};
        if (dragIndex === index) {
          return {};
        }
        return {
          isOver: monitor.isOver(),
          dropClassName:
            dragIndex < index ? "drop-over-downward" : "drop-over-upward",
        };
      },
      drop: (item) => {
        moveRow(item.indext, index);
      },
    }),
    [index]
  );
};

const DragAndDrop = ()=>{
    return(
        <div></div>
    )
}
export default DragAndDrop
