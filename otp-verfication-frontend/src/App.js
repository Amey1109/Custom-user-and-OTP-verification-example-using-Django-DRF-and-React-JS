import { BrowserRouter, Switch, Route } from "react-router-dom";
import CheckOTP from "./components/CheckOTP";
import GetNumber from "./components/GetNumber";
import Registration from "./components/Registration";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={GetNumber} />
          <Route exact path="/CheckOTP" component={CheckOTP} />
          <Route exact path="/Registration" component={Registration} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
