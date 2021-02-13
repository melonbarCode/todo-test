import MenuIcon from "../../reactSvg/MenuIcon";
import SearchIcon from "../../reactSvg/search-icon.svg";
import PlusIcon from "../../reactSvg/plus-icon.svg";
import WeekCalendar from "../WeekCalendar";
import { useGlobalContext } from "../../context/globalContext";
import moment from "moment";
import { Link } from "react-router-dom";
const TodoSchedule = (props) => {
  const [state, actions] = useGlobalContext();

  const { todolist = [], date } = state;

  return (
    <>
      <div className="top-empty-container"></div>
      <header className="header">
        <div className="nav-menu">
          <MenuIcon />
          <h2 className="menu-title">Febrary ▼</h2>
          <img className="search-icon" src={SearchIcon} alt="search icon" />
        </div>
      </header>
      <main>
        <section>
          <WeekCalendar />
        </section>
        <section className="item-list-container">
          <ul>
            {todolist &&
              todolist.map((todo, i) => {
                const {
                  status,
                  title,
                  note,
                  alarm,
                  alarmTime,
                  time,
                  suggestions,
                } = todo;
                return (
                  <li className="item-card" key={title + time}>
                    <div className="circle-icon-wrapper">
                      <div className={`circle-icon ${status}`}></div>
                    </div>
                    <div>
                      <h3 className="title">{title}</h3>
                      <h4 className="subtitle">
                        {moment(time, "YYYY/MM/DD HH:mm").format("YYYY/MM/DD")}{" "}
                        {note}
                      </h4>
                    </div>
                    <div className={`status-bar ${status}`}></div>
                  </li>
                );
              })}
            <div className="fixed-container">
              <Link to="todo2">
                <button>
                  <img src={PlusIcon}></img>
                </button>
              </Link>
            </div>
          </ul>
        </section>
      </main>
    </>
  );
};

export default TodoSchedule;
