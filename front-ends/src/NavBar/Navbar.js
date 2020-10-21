import React ,{useState} from 'react';
import {MenuItems} from './MenuItems';
import './NavBar.css';


const Navbbar = () => {
  const [clicked , setClicked ] = useState(false);

  const handleClick =() => {
    setClicked(!clicked);
  }

    return (
      <nav className="NavBarItems navbar-expand-md">
        <h2 className="navbar-logo">TodoList </h2>
        <div className="menu-icon" onClick={handleClick}>
          <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={clicked ? "nav-menu active" : 'nav-menu'}>
          {MenuItems.map((item,index)=>{
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
}

export default Navbbar