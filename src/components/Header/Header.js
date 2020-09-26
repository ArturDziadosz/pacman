import React from 'react';

import './style.css';

function Header({score}) {
    return (
        <header className="header">
            <span>SCORE: {score}</span>
        </header>
    )
}

Header.defaultProps = {
    score: 0
}

export default Header;