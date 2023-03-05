import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";

const NewTask = ({ data, handleSubmitForm, isUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("normal");
  const [date, setDate] = useState("");
  const [min, setMin] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const date = new Date();
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const year = date.getFullYear();
    const dateDefault = year + "-" + month + "-" + day;
    !data && setDate(dateDefault);
    setMin(dateDefault);
  }, []);

  const priorityList = [
    {
      value: "low",
      name: "Low",
    },
    {
      value: "normal",
      name: "Normal ",
    },
    {
      value: "high",
      name: "High",
    },
  ];

  useEffect(() => {
    if (data) {
      setTitle(data?.title);
      setDescription(data?.description);
      setId(data?.id);
      setDate(data?.date);
      setSelectedPriority(data?.selectedPriority);
      setValue("title", data?.title, {
        shouldValidate: true,
      });
    }
  }, [data]);

  const schemaResolver = yupResolver(
    yup.object().shape({
      title: yup.string().required("This field is required."),
      description: yup.string(),
      date: yup.string(),
      selectedPriority: yup.string(),
    })
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: schemaResolver,
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    handleSubmitForm({
      title,
      description,
      date,
      selectedPriority,
      id,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!isUpdate && <div className="title-task">New Task</div>}
      <div>
        <input
          {...register("title")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={isUpdate ? 'Update task' : "Add new task..."}
          className="w-100 p-0 input mg-12"
        />
        <div className="text-danger">{errors.title?.message}</div>
      </div>
      <div>
        <div>Description</div>
        <textarea
          {...register("description")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-100 p-0 mg-12"
        />
      </div>
      <div className="d-flex todo-date">
        <div>
          <div>Due Date</div>
          <input
            {...register("date")}
            type="date"
            value={date}
            min={min}
            className="input"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <div>Priority</div>
          <select
            {...register("selectedPriority")}
            value={selectedPriority}
            className="input"
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            {priorityList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="btn-save" onClick={handleSubmit}>
        {isUpdate ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default NewTask;
