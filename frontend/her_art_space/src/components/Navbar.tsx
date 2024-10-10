import { useState } from "react";
import { SidebarData } from "./sidebarData";
import "../App.css";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            {/* Title as a non-clickable item */}
            <li className="navbar-title">HerArtSpace</li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="navbar">
          
            
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
