import { Link } from 'react-router-dom';
import logo from '../../src/movieLogo.jpg';
function NavBar() {
    return (
        <div className='flex border space-x-8 items-center'>
            {/* image */}
            <img src={logo} className="w-[50px]" alt='movieLogo'/>
            {/* Movies */}
            <Link to='/' className='text-blue-400' > Movies</Link>
            {/* WatchList */}
            <Link to='/watchlist' className='text-blue-400' > WatchList</Link>
        </div>
    )
}
export default NavBar;

