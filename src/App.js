import Banner from "./components/Banner";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WatchList from "./components/WatchList";


/* steps to add react Router
1.  npm install react-router-dom localforage match-sorter sort-by
2.  import { BrowserRouter, Route, Routes } from "react-router-dom" in App.js
3.  wrap everything inside BrowserRouter, then with Routes and Route
4.  under Route add element={} and add path
5. then wherever w want to use just add like <Link to='/'> Movies</Link>

*/

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
