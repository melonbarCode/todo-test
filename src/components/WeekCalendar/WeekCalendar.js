import React from "react";
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import moment, { Moment as MomentTypes } from "moment";

import "./WeekCalendar.scss";
import { useGlobalContext } from "../../context/globalContext";

function WeekCalendar(props) {
  const [state, actions] = useGlobalContext();

  const { date } = state;
  const { changeDate } = actions;

  return (
    <div className="week-calendar">
      <Body date={date} changeDate={changeDate} />
    </div>
  );
}

function Body(props) {
  console.log("props", props);
  const { date = moment() } = props;

  function generate() {
    const startWeek = date.clone().startOf("month").week();
    const endWeek =
      date.clone().endOf("month").week() === 1
        ? 53
        : date.clone().endOf("month").week();
    let calendar = [];
    // for (let week = startWeek; week <= endWeek; week++) {
    calendar.push(
      <div className="row">
        {Array(7)
          .fill(0)
          .map((n, i) => {
            let current = date
              .clone()
              .startOf("week")
              .add(n + i, "day");
            let isSelected =
              date.format("YYYYMMDD") === current.format("YYYYMMDD")
                ? "selected"
                : "";
            let isToday =
              moment().format("YYYYMMDD") === current.format("YYYYMMDD")
                ? "today"
                : "";
            let isGrayed =
              current.format("MM") === date.format("MM") ? "" : "grayed";
            return (
              <div
                className={`box`}
                key={i}
                onClick={() => props.changeDate(current)}
              >
                <span className={`text ${isSelected} ${isGrayed} ${isToday}`}>
                  {current.format("D")}
                </span>
              </div>
            );
          })}
      </div>
    );
    // }
    return calendar;
  }
  return (
    <div className="Body">
      <div className="row">
        <div className="box">
          <span className="text">SUN</span>
        </div>
        <div className="box">
          <span className="text">MON</span>
        </div>
        <div className="box">
          <span className="text">TUE</span>
        </div>
        <div className="box">
          <span className="text">WED</span>
        </div>
        <div className="box">
          <span className="text">THU</span>
        </div>
        <div className="box">
          <span className="text">FRI</span>
        </div>
        <div className="box">
          <span className="text">SAT</span>
        </div>
      </div>
      {generate()}
    </div>
  );
}

export default WeekCalendar;
