import "./styles/App.scss";
import "../node_modules/antd/dist/antd.compact.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useGlobalContext } from "./context/globalContext";
import TodoSchedule from "./components/TodoSchedule/TodoSchedule";

import TodoEditor from "./components/TodoEditor";

function App() {
  const [state, actions] = useGlobalContext();

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={`/`} exact component={TodoSchedule} />
          <Route path={`/todo2`} exact component={TodoEditor} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
