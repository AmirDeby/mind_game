import * as React from 'react';
import { Store } from '../../store';

export interface IShowPlayersProps {
}

export default class ShowPlayers extends React.Component<IShowPlayersProps> {
    static contextType = Store;
    public render() {
        const { players } = this.context.state;
        return (
            <div className="row" style={{ marginTop: "20px" }}>
                {players.map((player: any, index: number) =>
                    <div style={{ display: "contents", margin: "auto" }} key={index}>
                        <table style={{ border: "solid 3px black", padding: "3px", margin: "auto" }}>
                            <thead>
                                <tr>
                                    <th style={{ margin: "3px", padding: "5px" }}>שם השחקן</th>
                                </tr>
                                <tr style={{ border: "solid 3px black", margin: "2px" }}>
                                    <td>
                                        {player.name}
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>)}
            </div>
        );
    }
}
