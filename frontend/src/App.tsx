import React from "react";

import { ThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
import Router from "./router/Router";

const theme = createMuiTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
