import { useEffect, useState } from "react";
import "./App.css";
import NewTask from "./component/NewTask";
import TodoList from "./component/TodoList";

function App() {
  const [listTask, setListTask] = useState([]);

  const handleSubmitForm = (data) => {
    sortbyDate([
      ...listTask,
      { ...data, id: Math.random() + Math.random() + Math.random() },
    ]);
    setDataLocal([
      ...listTask,
      { ...data, id: Math.random() + Math.random() + Math.random() },
    ]);
    alert("add success!");
  };

  const handleUpdateForm = (data) => {
    const newData = [...listTask];
    const indexItem = listTask.findIndex((item) => item.id === data.id);
    newData[indexItem] = data;
    sortbyDate(newData);
    setDataLocal(newData);
    alert("update success!");
  };

  const handleRemove = (id) => {
    const newDataRemoved = listTask.filter((item) => item.id !== id);
    setListTask(newDataRemoved);
    setDataLocal(newDataRemoved);
    alert("remove success!");
  };

  const handleRemoveList = (listId) => {
    const newData = listTask.filter((item) => !listId.includes(item.id));
    setListTask(newData);
    setDataLocal(newData);
    alert("remove success!");
  };
  const handleSearchList = (e) => {
    if (e) {
      const newData = listTask.filter((item) => item.title.includes(e));
      setListTask(newData);
    } else {
      if (localStorage.getItem("items")) {
        const items = JSON.parse(localStorage.getItem("items"));
        setListTask(items);
      }
    }
  };

  const setDataLocal = (data) => {
    localStorage.setItem("items", JSON.stringify(data));
  };

  const sortbyDate = (data) => {
    data.sort((a, b) => {
      const dateA = a.date;
      const dateB = b.date;
      if (dateA < dateB) {
        return 1;
      }
      if (dateA > dateB) {
        return -1;
      }

      return 0;
    });

    setListTask(data);
  };

  useEffect(() => {
    if (localStorage.getItem("items")) {
      const items = JSON.parse(localStorage.getItem("items"));
      sortbyDate(items);
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="container-app">
          <div className="new-task-main">
            <NewTask isUpdate={false} handleSubmitForm={handleSubmitForm} />
          </div>
          <br />
          <div className="todo-list-main">
            <TodoList
              handleUpdateForm={handleUpdateForm}
              listTask={listTask}
              handleSearchList={handleSearchList}
              handleRemove={handleRemove}
              handleRemoveList={handleRemoveList}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
