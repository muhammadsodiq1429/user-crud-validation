import { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaMoon } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";

const Header = () => {
  const light = {
    theme: "light",
    element: (
      <FaMoon className="text-2xl cursor-pointer" onClick={handleTheme} />
    ),
  };
  const dark = {
    theme: "dark",
    element: (
      <MdSunny className="text-2xl cursor-pointer" onClick={handleTheme} />
    ),
  };

  const [themeIcon, setThemeIcon] = useState<typeof light | typeof dark>(dark);

  function handleTheme() {
    document.body.classList.toggle("dark");
    setThemeIcon((p) => (p.theme === "dark" ? light : dark));
  }

  return (
    <header className="header">
      <nav className="navbar container h-20 flex items-center gap-5">
        <div className="navbar__logo flex-1">
          <h2 className="text-2xl font-medium">LOGO</h2>
        </div>
        <ul className="navbar__collection flex gap-3 uppercase tracking-wider">
          <li>
            <NavLink
              end
              className={({ isActive }) =>
                `${isActive ? "underline text-yellow-300" : ""}`
              }
              to={""}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              className={({ isActive }) =>
                `${isActive ? "underline text-yellow-300" : ""}`
              }
              to={"/register"}
            >
              register
            </NavLink>
          </li>
        </ul>
        <div className="navbar__actions">{themeIcon.element}</div>
      </nav>
    </header>
  );
};

export default memo(Header);
