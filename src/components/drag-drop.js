import React, { useState, useCallback, useRef } from "react";
import { Table } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import SetTimes from "./setTime";


const type = "DragableBodyRow";

const DragableBodyRow = ({
  index,
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
        moveRow(item.index, index);
      },
    }),
    [index]
  );
  const [, drag] = useDrag(
    () => ({
      type,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index]
  );
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ""}`}
      style={{ cursor: "move", ...style }}
      {...restProps}
    ></tr>
  );
};

const columns = [
  {
    title: "movie's name",
    dataIndex: "movie",
    key: "movie",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
];

const DragAndDrop = () => {
  const [data, setData] = useState([
    {
      key: "1",
      movie: "God father",
      duration: 2,
      time: 3,
    },
    {
      key: "2",
      movie: "animation",
      duration: 1,
      time: 4,
    },
    {
      key: "3",
      movie: "lion",
      duration: 2,
      time: 5,
    },
  ]);
  
  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [data]
  );

  return (<div className="container mt-5">
    <DndProvider backend={HTML5Backend}>
        <Table columns={columns} dataSource={data} components={components} onRow = {(record,index)=>({
            index,moveRow
        })} />
    </DndProvider>
  </div>);
};

export default DragAndDrop;
