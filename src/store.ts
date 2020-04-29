import React from 'react';
import { IPlayer } from './players';

export interface IAppState {
    players: IPlayer[],
    stack: string[];
    flippedCards: any;
    currentFlippedCards: number[];
    currentPlayer: number,
}

interface IStore {
    state: IAppState,
    setState(state: any): void,
}

export const Store = React.createContext<IStore>(undefined as any)



