import * as React from 'react';
import { Store } from '../../store';

export interface IGameStatuseProps {
}

export default class GameStatus extends React.Component<IGameStatuseProps> {
    static contextType = Store;
    public render() {
        const { players } = this.context.state;
        return (
            <div>
                { players.map((player: any, index: number) =>
                <table style={{ border: "solid 3px white", padding: "5px", margin: "auto" }} key={index}>
                    <thead>
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
                    </thead>
                    </table>)}
            </div>
        );
    }
}
