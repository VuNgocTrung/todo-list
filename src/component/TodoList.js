import { useRef, useState } from "react";
import NewTask from "./NewTask";

const TodoList = ({
  listTask,
  handleUpdateForm,
  handleRemove,
  handleRemoveList,
  handleSearchList,
}) => {
  const [index, setIndex] = useState(null);
  const [valueSearch, setValueSearch] = useState("");
  const [checkList, setCheckList] = useState([]);
  const [dataDetail, setDataDetail] = useState(null);
  const ref = useRef(null);

  const handleFilter = (e) => {
    setValueSearch(e.target.value);
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      handleSearchList(e.target.value);
    }, 500);
  };

  const handleDetail = (index) => {
    setIndex(index);
    setDataDetail({ ...listTask[index] });
  };

  const handleCheckList = (e, id) => {
    if (e.target.checked) {
      setCheckList((data) => [...data, id]);
    } else {
      const newData = checkList.filter((item) => item !== id);
      setCheckList(newData);
    }
  };

  return (
    <>
      <div className="pt-20 update-todo-list">
        <div className="title-task">Todo List</div>
        <input
          placeholder="Search..."
          className="p-0 input w-100"
          value={valueSearch}
          onChange={(e) => handleFilter(e)}
        />
        <div className="scroll">
          {listTask &&
            listTask.length > 0 &&
            listTask.map((item, i) => {
              return (
                <div key={item.id} className=" item-main">
                  <div className="d-flex item-todo-list">
                    <div className="d-flex">
                      <input
                        type="checkbox"
                        name={item.id}
                        onChange={(e) => handleCheckList(e, item.id)}
                      />
                      <span>{item.title}</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn-detail"
                        onClick={() => handleDetail(i)}
                      >
                        Detail
                      </button>
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => {
                          handleRemove(item.id);
                          setIndex(null);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div
                    className={index === i ? "d-block box-update" : "d-none"}
                  >
                    <NewTask
                      isUpdate={true}
                      data={dataDetail}
                      handleSubmitForm={(data) => {
                        handleUpdateForm(data);
                        setIndex(null);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          {checkList.length > 0 && (
            <div className="d-flex bulk-action">
              <div>Bulk Action</div>
              <div>
                <button type="button" className="btn-detail">
                  Done
                </button>
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => {
                    handleRemoveList(checkList);
                    setCheckList([]);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoList;
