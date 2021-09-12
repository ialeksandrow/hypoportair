import logo from './../images/logo.svg';
import Menu from './Menu';
import menuLinks from './../common/menu-links';

const Navigation = () => {
  return (
    <nav id="main-nav">
      <div className="container">
        <img src={logo} alt="HypoportAIR" className="logo" />
        <Menu menuLinks={menuLinks} />
      </div>
    </nav>
  );
};

export default Navigation;
