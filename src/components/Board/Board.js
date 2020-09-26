import React, {Component} from 'react';

import Pacman from '../Pacman';
import Ghost from '../Ghost'
import Food from '../Food';
import './style.css';

class Board extends Component {

    constructor(props) {
        super(props);

        this.foods = [];
        this.amountOfFood = (
            (window.innerWidth - this.props.foodSize)
            * (window.innerHeight - this.props.topScoreBoardHeight)
        ) / (this.props.foodSize * this.props.foodSize) - 1;
        
        for (let i = 0; i < this.amountOfFood; i++) {
            this['food' + i] = React.createRef();
        }
    }

    render () {

        const {foodSize, border, topScoreBoardHeight} = this.props;
        let foods = [];
        let currentTop = 0;
        let currentLeft = 1 * foodSize;

        for (let i = 0; i < this.amountOfFood; i++) {
            if (currentLeft + foodSize >= window.innerWidth - border) {
                currentTop += foodSize;
                currentLeft = 0;
            }
            if (currentTop + foodSize >= (window.innerHeight - border - topScoreBoardHeight)) {
                break;
            }

            const position = {left: currentLeft, top: currentTop};
            currentLeft += foodSize;
            foods.push(
                <Food key={`food-elem-${i}`} position={position} ref={this['food' + i]}/>
            )
        }

        return (
            <main className="board">
                <Pacman />
                <Ghost color="pink"/>
                <Ghost />
                <Ghost color="blue"/>
                <Ghost color="orange"/>
                {foods}
            </main>
        )
    }
}

Board.defaultProps = {
    foodSize: 50,
    // TODO: move to config
    border: 10 * 2,
    topScoreBoardHeight: 50
}

export default Board;