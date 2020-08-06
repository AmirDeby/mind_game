import * as React from 'react';
import { Store } from '../../store'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ShowPlayers from '../ShowPlayers/ShowPlayers';

export interface NameProps extends RouteComponentProps {
}

interface INamesState {
    newPlayer: string,
}

class _Names extends React.Component<NameProps, INamesState> {
    static contextType = Store

    state: INamesState = {
        newPlayer: "",
    }
    public render() {
        return (
            <div className="row" style={{ width: "20%", margin: "auto" }}>
                <h1 style={{ margin: "12px" }}><u>משחק הזיכרון</u></h1>
                <Form style={{ marginLeft: "45px" }} onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Control
                            onChange={this.onChangehandlerName}
                            style={{ margin: "5px" }}
                            value={this.state.newPlayer}
                            name="newPlayer" size="sm"
                            type="text"
                            placeholder="הכנס שם של שחקן" />
                    </Form.Group>
                    <Button type="submit" size="sm" variant="outline-dark" >הוסף שחקן</Button>
                    <div style={{ margin: "10px" }}>
                        <Button onClick={this.onContinueHandle} type="submit" size="sm" variant="outline-danger" >המשך למשחק</Button>
                    </div>
                    <ShowPlayers />
                </Form>
            </div>
        );
    }
    onChangehandlerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        this.setState({ [name]: value } as any);
        // console.log(this.state);
    }
    onContinueHandle = () => {
        const { history } = this.props;
        const { players } = this.context.state;
        if (!players.length) {
            return alert('חובה להכניס שם של שחקן אחד לפחות');
        }
        history.push('/game');
    }
    onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { newPlayer } = this.state;
        const { players } = this.context.state;

        players.push({
            name: newPlayer,
            id: Math.random() * 999999,
            points: 0
        })
        this.context.setState({
            players
        });
        this.setState({
            newPlayer: ""
        })
        console.log(newPlayer);
    }
}

export const Names = withRouter(_Names);