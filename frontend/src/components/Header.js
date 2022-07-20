import { Link } from "react-router-dom";

function Header({email, link, button, handleSignOut}) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__container-auth">
        <p className="header__email">{email}</p>
        <Link to={link} onClick={handleSignOut} className="header__title">
          {button}
        </Link>
      </div>
    </header>
  );
}

export default Header;
