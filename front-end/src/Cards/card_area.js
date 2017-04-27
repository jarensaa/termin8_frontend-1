/**
 * Created by Jens-Andreas on 06-Apr-17.
 */
import React from 'react';
import PlantCard from './plant_card';
import {Preloader} from 'react-materialize';
import configData from '../config.json';


const PreloaderStyle = {
    position: 'fixed',
    left: '45%',
    top: '45%'
};

class CardArea extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            waterData: undefined,
            sensorData: undefined
        }

        this.getSensorHistory();
        this.getWaterHistory();
    }

    getRoom(plantRoomID,rooms){
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i].id === plantRoomID)
                return rooms[i];
        }
    }

    getType(plantTypeID,types){
        for(let i = 0; i < types.length;i++){
            if(types[i].id === plantTypeID){
                return types[i];
            }
        }
    }



    getWaterHistory(){
        console.log("GET: " + configData.serverConfig.baseUrl + configData.serverConfig.port + configData.serverConfig.wateringHistoryEndpoint);
        var request = require('superagent');
        const self = this;
        request
            .get(configData.serverConfig.baseUrl + configData.serverConfig.port + configData.serverConfig.wateringHistoryEndpoint)
            .end(function (err, res) {
                console.log("RESPONSE:");
                console.log(res);
                if(res !== undefined) {
                    self.setState({
                        waterData: res.body,
                    });
                }
            })
    }


    getSensorHistory(){
        console.log("GET: " + configData.serverConfig.baseUrl + configData.serverConfig.port + configData.serverConfig.sensorHistoryEndpoint);
        var request = require('superagent');
        const self = this;
        request
            .get(configData.serverConfig.baseUrl + configData.serverConfig.port + configData.serverConfig.sensorHistoryEndpoint)
            .end(function (err, res) {
                console.log("RESPONSE:");
                console.log(res);
                if(res !== undefined) {
                    self.setState({
                        sensorData: res.body,
                    });
                }
            })
    }

    getWaterDataWithID(Data,ID){
        let returnData = [];
        if(Data !== undefined){
            for(let i = 0; i < Data.length; i++){
                if(Data[i].plant === ID){
                    returnData.push(Data[i]);
                }
            }
        }

        return returnData;
    }

    getSensorDataWithID(Data, ID){
        let returnData = [];
        if(Data !== undefined){
            for(let i = 0; i < Data.length; i++){
                if(Data[i].plant_id === ID){
                    returnData.push(Data[i]);
                }
            }
        }
        return returnData;
    }

    render() {
        if (this.props.data.length === 0 || this.props.rooms.length === 0 || this.props.types.length === 0) {

            return (
                <div style={PreloaderStyle}>
                    <Preloader size="big" flashing/>
                </div>
            )
        }


        let plants = [];

        for (let i = 0; i < this.props.data.length; i++) {
            const plant = this.props.data[i];
            const room = this.getRoom(plant.room,this.props.rooms);
            const type = this.getType(plant.plant_type,this.props.types);

            const plantProps = {
                key: i,
                room: room,
                type: type,
                plant: plant,
                handleConfigureEvent: this.props.handleConfigureEvent,
                handleWaterEvent: this.props.handleWaterEvent,
                getPlantData: this.props.getPlantData,
                waterData: this.getWaterDataWithID(this.state.waterData, plant.id),
                sensorData: this.getSensorDataWithID(this.state.sensorData, plant.id)
            };

            if (this.props.roomFilter === -1 && this.props.typeFilter === -1) {
                plants.push(<PlantCard {...plantProps}/>);
            } else {
                if (plant.room === this.props.roomFilter)
                    plants.push(<PlantCard {...plantProps}/>);
                else if(plant.plant_type === this.props.typeFilter)
                    plants.push(<PlantCard {...plantProps}/>);
            }
        }



        return (
            <div style={this.props.styles}>
                {plants}
            </div>

        )

    }


}

export default CardArea;