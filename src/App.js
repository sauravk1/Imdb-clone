import Banner from "./components/Banner";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route
        path="/"
        element= {
          <>
          <NavBar />
          <Banner />
          <Movies />
          </>
        }>
        </Route>
        <Route
        path="/watchlist"
        element= {
          <>
          <NavBar />
          <p>Watchlist</p>
          </>
        }>
        

        </Route>

      </Routes>
    
    </div>
    </BrowserRouter>
  );
}

export default App;
