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
        width: '80%',
        maxWidth: '380px',
        height: "235px",
        left: '20px',

    },

    cancelButtonStyle: {
        waves: 'light',
        className: 'red lighten-2',
        style: {
            margin: "10px",
            position: 'absolute',
            bottom: '10px',
            right: '25px',
            width: '140px'
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
            width: '140px'
        }
    },

    divider: {
        margin: '8px 0px 8px 0px',
        height: 1,
        backgroundColor: '#757575',
    },
};


class RoomCard extends React.Component {

    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.state = {
            roomName:undefined
        };
    }



    loadForm(){
        let plantName = {
            s: 12,
            label:"Room name",
            style: {
                margin: "0px 0px 40px 0px",
            }
        }


        return(
            <Row>
                <Input {...plantName} onChange={this.handleNameChange}/>
            </Row>
        )
    }


    /**
     * The following section handles all handling of input from thee name field
     * Note: The binding
     */
    handleNameChange(event){
        this.setState({
            roomName: event.target.value
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
                    <h4>Add new room</h4>
                    <div style={style.divider}/>
                    {this.loadForm()}
                    <Button {...style.cancelButtonStyle} onClick={this.props.handleCancelButton}>Cancel</Button>
                    <Button {...style.confirmButtonStyle} onClick={(roomName) => this.props.handleConfirmButton(this.state.roomName)}>Confirm</Button>
                </Card>

            </div>
        )
    }
};

export default RoomCard;