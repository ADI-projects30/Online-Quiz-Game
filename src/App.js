import { Container, Box } from "@mui/material";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import OptionsPage from "./pages/OptionsPage";
import QuestionsPage from "./pages/QuestionsPage";
import ScorePage from "./pages/ScorePage";



function App() {
  return (
  <Router>
    <Container>
      <Box textAlign="center">
      <Routes>
        <Route path="/" element={<OptionsPage />}>
        </Route>
        <Route path ="/questions" element={<QuestionsPage />}>
        </Route>
        <Route path ="/yourscore" element={<ScorePage />}>
        </Route>
    </Routes>
      </Box>
    </Container>

  </Router>
  );
}

export default App;
