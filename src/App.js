import React from "react";
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container maxWidth="lg">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" exact element={<Auth />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
