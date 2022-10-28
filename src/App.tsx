import React, { ChangeEvent, FormEvent, useState } from "react";
import { Header } from "./components/Header/Header";

import { ClipboardText, Plus } from "phosphor-react";
import { Task } from "./components/Task/Task";
import "./styles/global.scss";
import styles from "./App.module.scss";

interface Task {
  id: number;
  content: string;
  done: boolean;
}
const App = () => {
  const [task, setTask] = useState("");
  const [itemTask, setItemTask] = useState<Task[]>(() => {
    const localTasks = localStorage.getItem("@afroTodo:tasks") || "";
    return JSON.parse(localTasks) || [];
  });

  const countTasksDone = itemTask.reduce((acc: number, item: any) => {
    return item.done ? (acc += 1) : acc;
  }, 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputTask = e.currentTarget.value;
    setTask(inputTask);
  };
  const handleTask = (e: FormEvent) => {
    e.preventDefault();
    if (task === "") {
      alert("por favor preencha com uma tarefa");
    } else {
      const newTask = {
        id: Date.now(),
        content: task,
        done: false,
      };
      const listTasks = [...itemTask, newTask];
      localStorage.setItem("@afroTodo:tasks", JSON.stringify(listTasks));
      setItemTask(listTasks);
      setTask("");
    }
  };

  const handleToggleTask = (id: number) => {
    const updateTasks = itemTask.map((item) => {
      return item.id === id ? { ...item, done: !item.done } : item;
    });
    localStorage.setItem("@afroTodo:tasks", JSON.stringify(updateTasks));
    setItemTask(updateTasks);
  };
  const handleDeleteTask = (id: number) => {
    const taskFiltered = itemTask.filter((item) => {
      return item.id !== id;
    });
    localStorage.setItem("@afroTodo:tasks", JSON.stringify(taskFiltered));
    setItemTask(taskFiltered);
  };

  return (
    <>
      <Header />
      <main className={styles.container}>
        <form className={styles.addTask} onSubmit={handleTask}>
          <input
            onChange={handleChange}
            value={task}
            placeholder="digite uma tarefa"
          />
          <button>
            <Plus />
          </button>
        </form>
        {itemTask.length ? (
          <>
            <h3 className={styles.status}>
              Tarefas Concluídas
              <span>
                {countTasksDone} de {itemTask.length}
              </span>
            </h3>

            <ul className={styles.taskList}>
              {itemTask.map((item, index) => (
                <Task
                  key={index}
                  contentTask={item.content}
                  isDone={item.done}
                  onCheck={() => handleToggleTask(item.id)}
                  onDelete={() => handleDeleteTask(item.id)}
                />
              ))}
            </ul>
          </>
        ) : (
          <div className={styles.empty}>
            <ClipboardText />
            <p>você não tem nenhuma tarefa no momento.</p>
            <span>Adicione novas tarefas para que eles sejam mostrada.</span>
          </div>
        )}
      </main>
    </>
  );
};

export default App;
