import React from 'react';
import Landing from './assets/Landing.gif';
import Go from './assets/Go.gif';
import Stone from './assets/stone.gif';
import Paper from './assets/paper.gif';
import Scissor from './assets/scissor.gif';
import Win from './assets/win.gif';
import Lose from './assets/lose.gif';
import Play_Again from './assets/play_again.gif';
import './App.scss';
import { statusList } from './util';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [Landing, Go, [Stone, Paper, Scissor], Play_Again],
      currentStateIndex: 0,
      result: [Win, Lose],
      status: ''
    };
    this.playedTime = 0;
  }

  onCLickTapToPlay = () => {
    this.setState({ currentStateIndex: 1 });
    this.playedTime += 1;
    if (this.playedTime <= 3) {
      setTimeout(() => {
        this.setState({ currentStateIndex: 2 });
        setTimeout(() => {
          if (this.playedTime === 3) {
            this.setState({ status: statusList.completed });
            setTimeout(() => {
              this.setState({ currentStateIndex: 0, status: statusList.notStarted });
            }, 3000);
          } else {
            this.setState({ currentStateIndex: 3 });
          }
        }, 2000);

      }, 4000);
    }
  }

  render() {
    const { currentStateIndex, orders, result, status } = this.state;
    return (
      <div className="App">
        {status !== statusList.completed &&
          <React.Fragment>
            {currentStateIndex !== 2 &&
              <img alt="Landing" src={orders[currentStateIndex]} />
            }
            {currentStateIndex === 2 &&
              <img alt="Play" src={orders[currentStateIndex][Math.floor(Math.random() * orders[currentStateIndex].length)]} />
            }
            {(currentStateIndex === 0 || currentStateIndex === 3) &&
              <button className="tap-here" onClick={this.onCLickTapToPlay}>
                {`TAP HERE TO PLAY ${currentStateIndex === 3 ? 'AGAIN' : ''}`}
              </button>
            }
          </React.Fragment>
        }
        {
          status === statusList.completed &&
          <React.Fragment>
            {currentStateIndex === 2 &&
              <img alt="result" src={result[0]} />
            }
          </React.Fragment>
        }
      </div>
    );
  }
}

export default App;
