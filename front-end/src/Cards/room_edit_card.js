/**
 * Created by Jens-Andreas on 12-Apr-17.
 */
/**
 * Created by Jens-Andreas on 12-Apr-17 @Værnes International Airport
 */
import React from 'react';
import {Card, Button,Row,Input} from 'react-materialize';


const style = {
    cardStyle: {
        position: 'absolute',
        zIndex: 3,
        width: '95%',
        maxWidth: '390px',
        height: "235px",
        left: '10px',

    },

    cancelButtonStyle: {
        waves: 'light',
        className: 'red lighten-2',
        style: {
            margin: "10px",
            position: 'absolute',
            bottom: '10px',
            right: '25px',
            maxWidth: '140px',
            width: "38%",
        }
    },

    confirmButtonStyle: {
        waves: 'light',
        className: 'green lighten-2',
        style: {
            margin: "10px",
            position: 'absolute',
            bottom: '10px',
            left: '25px',
            maxWidth: '140px',
            width: "38%",
        }
    },

    divider: {
        margin: '8px 0px 8px 0px',
        height: 1,
        backgroundColor: '#757575',
    },
};


class RoomEditCard extends React.Component {

    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);

        let room = this.getRoom(props.roomEditId, props.rooms);

        this.state = {
            id: room.id,
            name: room.name,
        };
    }

    getRoom(id,rooms){
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i].id===id){
                return rooms[i];
            }
        }

        return undefined;
    }


    loadForm(){
        let roomName = {
            s: 12,
            label:"Room name",
            style: {
                margin: "0px 0px 40px 0px",
            }
        }

        if(this.state.name !== undefined){
            roomName.defaultValue = this.state.name;
        }


        return(
            <Row>
                <Input {...roomName} onChange={this.handleNameChange}/>
            </Row>
        )
    }


    /**
     * The following section handles all handling of input from thee name field
     * Note: The binding
     */
    handleNameChange(event){
        this.setState({
            name: event.target.value
        });
    }


    /**
     * Renders the HTML for the configuration card
     * @returns {XML}
     */

    render() {
        return (

            <div>
                <Card style={style.cardStyle}>
                    <h4>Edit room</h4>
                    <div style={style.divider}/>
                    {this.loadForm()}
                    <Button {...style.cancelButtonStyle} onClick={this.props.handleCancelButton}>Cancel</Button>
                    <Button {...style.confirmButtonStyle} onClick={(roomName) => this.props.handleConfirmButton(this.state)}>Confirm</Button>
                </Card>

            </div>
        )
    }
};

export default RoomEditCard;