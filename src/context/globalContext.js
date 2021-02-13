import React, { createContext, useContext, useState } from "react";
import todoList from "../data/todolist.json";
import moment, { Moment as MomentTypes } from "moment";
/**
 * @description 전역 state context api
 */
const GlobalContext = createContext({
  state: {},
  actions: {},
});

/**
 * @param {*} param0 {children} 하위 리액트 컴포넌트
 * @description 전역 context provider
 */
const GlobalProvider = ({ children }) => {
  const [date, changeDate] = useState(moment());
  const dateFormat = date.format("YYYYMMDD");
  const [todolist, setTodolist] = useState(todoList[dateFormat]);

  const changeTodoList = date => {
    const dateFormat = date.format("YYYYMMDD");
    setTodolist(todoList[dateFormat])
  }

  const value = {
    state: { date, todolist },
    actions: { changeDate, changeTodoList },
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const value = useContext(GlobalContext);
  const { state = {}, actions = {} } = value;

  return [state, actions];
};

export { GlobalContext, GlobalProvider, useGlobalContext };
