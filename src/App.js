import { Routes, Route  } from "react-router-dom";
import './App.css';
import JobPage from "./core/jobpage";
import JobView from "./core/jobview";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<JobPage />} />
        <Route path="/jobview/:jobId" element={<JobView />} />
      </Routes>
    </div>
  );
}

export default App;
