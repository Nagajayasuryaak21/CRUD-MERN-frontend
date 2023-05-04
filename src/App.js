import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Navigate from "./components/Navigation";
import Update from "./components/Update";
function App() {
  const api = process.env.REACT_APP_API_KEY;
  return (
    <div>
      {/* <Sample/> */}
      <BrowserRouter>
        <Link style={{textDecoration:"none"}} to="/"><Navigate /></Link>
        <Routes>
          <Route path="/" element={<Home api ={api}/>} />
          <Route path="/Home" element={<Home api ={api}/>} />
          <Route path="/Create" element={<Create api ={api}/>} />
          <Route path="/Update/:id" element={<Update api ={api}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
