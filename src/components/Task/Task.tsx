import React from "react";
import { Check, Trash } from "phosphor-react";
import styles from "./Task.module.scss";

interface TaskProps {
  isDone: boolean;
  contentTask: string;
  onCheck: () => void;
  onDelete: () => void;
}

export const Task = ({ contentTask, isDone, onCheck, onDelete }: TaskProps) => {
  const styleISDone = isDone ? styles.done : "";
  return (
    <>
      <li className={styles.task}>
        <label>
          <input type="checkbox" checked={isDone} onChange={onCheck} />
          <span>
            <Check />
          </span>
        </label>

        <p className={styleISDone}>{contentTask}</p>
        <button onClick={onDelete}>
          <Trash />
        </button>
      </li>
    </>
  );
};
