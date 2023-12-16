import { useState } from "react";

function WatchList() {

    const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem("imdb") || "[]"));
    const [selectedGenre, setSelectedGenre] = useState(null);
    console.log(selectedGenre);
    // const mockWatcList =[
    //     {
    //         "adult": false,
    //         "backdrop_path": "/r9oTasGQofvkQY5vlUXglneF64Z.jpg",
    //         "id": 1029575,
    //         "title": "The Family Plan",
    //         "original_language": "en",
    //         "original_title": "The Family Plan",
    //         "overview": "Dan Morgan is many things: a devoted husband, a loving father, a celebrated car salesman. He's also a former assassin. And when his past catches up to his present, he's forced to take his unsuspecting family on a road trip unlike any other.",
    //         "poster_path": "/jLLtx3nTRSLGPAKl4RoIv1FbEBr.jpg",
    //         "media_type": "movie",
    //         "genre_ids": [
    //             28,
    //             35
    //         ],
    //         "popularity": 83.703,
    //         "release_date": "2023-12-14",
    //         "video": false,
    //         "vote_average": 5.9,
    //         "vote_count": 9
    //     }
    // ]
    let genreIds = {
        
                28: "Action",
                12: "Adventure",
                16: "Animation",
                35: "Comedy",
                80: "Crime",
                99: "Documentary",
                18: "Drama",
                10751: "Family",
                14: "Fantasy",
                36: "History",
                27: "Horror",
                10402: "Music",
                9648: "Mystery",
                10749: "Romance",
                878: "Science Fiction",
                10770: "TV Movie",
                53: "Thriller",
                10752: "War",
                37: "Western"
              }
    const genreNamesSet=new Set( watchList.map((watchListItem)=> genreIds[watchListItem.genre_ids[0]]));
    console.log({genreNamesSet});
 
    return (
        <>
        <div className="mt-6 flex space-x-2 justify-center">
           {Array.from(genreNamesSet).map((name)=> (
            <button 
            onClick={()=> {
                setSelectedGenre(name)
            }}
            key={name}
            className= {
                selectedGenre ===name ?
                "m-2 text-lg bg-blue-400 p-1 text-white rounded-xl font-bold"
                : "m-2 text-lg bg-gray-400 hover:bg-blue-400 p-1 text-white rounded-xl font-bold"}> 
            {name}
            </button>
           ))}
        
        </div>
        <div className="rounded-lg  border border-gray-200 m-5 shadow-md">
            <table className=" border-collapse w-full bg-white text-sm  text-gray-500">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="border border-slate-300">Name</th>
                        <th className="border border-slate-300">Image</th>
                        <th className="border border-slate-300">Ratings</th>
                        <th className="border border-slate-300">Popularity</th>
                        <th className="border border-slate-300">Genre</th>
                    </tr>
                </thead>
                <tbody className="border text-center">
                    { watchList.map((watchList)=> (
                        <tr key={watchList.id}>
                        <td className="border border-slate-300">{watchList.original_title}</td>
                        <td className="border border-slate-300">
                            <div className="w-[10rem] h-[10rem] bg-cover justify-center"
                            style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${watchList.poster_path})`}}>

                            </div>
                        </td>
                        <td className="border border-slate-300">{watchList.vote_average}</td>
                        <td className="border border-slate-300">{watchList.popularity}</td>
                        <td className="border border-slate-300">{watchList.genre_ids.map((id)=> genreIds[id]).join(", ")}</td>
                        <td className="border border-slate-300">
                            <button className="text-red-600">Delete</button>
                        </td>
                        </tr>
                        
                    ))}
                        
                </tbody>
            </table>
        </div>
        </>
    )
}
export default WatchList;