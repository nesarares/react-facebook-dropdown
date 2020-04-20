import React, { useState } from "react";
import { ReactComponent as AddIcon } from "./icons/add-24px.svg";
import { ReactComponent as ChatIcon } from "./icons/chat-24px.svg";
import { ReactComponent as ExpandIcon } from "./icons/expand_more-24px.svg";
import { ReactComponent as SettingsIcon } from "./icons/settings-24px.svg";
import { ReactComponent as ArrowRightIcon } from "./icons/keyboard_arrow_right-24px.svg";
import { ReactComponent as NotificationsIcon } from "./icons/notifications-24px.svg";
import { ReactComponent as PersonIcon } from "./icons/person-24px.svg";
import { ReactComponent as FireplaceIcon } from "./icons/fireplace-24px.svg";
import { ReactComponent as ArrowBackIcon } from "./icons/arrow_back-24px.svg";
import { CSSTransition } from "react-transition-group";

function App() {
  return (
    <Navbar>
      <NavItem icon={<AddIcon />} />
      <NavItem icon={<ChatIcon />} />
      <NavItem icon={<NotificationsIcon />} />

      <NavItem icon={<ExpandIcon />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <button className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </button>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <button
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </button>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={400}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<PersonIcon />}>My profile</DropdownItem>
          <DropdownItem
            leftIcon={<SettingsIcon />}
            rightIcon={<ArrowRightIcon />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon={<FireplaceIcon />}
            rightIcon={<ArrowRightIcon />}
            goToMenu="tutorials"
          >
            Tutorials
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={400}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<ArrowBackIcon />} goToMenu="main">
            Back
          </DropdownItem>
          <DropdownItem leftIcon="📑">Newsfeed preferences</DropdownItem>
          <DropdownItem leftIcon="🔒">Privacy</DropdownItem>
          <DropdownItem leftIcon="🌍">Language</DropdownItem>
          <DropdownItem leftIcon="📳">Activity log</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "tutorials"}
        unmountOnExit
        timeout={400}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<ArrowBackIcon />} goToMenu="main">
            Back
          </DropdownItem>
          <DropdownItem leftIcon="🎁">Flutter firebase</DropdownItem>
          <DropdownItem leftIcon="🎑">CSS Grid</DropdownItem>
          <DropdownItem leftIcon="🎪">CSS FlexBox</DropdownItem>
          <DropdownItem leftIcon="🛒">VSCode Tips</DropdownItem>
          <DropdownItem leftIcon="🎃">VueJs Beginner's guide</DropdownItem>
          <DropdownItem leftIcon="🧣">CSS Variables</DropdownItem>
          <DropdownItem leftIcon="🔊">Git explained</DropdownItem>
          <DropdownItem leftIcon="⛳">Beyond console.log</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
