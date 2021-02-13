import backArrowIcon from "../../reactSvg/back-arrow.svg";
import MonthCalendar from "../MonthCalendar/MonthCalendar";
import { Input, TimePicker, Switch as AntdSwitch } from "antd";
import { useGlobalContext } from "../../context/globalContext";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const TIME_FORMAT = "HH:mm";
const HOURS_TIME_FORMAT = "h:mm a";

const TodoEditor = (props) => {
  const [inputValue, setInputValue] = useState({
    suggestions: ["Read boox", "Design", "Learn"],
    note: "",
    time: moment().format("YYYY/MM/DD HH:mm"),
    alarm: false,
    alarmTime: moment().format("YYYY/MM/DD HH:mm"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((ps) => ({ ...ps, [name]: value }));
  };

  const handleTimerChange = (e) => {
    console.log(e);
    setInputValue((ps) => ({ ...ps, alarmTime: e.format("YYYY/MM/DD HH:mm") }));
  };

  const handleHoursTimerChange = (timeMoment, timeString) => {
    setInputValue((ps) => ({
      ...ps,
      time: moment(timeMoment, "YYYY/MM/DD HH:mm"),
    }));
  };

  const handleSwitchChange = (e) => {
    setInputValue((ps) => ({ ...ps, alarm: e }));
  };

  const onClickTaskAddBtn = async () => {
    window.history.back();
  };

  const AntdSwitchMemo = useMemo(
    () => (
      <AntdSwitch
        name="alarm"
        onChange={handleSwitchChange}
        checked={inputValue.alarm}
        className="right-switch-btn"
      />
    ),
    [inputValue.alarm]
  );

  return (
    <>
      <div className="top-empty-container"></div>
      <header className="header">
        <div className="nav-menu">
          <Link to={"/"}>
            <img
              className="search-icon"
              src={backArrowIcon}
              alt="back arrow icon"
            />
          </Link>
          <h2 className="menu-title">New task</h2>
          <div></div>
        </div>
      </header>
      <main>
        <section>
          <MonthCalendar />
        </section>
        <section className="todo-area-section">
          <div className="todo-info-container">
            <div className="title-container">
              <div className="tag-color-bar"></div>
              <h2 className="title">What do you need to do?</h2>
            </div>
            <div className="suggestion-container">
              <h3 className="subtitle">Suggestion</h3>
              <ul>
                <li>Read book</li>
                <li>Design</li>
                <li>Learn</li>
              </ul>
            </div>
            <div className="sub-container mt25">
              <h3 className="subtitle">Notes</h3>
              <span>
                <input
                  className="antd-input"
                  name="note"
                  onChange={handleChange}
                  value={inputValue.note}
                />
              </span>
            </div>
            <div className="sub-container mt25">
              <h3 className="subtitle">Time</h3>
              <span>
                <TimePicker
                  use12Hours
                  suffixIcon={<></>}
                  className="antd-input"
                  format="h:mm A"
                  onChange={handleHoursTimerChange}
                  value={moment(inputValue.time, "h:mm A")}
                />
              </span>
            </div>
            <div className="sub-container mt25">
              <h3 className="subtitle">Alarm</h3>
              <span>
                <TimePicker
                  suffixIcon={<></>}
                  className="antd-input"
                  format={TIME_FORMAT}
                  name="alarmTime"
                  onChange={handleTimerChange}
                  value={moment(inputValue.alarmTime, TIME_FORMAT)}
                />
              </span>
              {AntdSwitchMemo}
            </div>
          </div>
          <div className="btm-todo-button-area">
            <button onClick={onClickTaskAddBtn} className="task-button">
              ADD YOUR TASK
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default TodoEditor;
