import { NavLink } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <NavLink to={'/'}>
                    <span>Marvel</span> information portal
                </NavLink>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink style={({isActive}) => ({color : isActive ? "red" : "black"})} end  to={'/'} href="#">Characters</NavLink></li>
                    /
                    <li><NavLink style={({isActive}) => ({color : isActive ? "red" : "black"})} end  to={'/comics'} href="#">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;