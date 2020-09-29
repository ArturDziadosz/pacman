import React, {Component} from 'react';

import { ReactComponent as PacmanSvg } from "./pacman.svg"

import './style.css';

class Pacman extends Component {

    state = {
        direction: "right",
        position: {
            top: 0,
            left: 0
        },
        boardWidth: this.props.boardWidth,
        boardHeight: this.props.boardHeight
    }

    constructor(props) {
        super(props);
        this.pacmanRef = React.createRef();
    }

    componentDidMount() {
        this.pacmanRef.current.focus();
    }

    handleKeyDown = (e) => {

        const currentTop = this.state.position.top;
        const currentLeft = this.state.position.left;
        const {step, size} = this.props;

        if (e.keyCode === 38) {
            this.setState({
                direction: "up",
                position: {
                    top: Math.max(currentTop - step, 0),
                    left: currentLeft
                }
            })
        } else if (e.keyCode === 39) {
            this.setState({
                direction: "right",
                position: {
                    top: currentTop,
                    left: Math.min(currentLeft + step, this.state.boardWidth - size)
                }
            })
        } else if (e.keyCode === 40) {
            this.setState({
                direction: "down",
                position: {
                    top: Math.min(currentTop + step, this.state.boardHeight - size),
                    left: currentLeft
                }
            })
        } else if (e.keyCode === 37) {
            this.setState({
                direction: "left",
                position: {
                    top: currentTop,
                    left: Math.max(currentLeft - step,0)
                }
            })
        }

    }

    render() {
        const { direction, position} = this.state;
        return (
            <div 
                className={`pacman pacman-${direction}`} 
                style={position} 
                ref={this.pacmanRef}
                tabIndex="0"
                onKeyDown={this.handleKeyDown}
            >
                <PacmanSvg />
            </div>
        )
    }
}

Pacman.defaultProps = {
    step: 50,
    size: 50,
}

export default Pacman;