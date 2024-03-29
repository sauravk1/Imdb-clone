import { useState } from "react";

function WatchList() {

    const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem("imdb") || "[]"));
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchStr, setSearchStr] = useState("");
    const [sortstate, setSortstate] = useState(0);
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
    //[ [1,2], [3,4], [6,7]]
    //use reduce func then => [1,2,3,4,6,7]
    const genreNamesSet=new Set( watchList.map((watchListItem)=> watchListItem.genre_ids)
        .reduce((res,arr)=> res.concat(arr),[]).map((id)=>genreIds[id]));
    // const hgt = (watchList.map((item)=> item.genre_ids));  [ [1,2], [3,4], [6,7]]
     //console.log(genreNamesSet);
    // const merged = new Set(hgt.reduce((res,arr)=>res.concat(arr),[]).map((id)=> genreIds[id]))  [1,2,3,4,6,7]
    // console.log(merged);
    const filteredWatchList = watchList.filter((item)=> {
        const allGenreIds = item.genre_ids;
        const genreNames = allGenreIds.map((id)=> genreIds[id]);
        // find out the selected genre in the genreNames if null then return true to show all the genre
        return  selectedGenre ? genreNames.includes(selectedGenre): true;
    })

    // search in watchlist implementation
    const filteredWatchListAndSearched = filteredWatchList.filter((item)=> {
        return item.original_title.toLowerCase().includes(searchStr);
    })
    let filteredWatchlistSearchedAndSorted = filteredWatchListAndSearched;
    // 1 means ascending and -1 means descending
    if(sortstate === 1) {
        filteredWatchlistSearchedAndSorted = filteredWatchlistSearchedAndSorted.sort((objA, objB)=> {
            return objB.vote_average - objA.vote_average;
        })
    }

    if(sortstate === -1) {
        filteredWatchlistSearchedAndSorted = filteredWatchlistSearchedAndSorted.sort((objA, objB)=> {
            return objA.vote_average - objB.vote_average;
        })
    }
    const deleteFromWatchList = (movies) => {
        const newWatchList = watchList.filter((movie)=> {
            return movie.id !== movies.id
        });
        localStorage.setItem("imdb", JSON.stringify(newWatchList));
        setWatchList(newWatchList);
    }
    // useEffect(()=>{
    //     deleteFromWatchList();
    // },[removeMovie])
 
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
           <button 
            onClick={()=> {
                setSelectedGenre(null)
            }}
            key="reset"
            className= "m-2 text-lg bg-red-400 hover:bg-blue-400 p-1 text-white rounded-xl font-bold"> 
            Reset
            </button>
        
        </div>
        {/* search div */}
        <div className="text-center">
                <input
                type="text"
                className="border bg-gray-200 border-4 text-center p-1 m-2"
                placeholder="search for Movies"
                value={searchStr}
                onChange={(e)=>setSearchStr(e.target.value)}
                />
        </div>

        {/* //table */}
        <div className="rounded-lg  border border-gray-200 m-5 shadow-md">
            <table className=" border-collapse w-full bg-white text-sm  text-gray-500">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="border border-slate-300">Name</th>
                        <th className="border border-slate-300">Image</th>
                        <th className="border border-slate-300" >
                            <div className="flex space-x-3 ">
                            <img alt="sort-asc"
                            src="https://cdn-icons-png.flaticon.com/512/61/61148.png"
                            className="mr-1 ml-6 w-[1rem] h-[1.2rem]"
                            onClick={()=> {
                                setSortstate(-1)
                            }}
                            />
                            Ratings
                            <img alt="sort-desc"
                            src="https://icon-library.com/images/dropdown-arrow-icon/dropdown-arrow-icon-11.jpg"
                            className="mr-1 w-[1rem] h-[1.2rem]"
                            onClick={()=> {
                                setSortstate(1)
                            }}
                            />
                            </div>      
                            </th>
                        <th className="border border-slate-300">Popularity</th>
                        <th className="border border-slate-300">Genre</th>
                    </tr>
                </thead>
                <tbody className="border text-center">
                    { filteredWatchlistSearchedAndSorted.map((watchList)=> (
                        <tr key={watchList.id}>
                        <td className="border border-slate-300">{watchList.original_title}</td>
                        <td className="border border-slate-300">
                            <div className="w-full h-[10rem] bg-cover justify-center"
                            style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${watchList.poster_path})`}}>

                            </div>
                        </td>
                        <td className="border border-slate-300">{watchList.vote_average}</td>
                        <td className="border border-slate-300">{watchList.popularity}</td>
                        {/* genre ids to genre names from ["action", "romance"] to "action, romance" using join method */}
                        <td className="border border-slate-300">{watchList.genre_ids.map((id)=> genreIds[id]).join(", ")}</td>
                        <td className="border border-slate-300">
                            <button className="text-red-600"
                            onClick={()=>deleteFromWatchList(watchList)}
                            >Delete</button>
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