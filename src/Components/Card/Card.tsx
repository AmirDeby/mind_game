import * as React from 'react';

export interface ICardProps {
  index: number;
  image: string;
  onFlip(index: number): void;
  isFlipped: boolean;

}

export default class Card extends React.Component<ICardProps> {
  public render() {
    const { image, index, isFlipped, onFlip } = this.props;

    return (
      <div onClick={() => {
        if (!isFlipped) {
          onFlip(index)
        }

      }}>

        <img style={{ width: "200px", height: "280px" }} src={isFlipped ? image : "/card-back.png"} />

      </div>
    );
  }
}
