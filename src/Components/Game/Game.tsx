import * as React from 'react';
import Card from '../Card/Card';

export interface IGameProps {
}

export default class Game extends React.Component<IGameProps> {
  state = {
    isCardFlipped: false,
    
  }
  public render() {
    const { isCardFlipped } = this.state;
    console.log(isCardFlipped);
    
    return (
      <div>
        <Card
          index={0}
          image={'https://picsum.photos/id/1003/1181/1772'}
          onFlip={() => {this.setState({isCardFlipped: !isCardFlipped }) }}
          isFlipped={isCardFlipped} />
      </div>
    );
  }
}
