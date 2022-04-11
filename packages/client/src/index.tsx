import createTheme from "@material-ui/core/styles/createTheme";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store } from "./state/store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#17B978",
    },
    secondary: {
      main: "#FACF5A",
    },
    action: {
      active: "#8BDCBC",
      hoverOpacity: 0.3,
    },
  },
  typography: {
    allVariants: {
      color: "#071A52",
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        color: "#071A52",
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
