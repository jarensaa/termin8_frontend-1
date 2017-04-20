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
        width: "380px",
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


class TypeEditCard extends React.Component {

    constructor(props){
        super(props);

        let type = this.getType(props.typeEditId, props.types);

        this.state = {
            id: type.id,
            name: type.name,
            min_temp: type.min_temp,
            max_temp: type.max_temp,
            max_moisture: type.max_moisture,
            min_moisture: type.min_moisture,
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleMaxMoistureChange = this.handleMaxMoistureChange.bind(this);
        this.handleMinMoistureChange = this.handleMinMoistureChange.bind(this);
        this.handleMaxTempChange = this.handleMaxTempChange.bind(this);
        this.handleMinTempChange = this.handleMinTempChange.bind(this);
    }

    getType(id,types){
        for(let i = 0; i < types.length; i++){
            if(id === types[i].id){
                return types[i];
            }
        }

        return undefined
    }


    loadDefaultForm(){
        let typeName = {
            s: 12,
            label:"Type name",
            style: {
                margin: "0px 0px 40px 0px",
            }
        };

        if(this.state.name !== undefined){
            typeName.defaultValue = this.state.name;
        }



        let minTemp = {
            s: 6,
            label:"Min. temperature",
            style: {
                margin: "0px 0px 40px 0px",
            }
        }

        if(this.state.min_temp !== undefined){
            minTemp.defaultValue = this.state.min_temp;
        }

        let maxTemp = {
            s: 6,
            label:"Max. temperature",
            style: {
                margin: "0px 0px 40px 0px",
            }
        };

        if(this.state.max_temp !== undefined){
            maxTemp.defaultValue = this.state.max_temp;
        }

        let minMoisture = {
            s: 6,
            label:"Min. moisture",
            style: {
                margin: "0px 0px 40px 0px",
            }
        };

        if(this.state.min_moisture !== undefined){
            minMoisture.defaultValue = this.state.min_moisture;
        }

        let maxMoisture = {
            s: 6,
            label:"Max. moisture",
            style: {
                margin: "0px 0px 40px 0px",
            }
        };

        if(this.state.max_moisture !== undefined){
            maxMoisture.defaultValue = this.state.max_moisture;
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


    /**
     * Renders the HTML for the configuration card
     * @returns {HTML}
     */
    render() {
        return (
            <div>
                <Card style={style.cardStyle}>
                    <h3>Edit plant type</h3>
                    <div style={style.divider}/>
                    {this.loadDefaultForm()}
                    <Button {...style.cancelButtonStyle} onClick={this.props.handleCancelButton}>Cancel</Button>
                    <Button {...style.confirmButtonStyle} onClick={(returnProps) => this.props.handleConfirmButton(this.state)}>Confirm</Button>
                </Card>

            </div>
        )
    }


};

export default TypeEditCard;