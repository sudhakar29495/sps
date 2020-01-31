import React from 'react';
import Landing from './assets/landing.gif';
import Go from './assets/Go.gif';
import Stone from './assets/rock.gif';
import Paper from './assets/Paper.gif';
import Scissor from './assets/scissors.gif';
import Win from './assets/win.gif';
import Lose from './assets/lose.gif';
import Tie from './assets/Tie.gif';
import Play_Again from './assets/play_again.gif';
import './App.scss';
import { statusList } from './util';
import AppService from './App.service';
import axios from 'axios/index';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [Landing, Go, [Stone, Paper, Scissor], Play_Again],
      currentStateIndex: 0,
      result: [Win, Lose],
      status: '',
      opponentPlay: Stone
    };
    // this.playedTime = 0;
  }

  getOpponentPlay(data) {
    if(data === 'scissors') {
      return Scissor
    } else if(data === 'rock') {
      return Stone
    } else {
      return Paper
    }
  }

  resetSensorData = () => {
    axios.post('http://192.168.15.21:5000/startPlay')
    .then(res => console.log(res));
  }

  onCLickTapToPlay = () => {
    this.setState({ currentStateIndex: 1 });
    
    setTimeout(() => { 
      let result = {};
      axios.get('http://192.168.15.21:5000/startPlay')
        .then(res => result = res);
      setTimeout(()=>{
        console.log(result)
        this.setState({
          result: result.data.won_by === 'Computer' ? Lose : result.data.won_by === 'tie' ? Tie : Win,
          currentStateIndex: 2,
          opponentPlay: this.getOpponentPlay(result.data.system_played)
        });
        setTimeout(()=>{
          this.setState({
            currentStateIndex: 2,
            status: statusList.completed
          });
          setTimeout(() => {
            this.setState({ currentStateIndex: 3, status: statusList.notStarted });
          }, 3000);
        }, 2000)
      }, 1000);
   }, 4000);
    // const response = startPlay();
    // this.playedTime += 1;
    // if (this.playedTime <= 3) {
    //   setTimeout(() => {
    //     this.setState({ currentStateIndex: 2 });
        // setTimeout(() => {
        //   if (this.playedTime === 3) {
        //     this.setState({ status: statusList.completed });
        //     setTimeout(() => {
        //       this.setState({ currentStateIndex: 0, status: statusList.notStarted });
        //     }, 3000);
        //   } else {
        //     this.setState({ currentStateIndex: 3 });
        //   }
        // }, 2000);

    //   }, 4000);
    // }
  }

  render() {
    const { currentStateIndex, orders, result, status, opponentPlay } = this.state;
    return (
      <div className="App">
        {status !== statusList.completed &&
          <React.Fragment>
            {currentStateIndex !== 2 &&
              <React.Fragment>
                    <button onClick={this.resetSensorData} class="reset-button">
                    CALIBRATE
                  </button>          
              <img usemap="#playIcon" alt="Landing" loop="0" onClick={this.onCLickTapToPlay} src={orders[currentStateIndex]} />
              </React.Fragment>
            }
            {currentStateIndex === 2 &&
              <img usemap="#playIcon" alt="Play"  src={opponentPlay} />
            }
            {/* {
              <map name="playIcon">
                  <area shape="rect" alt="Play" coords="432,580,860,643" />
              </map>
            } */}
            {/* {(currentStateIndex === 0 || currentStateIndex === 3) &&
              <button className="tap-here" onClick={this.onCLickTapToPlay}>
                {`TAP HERE TO PLAY ${currentStateIndex === 3 ? 'AGAIN' : ''}`}
              </button>
            } */}
          </React.Fragment>
        }
        {
          status === statusList.completed &&
          <React.Fragment>
            {currentStateIndex === 2 &&
              <img alt="result" src={result} />
            }
          </React.Fragment>
        }
      </div>
    );
  }
}

export default App;
