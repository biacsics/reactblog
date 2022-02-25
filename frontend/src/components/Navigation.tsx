import React from "react";

import { Link, useHistory } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

function Navigation() {
  const history = useHistory();

  function goToCreatePage() {
    history.push("/create");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box clone flexGrow={1}>
          <Typography variant="h5">
            <Box clone color="white">
              <Link to="/">Blog</Link>
            </Box>
          </Typography>
        </Box>
        <IconButton edge="start" color="inherit" onClick={goToCreatePage}>
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
