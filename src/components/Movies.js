import axios from "axios"
import { useEffect, useState } from "react";
import Pagination from '../components/Pagination';

// const movies =[{
//     id: 100,
//     posterURL: "https://rukminim2.flixcart.com/image/850/1000/kavefm80/poster/z/r/w/medium-batman-wall-poster-for-room-with-gloss-lamination-m136-bd-original-imafscn4vc4uvwhb.jpeg?q=20",
//     title: "The Batman"
// },
// {
//     id: 101,
//     posterURL: "https://m.media-amazon.com/images/M/MV5BNWU5ZDRmMWItZGU0NC00NzZjLTgzYjctY2RlMzI3OTNkN2U5XkEyXkFqcGdeQXVyMTE0MTY2Mzk2._V1_.jpg ",
//     title: "Animal"
// },
// {
//     id: 102,
//     posterURL: "https://rukminim2.flixcart.com/image/850/1000/l3bx5e80/poster/h/w/e/small-kgf-poster-kgf-yash-movie-poster-for-room-kgf-chapter-2-original-imageh8qmrepcvec.jpeg?q=20",
//     title: "KGF"
// }
// ]
//make request to api endpoint
//get the response
// use response to store list of movies in component

function Movies() {
    const [movies, setMovies] = useState([]); // here we use usestae with empty array value
    const [currentPage, setCurrentPage] = useState(1);
    const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem("imdb") || "[]"));
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const getAllMovies = async () => {
        //make api call
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=e730c1e815f9b41fd98df882b4fd7276&page=${currentPage}`);
        const moviesRes = response.data.results;
        setMovies(moviesRes);
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
    const addToWatchList = (movies) => {
        const newWatchList = [...watchList];
        newWatchList.push(movies);
        // add to local storage
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
    //this useEffect will becalled only when currentPage changes
    useEffect( ()=> {
        getAllMovies();
    },[currentPage]);

    const watchListIds = watchList.map((movie)=> movie.id);
   
    return (
        <div>
            <div className="text-2xl mb-8 font-bold text-center mt-4"> Trending Movies</div>
            <div className="flex justify-around flex-wrap">
                { movies.map((movie)=> {
                    return (
                        <div
                        onMouseOver={() => setHoveredMovie(movie.id)}
                        onMouseOut={() => setHoveredMovie(null)}
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`
                        }} key={movie.id} className="overflow-hidden w-[150px] h-[30vh] bg-center bg-cover m-4 md:h-[35vh] md:w-[200px] flex items-end rounded-xl hover:scale-110 relative">
                            <div
                            style={{visibility: movie.id === hoveredMovie ? "visible": "hidden"}} 
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