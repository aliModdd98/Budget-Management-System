import "./App.css";
import Navigation from "./router/Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeStore } from "./theme";
import { Provider } from "react-redux";
import { store } from "./store/store";
function App() {
  return (
    <Provider store={store}>
      {" "}
      <ThemeStore>
        <Router>
          <Navigation />
        </Router>
      </ThemeStore>
    </Provider>
  );
}

export default App;
