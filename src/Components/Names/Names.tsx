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
                <h2 style={{ margin: "9px" }}><u>My Mind Game</u></h2>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Control
                            onChange={this.onChangehandlerName}
                            style={{ margin: "5px" }}
                            name="playerOne" size="sm"
                            type="text"
                            placeholder="Enter Player 1 name" />
                        <Form.Control
                            onChange={this.onChangehandlerName}
                            style={{ margin: "5px" }}
                            name="playerTwo"
                            size="sm"
                            type="text"
                            placeholder="Enter Player 2 name" />
                    </Form.Group>
                    <Button type="submit" size="sm" variant="outline-dark" >Submit</Button>
                </Form>
            </div>
        );
    }
    onChangehandlerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        this.setState({ [name]: value } as any);
        // console.log(this.state);
    }
    onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { playerOne, playerTwo } = this.state;
        const { history } = this.props;

        const newPlayerOne = {
            name: playerOne,
            id: 1,
            points: 0
        }
        const newPlayerTwo = {
            name: playerTwo,
            id: 2,
            points: 0
        }
        this.context.setState({
            players: [newPlayerOne, newPlayerTwo]
        })

        history.push('/game');
    }
}

export const Names = withRouter(_Names);