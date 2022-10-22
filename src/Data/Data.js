import { AiFillHome } from "react-icons/ai";
import {
  BsPeopleFill,
  BsChatLeftDotsFill,
  BsFillInboxesFill,
} from "react-icons/bs";
import {
  MdOutlineAccountTree,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { FaClipboardList, FaSitemap } from "react-icons/fa";
export const SidebarDashboardData = [
  {
    icon: AiFillHome,
    heading: "Dashboard",
    location: "/",
  },
  {
    icon: MdOutlineAccountTree,
    heading: "Category",
    location: "/category",
    iconClose: MdOutlineKeyboardArrowDown,
    iconOpened: MdOutlineKeyboardArrowUp,
  },
  {
    icon: BsFillInboxesFill,
    heading: "Product",
    location: "/product",
  },
  {
    icon: FaSitemap,
    heading: "All Products",
    location: "/all-products",
  },

  {
    icon: BsPeopleFill,
    heading: "Customers",
    location: "/customers",
  },
  {
    icon: FaClipboardList,
    heading: "Orders",
    location: "/orders",
  },
  {
    icon: BsChatLeftDotsFill,
    heading: "Chat",
    location: "/chat",
  },
];
