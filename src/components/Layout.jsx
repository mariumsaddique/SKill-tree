import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="d-flex">
      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />

      <div className="flex-grow-1">
        <Topbar toggleMenu={toggleMenu} />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}
