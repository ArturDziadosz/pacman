import React, {Component} from 'react';

import Pacman from '../Pacman';
import './style.css';

class Board extends Component {
    render () {
        return (
            <main className="board">
                <Pacman />
                {/* <Ghost /> */}
                {/* <Ghost /> */}
                {/* <Food /> */}
            </main>
        )
    }
}

export default Board;