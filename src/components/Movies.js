import axios from "axios"
import { useEffect, useState } from "react";
import Pagination from '../components/Pagination';

//make request to api endpoint
//get the response
// use response to store list of movies in component

function Movies() {
    const [movies, setMovies] = useState([]); // here we use usestae with empty array value
    const [currentPage, setCurrentPage] = useState(1);
    const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem("imdb") || "[]"));
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const [loading, setLoading] = useState(false);

    //from tmdb , get the api-key
    //then in the url pass the api-key like ?api_key= .....
    const getAllMovies = async () => {
        //make api call
        setLoading(true);
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=e730c1e815f9b41fd98df882b4fd7276&page=${currentPage}`);
        const moviesRes = response.data.results;
        setMovies(moviesRes);
        setLoading(false);
        console.log(moviesRes);
    }
    const decreasePageNo = () => {
        console.log("decrease");
        if(currentPage >1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const increasePageNo = () => {
        console.log("increase");
        setCurrentPage(currentPage + 1);
    }
    const resetPageNo = () => {
        console.log("increase");
        setCurrentPage(1);
    }
      //this useEffect will becalled only when currentPage changes
      useEffect(() => {
        getAllMovies()
      }, [ currentPage ])
      // here we passed currentPage so that whenever currentPage changes the api call will be made
    const addToWatchList = (movies) => {
        const newWatchList = [...watchList];
        newWatchList.push(movies);
        // add to local storage
        //in local storage we can only store string values so we need to convert object to string using JSON.stringify
        localStorage.setItem("imdb",JSON.stringify(newWatchList)); 
        setWatchList(newWatchList);
    }
    const removeFromWatchList = (movies) => {
        const newWatchList = watchList.filter((movie)=> {
            return movie.id !== movies.id
        });
        localStorage.setItem("imdb", JSON.stringify(newWatchList));
        setWatchList(newWatchList);
    }
  
    
    const watchListIds = watchList.map((movie)=> movie.id);
   
    return (
        <div>
            <div className="text-2xl mb-8 font-bold text-center mt-4"> Trending Movies</div>
            {/* <div>
                <button>Hindi</button>
                <button>English</button>
            </div> */}
            <div className="flex justify-around flex-wrap">
               
                { loading ? (
                <button type="button" class="bg-indigo-500 ..." disabled>
                <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                  
                </svg>
                Processing...
              </button> ) : 
                 movies.map((movie)=> {
                    return (
                        <div
                        //hover effect on movie to show + icon only when hovered
                        onMouseOver={() => setHoveredMovie(movie.id)}
                        onMouseOut={() => setHoveredMovie(null)}
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`
                        }} key={movie.id} className="overflow-hidden w-[150px] h-[30vh] bg-center bg-cover m-4 md:h-[35vh] md:w-[200px] flex items-end rounded-xl hover:scale-110 relative">
                            {/* //check if movie is in watchlist
                            //if yes, show remove button
                            //else show add button */}
                            <div
                            style={{visibility: movie.id === hoveredMovie ? "visible": "hidden"}} //show + icon only when hovered
                            className="text-2xl p-2 bg-gray-900 text-white absolute left-2 top-2 bg-opacity-90">
                            {
                                watchListIds.includes(movie.id) ? (
                                    <div onClick={()=> removeFromWatchList(movie)} >
                                        <div> - </div>
                                    </div>
                                ) :
                                (
                                    <div onClick={()=> addToWatchList(movie)} >
                                        <div> + </div>
                                    </div>
                                    
                                )
                            }
                            </div>
                            
                            <div className="text-white font-bold text-center w-full bg-gray-900 bg-opacity-60">
                                {movie.title}
                            </div>
                        </div>
                    )
                })} 
            </div>
            <Pagination page={currentPage} decreasePageNo ={decreasePageNo} increasePageNo ={increasePageNo} resetPageNo= {resetPageNo}/>
        </div>
    )
}
export default Movies;