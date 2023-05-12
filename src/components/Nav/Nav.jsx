import SearchBar from "../SearchBar/SearchBar";
import { Link, NavLink } from "react-router-dom";

const Nav = ({ onSearch }) => {
    return (
        <nav>
            <Link to='/home'>
                <button>Home</button>
            </Link>

            <NavLink to='/about'>
                <button>About</button>
            </NavLink>

            <NavLink to='/favorites'>
                <button>Favorites</button>
            </NavLink>
            <SearchBar onSearch={onSearch} />
        </nav>
    )
}

export default Nav;
