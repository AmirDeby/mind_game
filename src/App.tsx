import shuffle from 'lodash.shuffle';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Game from './Components/Game/Game';
import { Names } from './Components/Names/Names';
import { IAppState, Store } from './store';


const images = [
  'https://picsum.photos/id/133/200/300?',
  'https://picsum.photos/id/1003/1181/1772',
  // 'https://picsum.photos/id/237/200/300',
  // 'https://picsum.photos/id/1004/1181/1772',
  // 'https://picsum.photos/id/1006/1181/1772',
  // 'https://picsum.photos/id/1005/1181/1772',
  // 'https://picsum.photos/id/1009/1181/1772',
  // 'https://picsum.photos/id/1011/1181/1772',
  // 'https://picsum.photos/id/1016/1181/1772',
  // 'https://picsum.photos/id/1020/1181/1772',
];

const cards = images.reduce((cards: string[], image: string) => cards.concat([image, image]), []);

class App extends React.Component<any, IAppState>{
  state: IAppState = {
    players: [],
    currentPlayer: 0,
    stack: shuffle(cards),
    flippedCards: {},
    currentFlippedCards: [],
  }

  render() {
    return (
      <div className="App">
        <Store.Provider value={{ state: this.state, setState: this.setState.bind(this) }}>
          <Switch>
            <Route exact path="/">
              <Names />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
          </Switch>
        </Store.Provider>
      </div>
    );
  }
}
export default App;
