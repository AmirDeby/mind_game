import * as React from 'react';
import Card from '../Card/Card';
import "../Game/Game.css";
import shuffle from 'lodash.shuffle';
import { IPlayer } from '../../players';

export interface IGameProps {
}

interface IGameState {
  players: IPlayer[],
  stack: string[];
  flippedCards: any;
  currentFlippedCards: number[];
  currentPlayer: number,
}

const images = [
  'https://picsum.photos/id/133/200/300?grayscale',
  'https://picsum.photos/id/1003/1181/1772',
  'https://picsum.photos/id/237/200/300',
  'https://picsum.photos/id/1004/1181/1772',
  'https://picsum.photos/id/1006/1181/1772',
  'https://picsum.photos/id/1005/1181/1772',
  'https://picsum.photos/id/1009/1181/1772',
  'https://picsum.photos/id/1011/1181/1772',

];

const cards = images.reduce((cards: string[], image: string) => cards.concat([image, image]), []);

export default class Game extends React.Component<IGameProps, IGameState> {
  state: IGameState = {
    players: [{
      id: 1,
      points: 0
    },
    {
      id: 2,
      points: 0
    }
    ],
    currentPlayer: 0,
    stack: shuffle(cards),
    flippedCards: {},
    currentFlippedCards: [],
  }

  public render() {
    const { stack, flippedCards, currentFlippedCards, currentPlayer } = this.state;
    const numOfFlippedCards = Object.keys(flippedCards).length;
    const finishGame = numOfFlippedCards === stack.length;

    return (
      <div className="game" >
        {finishGame ? <div className="game-over" >Game Over</div> : null}
        <p className="points">
        </p>
        <p>now playing : {currentPlayer}</p>
        <div className="cards">
          {
            stack.map((url, index) =>
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
    const { currentFlippedCards, stack, flippedCards } = this.state;
    if (currentFlippedCards.length >= 2) {
      return;
    }
    if (currentFlippedCards.length === 0) {
      this.setState({
        currentFlippedCards: currentFlippedCards.concat(index)
      });
    } else {
      const firstCardIndex = currentFlippedCards[0]
      const firstCard = stack[firstCardIndex];
      const secondCard = stack[index];
      if (firstCard === secondCard) {
        this.setState({
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
        this.setState({
          currentFlippedCards: currentFlippedCards.concat(index)
        },
          // we can pass a callback function as a second parameter to setState()
          // the callback function is called ONLY AFTER setState is complete (remember: setState is async)
          () => {
            // we use setTimeout to show the flipped cards (not matching pair) for some time on the screen
            // before flipping them back
            setTimeout(() => {
              this.setState({
                currentFlippedCards: [],
                currentPlayer: (this.state.currentPlayer + 1) % this.state.players.length,
              })
            }, 1500);
          });
      }
    }
  }
}
