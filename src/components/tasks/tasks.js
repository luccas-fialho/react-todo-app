import "./tasks.css";
import iconSun from "../../assets/images/icon-sun.svg";
import iconMoon from "../../assets/images/icon-moon.svg";
import iconCross from "../../assets/images/icon-cross.svg";
import iconChecked from "../../assets/images/icon-check.svg";
import { useState } from "react";

function Tasks(props) {
  const storageTasks = JSON.parse(localStorage.getItem("task"));
  let [tasks, setTasks] = useState(storageTasks || []);
  let [tasksAux, setTasksAux] = useState(storageTasks || []);
  let [newTask, setNewTask] = useState("");
  let [tasksLeft, setTasksLeft] = useState(
    JSON.parse(localStorage.getItem("tasksLeft")) || 0
  );
  let [isActive, setActive] = useState([true, false, false]);

  const createTask = () => {
    if (newTask === "") return;
    setTasksLeft(tasksLeft + 1);
    localStorage.setItem("tasksLeft", tasksLeft + 1);
    const task = {
      id: tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1,
      name: newTask,
      isDone: false,
    };

    setNewTask("");
    setTasks([...tasks, task]);
    setTasksAux([...tasks, task]);
    localStorage.setItem("task", JSON.stringify([...tasksAux, task]));
  };

  const handleChange = (task) => {
    setNewTask(task.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") createTask();
  };

  const deleteTask = (taskToDelete) => {
    if (taskToDelete.isDone) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
      setTasksAux(tasksAux.filter((task) => task.id !== taskToDelete.id));
    } else {
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
      setTasksAux(tasksAux.filter((task) => task.id !== taskToDelete.id));
      setTasksLeft(tasksLeft - 1);
      localStorage.setItem("tasksLeft", tasksLeft - 1);
    }
    localStorage.setItem(
      "task",
      JSON.stringify(tasks.filter((task) => task.id !== taskToDelete.id))
    );
  };

  const handleCheckboxChange = (id, isDone) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          setTasksLeft(!isDone ? tasksLeft - 1 : tasksLeft + 1);
          localStorage.setItem(
            "tasksLeft",
            !isDone ? tasksLeft - 1 : tasksLeft + 1
          );
          return { ...task, isDone: !isDone };
        } else {
          return task;
        }
      })
    );
    setTasksAux(
      tasksAux.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: !isDone };
        } else {
          return task;
        }
      })
    );
    localStorage.setItem(
      "task",
      JSON.stringify(
        tasksAux.map((task) => {
          if (task.id === id) {
            return { ...task, isDone: !isDone };
          } else {
            return task;
          }
        })
      )
    );
  };

  const getAllTasks = () => {
    setTasks([...tasksAux]);
    setActive([true, false, false]);
  };

  const getActiveTasks = () => {
    const activeTasks = tasksAux.filter((task) => task.isDone === false);
    if (activeTasks.length === 0) return;
    setTasks(activeTasks);
    setActive([false, true, false]);
  };

  const getCompletedTasks = () => {
    const completedTasks = tasksAux.filter((task) => task.isDone === true);
    if (completedTasks.length === 0) return;
    setTasks(completedTasks);
    setActive([false, false, true]);
  };

  const clearCompletedTasks = () => {
    const activeTasks = tasksAux.filter((task) => task.isDone === false);
    if (activeTasks.length === 0) return;
    setTasks(activeTasks);
    setTasksAux(activeTasks);
    localStorage.setItem("task", JSON.stringify(activeTasks));
  };

  return (
    <div className="tasks__container">
      <div className="title__container">
        <h1>TODO</h1>
        <button onClick={() => props.setIsDarkMode(!props.isDarkMode)}>
          <img src={props.isDarkMode ? iconSun : iconMoon} alt="sun icon" />
        </button>
      </div>
      <div
        style={{ backgroundColor: props.isDarkMode ? "#21252B" : "#FFFFFF" }}
        className="create-task"
      >
        <button className="create-task__checkbox"></button>
        <input
          style={{ color: props.isDarkMode ? "white" : "black" }}
          type="text"
          placeholder=" Create a new todo..."
          className="create-task__input"
          value={newTask}
          onChange={(event) => handleChange(event)}
          onKeyDown={(event) => handleKeyPressed(event)}
        />
      </div>

      {tasks.length > 0 && (
        <div className="tasks">
          {tasks.map((task, key) => {
            return (
              <div
                style={{
                  backgroundColor: props.isDarkMode ? "#21252B" : "#FFFFFF",
                }}
                key={key}
                className="tasks__task"
              >
                <button
                  style={
                    task.isDone
                      ? {
                          backgroundImage:
                            "linear-gradient(hsl(192, 100%, 67%),hsl(280, 87%, 65%))",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundColor:
                            "linear-gradient(hsl(192, 100%, 67%),hsl(280, 87%, 65%))",
                          border: "none",
                        }
                      : {
                          backgroundColor: "transparent",
                        }
                  }
                  className="tasks__task_checkbox"
                  onClick={() => handleCheckboxChange(task.id, task.isDone)}
                >
                  {task.isDone && <img src={iconChecked} alt="check" />}
                </button>
                <p
                  className="tasks__task_name"
                  style={
                    props.isDarkMode
                      ? {
                          color: task.isDone ? "grey" : "white",
                          textDecoration: task.isDone ? "line-through" : "none",
                        }
                      : {
                          color: task.isDone ? "grey" : "black",
                          textDecoration: task.isDone ? "line-through" : "none",
                        }
                  }
                >
                  {task.name}
                </p>
                <button
                  className="tasks__task_btn"
                  onClick={() => deleteTask(task)}
                >
                  <img src={iconCross} alt=""></img>
                </button>
              </div>
            );
          })}

          <div
            style={{
              backgroundColor: props.isDarkMode ? "#21252B" : "#FFFFFF",
            }}
            className="items-clear"
          >
            <p className="items-clear__items-left">{tasksLeft} items left</p>
            <div
              style={{
                backgroundColor: props.isDarkMode ? "#21252B" : "#FFFFFF",
              }}
              className="filter-tasks__desktop"
            >
              <button
                style={
                  isActive[0]
                    ? { color: "hsl(220, 98%, 61%)" }
                    : { color: "#61607C" }
                }
                onClick={getAllTasks}
              >
                All
              </button>
              <button
                style={
                  isActive[1]
                    ? { color: "hsl(220, 98%, 61%)" }
                    : { color: "#61607C" }
                }
                onClick={getActiveTasks}
              >
                Active
              </button>
              <button
                style={
                  isActive[2]
                    ? { color: "hsl(220, 98%, 61%)" }
                    : { color: "#61607C" }
                }
                onClick={getCompletedTasks}
              >
                Completed
              </button>
            </div>
            <button className="items-clear__btn" onClick={clearCompletedTasks}>
              Clear Completed
            </button>
          </div>
          <div
            className="filter-tasks__mb"
            style={{
              backgroundColor: props.isDarkMode ? "#21252B" : "#FFFFFF",
            }}
          >
            <button
              style={
                isActive[0]
                  ? { color: "hsl(220, 98%, 61%)" }
                  : { color: "#61607C" }
              }
              onClick={getAllTasks}
            >
              All
            </button>
            <button
              style={
                isActive[1]
                  ? { color: "hsl(220, 98%, 61%)" }
                  : { color: "#61607C" }
              }
              onClick={getActiveTasks}
            >
              Active
            </button>
            <button
              style={
                isActive[2]
                  ? { color: "hsl(220, 98%, 61%)" }
                  : { color: "#61607C" }
              }
              onClick={getCompletedTasks}
            >
              Completed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
