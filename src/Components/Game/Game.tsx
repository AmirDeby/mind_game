import * as React from 'react';
import Card from '../Card/Card';
import "../Game/Game.css";

export interface IGameProps {
}

interface IGameState {
  stack: string[];
  flippedCards: any;
  currentFlippedCards: number[]
}

export default class Game extends React.Component<IGameProps, IGameState> {
  state: IGameState = {

    stack: [
      'https://picsum.photos/id/1003/1181/1772',
      'https://picsum.photos/id/1002/1181/1772',
      'https://picsum.photos/id/1003/1181/1772',
      'https://picsum.photos/id/1002/1181/1772',
      'https://picsum.photos/id/1004/1181/1772',
      'https://picsum.photos/id/1004/1181/1772',
    ],

    flippedCards: {
     
    },

    currentFlippedCards: [],


  }

  public render() {
    const { stack, flippedCards, currentFlippedCards } = this.state;

    return (

      <div className="game" >
        {
          stack.map((url, index) =>
            <Card
              key={index}
              index={index}
              image={url}
              onFlip={(index) => {
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
                        ...flippedCards,
                        [firstCardIndex]: true,
                        [index]: true,
                      },
                      currentFlippedCards: []
                    })
                  } else {
                    this.setState({
                      currentFlippedCards: currentFlippedCards.concat(index)
                    });
                    setTimeout(() => {
                      this.setState({
                        currentFlippedCards: []
                            })                            
                    }, 3000);
                  }
                }
              }}
              isFlipped={flippedCards[index] || currentFlippedCards.includes(index)} />)
        }
      </div>
    );
  }
}
