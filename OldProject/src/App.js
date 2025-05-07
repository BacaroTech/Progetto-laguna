import Graph from "./screens/graph/graphScreen";
import Home from "./screens/home/homeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<Home />} />
      <Route path="grafici" element={<Graph />} />
      </Routes>
    </BrowserRouter>
  );
}
