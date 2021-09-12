import { useState } from 'react';

const Menu = ({ menuLinks }) => {
  const [activeLink, setActiveLink] = useState(null);

  return (
    <ul className="main-menu">
      {menuLinks.map(link => (
        <li key={link.pointer} className="main-menu__item">
          <a
            href={link.pointer}
            className={
              link.pointer === activeLink?.pointer
                ? 'main-menu__link--active'
                : 'main-menu__link'
            }
            onClick={() => setActiveLink(link)}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
