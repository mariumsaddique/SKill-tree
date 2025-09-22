import { NavLink } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";
import img from "../assets/imgs/other/logo.png";
import dashboardWhite from "../assets/imgs/nav-icons/category-2.png";
import dashboardOrange from "../assets/imgs/nav-icons/dashboard-orng.png";
import usersWhite from "../assets/imgs/nav-icons/user-white.png";
import usersOrange from "../assets/imgs/nav-icons/user-orng.png";
import missionsWhite from "../assets/imgs/nav-icons/beforehover-mission.png";
import missionsOrange from "../assets/imgs/nav-icons/Mission-statement.png";
import skillsWhite from "../assets/imgs/nav-icons/Pencil-white.png";
import skillsOrange from "../assets/imgs/nav-icons/Pencil-orng.png";
import rewardsWhite from "../assets/imgs/nav-icons/Insignia.png";
import rewardsOrange from "../assets/imgs/nav-icons/skills-orng.png";
import reportsWhite from "../assets/imgs/nav-icons/report-white.png";
import reportsOrange from "../assets/imgs/nav-icons/analytic-orng.png";
import technicalWhite from "../assets/imgs/nav-icons/technical-white.png";
import technicalOrng from "../assets/imgs/nav-icons/technical-orng.png";

const navItems = [
  { to: "/", label: "Dashboard", white: dashboardWhite, orange: dashboardOrange },
  { to: "/users", label: "Users", white: usersWhite, orange: usersOrange },
  { to: "/missions", label: "Mission", white: missionsWhite, orange: missionsOrange },
  { to: "/skills", label: "Skill Builder", white: skillsWhite, orange: skillsOrange },
  { to: "/rewards", label: "XP & Rewards", white: rewardsWhite, orange: rewardsOrange },
  { to: "/reports", label: "Reports", white: reportsWhite, orange: reportsOrange },
  { to: "/settings", label: "Technical Settings", white: technicalWhite, orange: technicalOrng },
];

export default function Sidebar({ isOpen, toggleMenu }) {
  return (
    <>
      <div className="sidebar d-none d-md-flex flex-column p-3 vh-100">
        <img src={img} alt="Logo" style={{ width: "150px", marginBottom: "20px" }} />

        <button
          className="btn w-100 mb-3 mt-5 d-flex align-items-center justify-content-center"
          style={{
            borderRadius: "30px",
            backgroundColor: "#f9f9f9",
            fontWeight: "500",
            gap: "10px",
          }}
        >
          <span
            style={{
              backgroundColor: "#E65F2B",
              color: "white",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
            }}
          >
            <FaPlus />
          </span>
          <span style={{ color: "black" }}>Add new User</span>
        </button>

       <ul className="nav flex-column mt-5">
  {navItems.map((item, index) => (
    <li key={index}>
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `nav-link d-flex align-items-center gap-3 py-2 ${
            isActive ? "active-link" : "inactive-link"
          }`
        }
      >
        {({ isActive }) => (
          <>
            
              <img
                src={isActive ? item.orange : item.white}
                alt={item.label}
                style={{ width: "18px", height: "18px" }}
              />
          
            <span style={{ color: isActive ? "#E65F2B" : "white" }}>
              {item.label}
            </span>
          </>
        )}
      </NavLink>
    </li>
  ))}
</ul>

      </div>

      {isOpen && (
        <div className="mobile-menu">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <img src={img} alt="Logo" style={{ width: "150px", marginBottom: "20px" }} />

            <FaTimes
              size={24}
              style={{ cursor: "pointer" }}
              onClick={toggleMenu}
            />
          </div>

          <button
          className="btn w-100 mb-3 mt-5 d-flex align-items-center justify-content-center"
          style={{
            borderRadius: "30px",
            backgroundColor: "#f9f9f9",
            fontWeight: "500",
            gap: "10px",
          }}
        >
          <span
            style={{
              backgroundColor: "#E65F2B",
              color: "white",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
            }}
          >
            <FaPlus />
          </span>
          <span style={{ color: "black" }}>Add new User</span>
        </button>

          <ul className="nav flex-column">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center gap-2 ${
                      isActive ? "active-link" : ""
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <img
                        src={isActive ? item.orange : item.white}
                        alt={item.label}
                        style={{ width: "20px", height: "20px" }}
                      />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
