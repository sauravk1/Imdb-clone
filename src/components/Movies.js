import axios from "axios"
import { useEffect, useState } from "react";

const movies =[{
    id: 100,
    posterURL: "https://rukminim2.flixcart.com/image/850/1000/kavefm80/poster/z/r/w/medium-batman-wall-poster-for-room-with-gloss-lamination-m136-bd-original-imafscn4vc4uvwhb.jpeg?q=20",
    title: "The Batman"
},
{
    id: 101,
    posterURL: "https://m.media-amazon.com/images/M/MV5BNWU5ZDRmMWItZGU0NC00NzZjLTgzYjctY2RlMzI3OTNkN2U5XkEyXkFqcGdeQXVyMTE0MTY2Mzk2._V1_.jpg ",
    title: "Animal"
},
{
    id: 102,
    posterURL: "https://rukminim2.flixcart.com/image/850/1000/l3bx5e80/poster/h/w/e/small-kgf-poster-kgf-yash-movie-poster-for-room-kgf-chapter-2-original-imageh8qmrepcvec.jpeg?q=20",
    title: "KGF"
}
]
//make request to api endpoint
//get the response
// use response to store list of movies in component

function Movies() {
    const [movies, setMovies] = useState([]); // here we use usestae with empty array value
    const getAllMovies = async () => {
        //make api call
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=e730c1e815f9b41fd98df882b4fd7276`);
        const moviesRes = response.data.results;
        setMovies(moviesRes);
        console.log(moviesRes);
    }
    useEffect( ()=> {
        getAllMovies();
    },[])
   
    return (
        <div>
            <div className="text-2xl mb-8 font-bold text-center"> Trending Movies</div>
            <div className="flex flex-wrap">
                { movies.map((movie)=> {
                    return (
                        <div style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`
                        }} key={movie.id} className="w-[250px] h-[30vh] bg-center bg-cover m-4 md:h-[35vh] md:w-[250px] flex items-end rounded-xl ">
                            <div className="text-white font-bold text-center w-full bg-gray-900 bg-opacity-60">
                                {movie.title}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Movies;