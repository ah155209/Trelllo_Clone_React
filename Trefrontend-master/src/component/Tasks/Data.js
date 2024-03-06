import React, { useState, useEffect} from "react";
import Cardcolumn from "./Column";
import { useNavigate } from "react-router-dom";
import a from "axios";
import "./cards.scss";
import { DragDropContext } from "react-beautiful-dnd";

export default function Data() {
  const navigate = useNavigate();

  const host = "http://localhost:5000/api/tasks";
  const [data, setData] = useState({
    Task: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "Todo",
        tasksIds: [],
      },
      "column-2": {
        id: "column-2",
        title: "Doing",
        tasksIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "Done",
        tasksIds: [],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  });
  const [loading, setLoading] = useState(true);
  const jwtToken = localStorage.getItem("token");

  const assignNameToApiData = (data) => {
    data.forEach((item, index) => {
      item.row = `${index}`;
    });
  };

  useEffect(()=>{
    if(!jwtToken){
      navigate('/Login')
    }
  },[])
    
 
  const getalldata = async () => {
   
    try {

      let task = await a.get(`${host}/alltasks`, {
        headers: {
          authorization: jwtToken,
        },
      });

      let updatedData = task.data;
      assignNameToApiData(updatedData);

      let lists = updatedData;
      let todo = lists
        .filter((task) => task.status === "Todo")
        .map((task) => task.row);
      let done = lists
        .filter((task) => task.status === "Done")
        .map((task) => task.row);
      let doing = lists
        .filter((task) => task.status === "Doing")
        .map((task) => task.row);

      const newcol1 = { ...data.columns["column-1"], tasksIds: todo };
      const newcol2 = { ...data.columns["column-2"], tasksIds: doing };
      const newcol3 = { ...data.columns["column-3"], tasksIds: done };

      const transformedData = updatedData.reduce((result, item, index) => {
        const key = `${index}`;
        result[key] = item;
        return result;
      }, {});

      const newData = {
        ...data,
        Task: transformedData,
        columns: {
          ["column-1"]: newcol1,
          ["column-2"]: newcol2,
          ["column-3"]: newcol3,
        },
      };

      setData(newData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleondragend = async (result) => {
    const { draggableId, source, destination } = result;

    // Check if the task was dropped outside a droppable area
    if (!destination) return;

    const sourceColumn = data.columns[source.droppableId];
    const destinationColumn = data.columns[destination.droppableId];

    // If the task is dropped within the same column
    if (sourceColumn === destinationColumn) {
      const newTaskIds = [...sourceColumn.tasksIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        tasksIds: newTaskIds,
      };

      // Update the state with the new data
      setData((prevData) => ({
        ...prevData,
        columns: {
          ...prevData.columns,
          [newColumn.id]: newColumn,
        },
      }));

      try {
        // Update the task position in the backend
        await a.put(
          `${host}/updatetask/${data.Task[draggableId]._id}`,
          {
            _id: data.Task[draggableId]._id,
            position: destination.index,
          },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
      } catch (error) {
        console.error("Error updating task position:", error);
      }
    } else {
      // Moving from one column to another
      const sourceTaskIds = [...sourceColumn.tasksIds];
      sourceTaskIds.splice(source.index, 1);

      const destinationTaskIds = [...destinationColumn.tasksIds];
      destinationTaskIds.splice(destination.index, 0, draggableId);

      const newSourceColumn = {
        ...sourceColumn,
        tasksIds: sourceTaskIds,
      };

      const newDestinationColumn = {
        ...destinationColumn,
        tasksIds: destinationTaskIds,
      };

      // Update the state with the new data
      setData((prevData) => ({
        ...prevData,
        columns: {
          ...prevData.columns,
          [newSourceColumn.id]: newSourceColumn,
          [newDestinationColumn.id]: newDestinationColumn,
        },
      }));

      try {
        // Update the task status and position in the backend
        await a.put(
          `${host}/updatetask/${data.Task[draggableId]._id}`,
          {
            _id: data.Task[draggableId]._id,
            status: destinationColumn.title,
            position: destination.index,
          },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
      } catch (error) {
        console.error("Error updating task status and position:", error);
      }
    }
  };

  useEffect(() => {
    getalldata();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container">
      <DragDropContext onDragEnd={handleondragend}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.tasksIds.map((taskID) => data.Task[taskID]);
          return (
            <Cardcolumn
              onclickaddlist={getalldata}
              tasks={tasks}
              key={column.id}
              column={column}
              data={data}
              setData={setData}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
}
