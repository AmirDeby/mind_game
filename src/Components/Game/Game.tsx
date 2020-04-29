import * as React from 'react';
import { Store } from '../../store'
import Card from '../Card/Card';
import "../Game/Game.css";
import { IPlayer } from '../../players';


export interface IGameProps {
  players?: IPlayer[],
}

interface IGameState {
  players: IPlayer[],
  stack: string[];
  flippedCards: any;
  currentFlippedCards: number[];
  currentPlayer: number,
}


export default class Game extends React.Component<IGameProps, IGameState> {
  static contextType = Store;

  componentDidMount() {
    const currentPlayer = Math.floor(Math.random() * this.context.state.players.length);
    this.context.setState({ currentPlayer });
  }

  public render() {
    const { stack, flippedCards, currentFlippedCards, currentPlayer, players } = this.context.state;
    const numOfFlippedCards = Object.keys(flippedCards).length;
    const finishGame = numOfFlippedCards === stack.length;
    const gameStatus = players.map((player: any) =>
      <table style={{ border: "solid 3px white", margin: "5px" }} key={player.id}>
        <tr>
          <th style={{ border: "solid 3px white", margin: "2px", padding: "5px" }}>נקודות</th>
          <th style={{ margin: "3px", padding: "5px" }}>שם השחקן</th>
        </tr>
        <tr style={{ border: "solid 3px white", margin: "2px" }}>
          <td style={{ border: "solid 2px white", margin: "5px" }}>
            {player.points}
          </td>
          <td>
            {player.name}
          </td>
        </tr>
      </table>)

    return (
      <div className="game" >
        {finishGame ? <div className="game-over" >{gameStatus}</div> : null}
        <p className="points">
        </p>
        <p>עכשיו משחק : {players[currentPlayer].name}</p>
        <div><u>מספר נקודות </u> : {players[currentPlayer].points}</div>
        <div className="cards">
          {
            stack.map((url: any, index: any) =>
              <Card
                key={index}
                index={index}
                image={url}
                onFlip={this.handleOnFlip}
                isFlipped={flippedCards[index] || currentFlippedCards.includes(index)} />)
          }
        </div>
      </div>
    );
  }

  handleOnFlip = (index: number) => {
    const { currentFlippedCards, stack, flippedCards, players, currentPlayer } = this.context.state;
    if (currentFlippedCards.length >= 2) {
      return;
    }
    if (currentFlippedCards.length === 0) {
      this.context.setState({
        currentFlippedCards: currentFlippedCards.concat(index)
      });
    } else {
      const firstCardIndex = currentFlippedCards[0]
      const firstCard = stack[firstCardIndex];
      const secondCard = stack[index];
      if (firstCard === secondCard) {
        const copyPlayers = players.concat()
        const singlePlayer = players[currentPlayer];
        const addPoints = players[currentPlayer] = {
          ...singlePlayer,
          points: players[currentPlayer].points + 1
        }
        copyPlayers[currentPlayer] = {
          ...singlePlayer,
          ...addPoints
        }
        console.log(addPoints);
        console.log(copyPlayers);

        this.context.setState({
          players: copyPlayers,
          flippedCards: {
            // we create a new version of flippedCards,
            // which has ALL the keys and values of the old flippedCards
            //  but we also add 2 more keys, which are the indexes of the 2 cards we've just flipped
            // we use spread (...) to copy all of the old keys and values
            ...flippedCards,
            // we use [firstCardIndex] to use firstCardIndex's *value* as a key name
            [firstCardIndex]: true,
            [index]: true,
          },
          currentFlippedCards: [],
        })

      } else {
        this.context.setState({
          currentFlippedCards: currentFlippedCards.concat(index)
        },
          // we can pass a callback function as a second parameter to setState()
          // the callback function is called ONLY AFTER setState is complete (remember: setState is async)
          () => {
            // we use setTimeout to show the flipped cards (not matching pair) for some time on the screen
            // before flipping them back
            setTimeout(() => {
              this.context.setState({
                currentFlippedCards: [],
                currentPlayer: (this.context.state.currentPlayer + 1) % this.context.state.players.length,
              })
            }, 1500);
          });
      }
    }
  }
}
