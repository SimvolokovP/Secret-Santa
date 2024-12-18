import { NavLink } from "react-router-dom";
import "./MobileBar.scss";
import { routerLinks } from "../../router/routerLinks";

const MobileBar = () => {
  return (
    <div className="container">
      <div className="mobile-bar">
        <ul className="list-reset mobile-bar__list">
          {routerLinks.map((link) => (
            <li key={link.to} className="mobile-bar__list--item">
              <NavLink
                className={(e) =>
                  e.isActive ? "mobile-bar__link active" : "mobile-bar__link"
                }
                to={link.to}
              >
                <img src={`${link.icon}.svg`} alt={link.text} />
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileBar;
