/**
 * Created by Jens-Andreas on 13-Apr-17.
 */
/**
 * Created by Jens-Andreas on 11-Apr-17.
 */
import React from 'react';
import {Card, Button,Row,Input} from 'react-materialize';


const style = {
    cardStyle: {
        position: 'absolute',
        zIndex: 3,
        width: '80%',
        maxWidth: '380px',
        height: "615px",
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
        margin: '8px 0px 20px 0px',
        height: 1,
        backgroundColor: '#757575',
    },
};


class TypeAddCard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            name: undefined,
            min_temp: undefined,
            max_temp: undefined,
            max_moisture: undefined,
            min_moisture: undefined,
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleMaxMoistureChange = this.handleMaxMoistureChange.bind(this);
        this.handleMinMoistureChange = this.handleMinMoistureChange.bind(this);
        this.handleMaxTempChange = this.handleMaxTempChange.bind(this);
        this.handleMinTempChange = this.handleMinTempChange.bind(this);
    }


    loadDefaultForm(){
        const typeName = {
            s: 12,
            label:"Type name",
            style: {
                margin: "0px 0px 40px 0px",
            }
        }

        const minTemp = {
            s: 6,
            label:"Min. temperature",
            style: {
                margin: "0px 0px 40px 0px",
            }
        }

        const maxTemp = {
            s: 6,
            label:"Max. temperature",
            style: {
                margin: "0px 0px 40px 0px",
            }
        }

        const minMoisture = {
            s: 6,
            label:"Min. moisture",
            style: {
                margin: "0px 0px 40px 0px",
            }
        }

        const maxMoisture = {
            s: 6,
            label:"Max. moisture",
            style: {
                margin: "0px 0px 40px 0px",
            }
        }



        return(
            <Row>
                <Input {...typeName} onChange={this.handleNameChange}/>
                <Input {...maxTemp} onChange={this.handleMaxTempChange}/>
                <Input {...minTemp} onChange={this.handleMinTempChange}/>
                <Input {...maxMoisture} onChange={this.handleMaxMoistureChange}/>
                <Input {...minMoisture} onChange={this.handleMinMoistureChange}/>
            </Row>
        )

    }


    /**
     * The following section handles all handling of input from thee name field
     * Note: The binding
     */
    handleNameChange(event){
        this.setState({
            name: event.target.value,
        })
    }

    handleMaxTempChange(event){
        this.setState({
            max_temp: event.target.value,
        })
    }

    handleMinTempChange(event){
        this.setState({
            min_temp: event.target.value,
        })
    }

    handleMaxMoistureChange(event){
        this.setState({
            max_moisture: event.target.value,
        })
    }

    handleMinMoistureChange(event){
        this.setState({
            min_moisture: event.target.value,
        })
    }

    render() {
        return (
            <div>
                <Card style={style.cardStyle}>
                    <h3>Add plant type</h3>
                    <div style={style.divider}/>
                    {this.loadDefaultForm()}
                    <Button {...style.cancelButtonStyle} onClick={this.props.handleCancelButton}>Cancel</Button>
                    <Button {...style.confirmButtonStyle} onClick={(returnProps) => this.props.handleConfirmButton(this.state)}>Confirm</Button>
                </Card>

            </div>
        )
    }


};

export default TypeAddCard;