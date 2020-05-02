import * as React from 'react';
import { Store } from '../../store'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface NameProps extends RouteComponentProps {
}

interface INamesState {
    playerOne: string,
    playerTwo: string,
}

class _Names extends React.Component<NameProps, INamesState> {
    static contextType = Store

    state: INamesState = {
        playerOne: "",
        playerTwo: "",
    }
    public render() {
        return (
            <div style={{ width: "20%", margin: "auto" }}>
                <h2 style={{ margin: "9px" }}><u>משחק הזיכרון</u></h2>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Control
                            onChange={this.onChangehandlerName}
                            style={{ margin: "5px" }}
                            name="playerOne" size="sm"
                            type="text"
                            placeholder="הכנס שם של שחקן מספר 1" />
                        <Form.Control
                            onChange={this.onChangehandlerName}
                            style={{ margin: "5px" }}
                            name="playerTwo"
                            size="sm"
                            type="text"
                            placeholder="הכנס שם של שחקן מספר 2" />
                    </Form.Group>
                    <Button type="submit" size="sm" variant="outline-dark" >הוסף שחקן</Button>
                    <div style={{ margin: "10px" }}>
                        <Button onClick={this.onContinueHandle} type="submit" size="sm" variant="outline-warning" >המשך למשחק</Button>
                    </div>
                </Form>
            </div>
        );
    }
    onChangehandlerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        this.setState({ [name]: value } as any);
        console.log(this.state);
    }
    onContinueHandle = () => {
        const { history } = this.props;
        const { playerOne, playerTwo } = this.state
        if (!playerOne || !playerTwo) {
            return alert('חובה להכניס שמות שחקנים');
        }
        history.push('/game');
    }
    onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { playerOne, playerTwo } = this.state;

        const newPlayerOne = {
            name: playerOne,
            id: Math.random() * 999999,
            points: 0
        }
        const newPlayerTwo = {
            name: playerTwo,
            id: Math.random() * 999999,
            points: 0
        }
        this.context.setState({
            players: [newPlayerOne, newPlayerTwo]
        })
        console.log(newPlayerTwo);
        
    }
}

export const Names = withRouter(_Names);