import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "profile",
    path: "/profile",
    icon: <IoIcons.IoIosPerson />,
    cName: "nav-text",
  },
  {
    title: "Resources",
    path: "/resources",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  
  {
    title: "Messages",
    path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },

  {
    title: "Logout",
    path: "/logout",
    icon: <FaIcons.FaSignOutAlt />,
    cName: "nav-text",
  },
  
];
