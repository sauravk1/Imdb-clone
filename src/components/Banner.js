function Banner() {
    return(
        <div className="flex items-end h-[20vh] md:h-[60vh] bg-center bg-cover bg-no-repeat" style={{
            backgroundImage: "url(https://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg)"  //banner image url
        }}>
            {/* overlay text */}
            <div className="w-full text-xl md:text-3xl bg-gray-900 text-white text-center">John Wick</div>
        </div>
    )
}
export default Banner;