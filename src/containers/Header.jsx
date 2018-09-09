import './Header.css';
import React from 'react';
import { QUANTUM_FLOW, WEBCOMPAT } from '../constants/BugListTypes';
import { observer } from 'mobx-react';

const Header = observer(({ router }) => {
  const location = router.location;
  const unprefixedHash = location.hash.length > 0 ? location.hash.substring(1) : undefined;

  return (
    <header className="header">
      <h1>Firefox Platform Layout Dashboard</h1>
      <nav>
        <ul>
          <li className={ unprefixedHash === QUANTUM_FLOW || !unprefixedHash ? 'selected' : undefined }><a href={ '#' + QUANTUM_FLOW }>QF Burndown</a></li>
          <li className={ unprefixedHash === WEBCOMPAT ? 'selected' : undefined }><a href={ '#' + WEBCOMPAT }>Webcompat Burndown</a></li>
        </ul>
      </nav>
    </header>
  );
});

export default Header;