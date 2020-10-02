import React, {Component} from 'react';

import Pacman from '../Pacman';
import Ghost from '../Ghost'
import Food from '../Food';
import './style.css';

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boardWidth: this.props.boardWidth,
            boardHeight: this.props.boardHeight,
            won: false
        }

        this.pacmanRef = React.createRef();

        this.foods = [];
        this.amountOfFood = (
            this.state.boardWidth
            * this.state.boardHeight
        ) / (this.props.foodSize * this.props.foodSize) - 1;
        
        for (let i = 0; i <= this.amountOfFood; i++) {
            this['food' + i] = React.createRef();
        }
    }

    componentDidMount() {
        this.intervalFood = setInterval(this.lookForEat, 10);
    }

    componentWillUnmount() {
        clearInterval(this.intervalFood);
    }

    lookForEat = () => {
        const pacmanX = this.pacmanRef.current.state.position.left;
        const pacmanY = this.pacmanRef.current.state.position.top;
        const pacmanSize = this.pacmanRef.current.props.size
    
        const pacmanLastX = pacmanX + pacmanSize / 2;
        const pacmanLastY = pacmanY + pacmanSize / 2;
    
        for (let i = 0; i <= this.amountOfFood; i++) {

          const currentFood = this['food' + i].current;
          if (currentFood) {
            const currentFoodX = currentFood.state.position.left;
            const currentFoodY = currentFood.state.position.top;
            const currentFoodSize = currentFood.props.foodSize;
            const currentFoodLastX = currentFoodX + currentFoodSize / 2;
            const currentFoodLastY = currentFoodY + currentFoodSize / 2;
    
            if (
              (pacmanX >= currentFoodX && pacmanX <= currentFoodLastX)
              || (pacmanLastX >= currentFoodX && pacmanLastX <= currentFoodLastX)) {
              if ((pacmanY >= currentFoodY && pacmanY <= currentFoodLastY)
                || (pacmanLastY >= currentFoodY && pacmanLastY <= currentFoodLastY)) {
                if (!currentFood.state.hidden) {
                  currentFood.ate();
                  this.props.setScore((value) => value + 1);

                  if (this.props.score >= this.amountOfFood) {
                    this.setState({
                        won: true
                    })
                    clearInterval(this.intervalFood);
                  }
                }
              }
            }
          }
        }
      }

    render () {

        const {foodSize} = this.props;
        let foods = [];
        let currentTop = 0;
        let currentLeft = 1 * foodSize;

        for (let i = 0; i < this.amountOfFood; i++) {
            if (currentLeft >= this.state.boardWidth) {
                currentTop += this.props.foodSize;
                currentLeft = 0;
            }
            if (currentTop >= this.state.boardHeight) {
                break;
            }

            const position = {left: currentLeft, top: currentTop};
            currentLeft += foodSize;
            foods.push(
                <Food key={`food-elem-${i}`} position={position} ref={this['food' + i]}/>
            )
        }

        return (
            <main className="board" style={{height: this.state.boardHeight, width: this.state.boardWidth}}>
                {this.state.won ? <div className={"text-won"}>You won!!!</div> :
                <>
                <Pacman ref={this.pacmanRef} boardHeight={this.state.boardHeight} boardWidth={this.state.boardWidth}/>
                <Ghost color="pink" boardHeight={this.state.boardHeight} boardWidth={this.state.boardWidth}/>
                <Ghost boardHeight={this.state.boardHeight} boardWidth={this.state.boardWidth}/>
                <Ghost color="blue" boardHeight={this.state.boardHeight} boardWidth={this.state.boardWidth}/>
                <Ghost color="orange" boardHeight={this.state.boardHeight} boardWidth={this.state.boardWidth}/>
                {foods}
                </>
                }
            </main>
        )
    }
}

Board.defaultProps = {
    foodSize: 50,
}

export default Board;