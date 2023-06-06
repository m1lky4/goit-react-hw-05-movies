import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import s from './Header.module.css';
export const Header = () => {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <NavLink
          className={({ isActive }) => clsx(s.link, isActive && s.active)}
          to={'/'}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(s.link, isActive && s.active)}
          to={'/movies'}
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
};
