import { useState, useEffect } from "react";
import { FaBars} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { 
  Bell,
} from 'lucide-react';
import img from "../assets/imgs/other/admin-default.png";
import { auth } from "../config/firebaseConfig";

export default function Topbar({ toggleMenu }) {
  const location = useLocation();

    const handleLogout = () => {
    auth.signOut();

  };
  
  const pageTitles = {
    "/": "Dashboard",
    "/users": "User Management",
    "/missions": "Missions",
    "/skills": "Skill Tree Management",
    "/rewards": "XP & Rewards",
    "/reports": "Reports & Analytics",
    "/settings": "Technical Settings",
  };
  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  const adminName = "Admin";
  const adminRole = "Super Admin";
  const [adminImage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const searchWidth = windowWidth < 768 ? "120px" : "200px";
  const adminBoxPadding = windowWidth < 768 ? "4px 8px" : "4px 10px";
  const adminBoxMinWidth = windowWidth < 768 ? "130px" : "160px";

  return (
    <div className="topbar d-flex justify-content-between align-items-center shadow-sm px-3 py-2">
 
      <div className="d-flex align-items-center gap-3">
 
        <button
          className="btn d-md-none"
          onClick={toggleMenu}
          style={{ border: "none", background: "transparent" }}
        >
          <FaBars size={18} />
        </button>
        <h5 className="mb-0">{currentTitle}</h5>
      </div>


      <div className="d-flex align-items-center gap-2">

        <input
          type="text"
          placeholder="Search for anything"
          className="form-control"
          style={{
            width: searchWidth,
            fontSize: "13px",
            borderRadius: "20px",
            padding: "6px 12px",
            outline: "none",
            boxShadow: "none",
            border: "1px solid #ccc",
          }}
        />

     
        <div
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          <Bell size={16} />
        </div>

        <div
          className="dropdown d-flex align-items-center"
          style={{
            border: "1px solid #ccc",
            borderRadius: "30px",
            padding: adminBoxPadding,
            backgroundColor: "#fff",
            cursor: "pointer",
            minWidth: adminBoxMinWidth,
            gap: "8px",
            position: "relative",
          }}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
       
          <img
            src={adminImage || img}
            alt="Admin Profile"
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

   
          <div
            style={{
              lineHeight: "1.2",
              display: windowWidth < 500 ? "none" : "block", 
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "#000",
              }}
            >
              {adminName}
            </span>
            <br />
            <small style={{ fontSize: "11px", color: "#888" }}>{adminRole}</small>
          </div>

       
          <i
            className="fa-solid fa-angle-down"
            style={{
              marginLeft: "auto",
              fontSize: "12px",
              color: "#000",
            }}
          ></i>

          {dropdownOpen && (
            <ul
              className="dropdown-menu show"
              style={{
                position: "absolute",
                right: "0",
                top: "50px",
                display: "block",
                minWidth: "160px",
                fontSize: "14px",
                zIndex: 10,
              }}
            >
              <li>
                <button className="dropdown-item">Profile</button>
              </li>
              <li>
                <button className="dropdown-item">Settings</button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
