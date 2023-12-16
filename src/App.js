import Banner from "./components/Banner";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WatchList from "./components/WatchList";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <NavBar />
      <Routes>
        <Route
        path="/"
        element= {
          <>
          <Banner />
          <Movies />
          </>
        }>
        </Route>
        <Route
        path="/watchlist"
        element= {
          <>
          <WatchList />
          </>
        }>
        

        </Route>

      </Routes>
    
    </div>
    </BrowserRouter>
  );
}

export default App;
