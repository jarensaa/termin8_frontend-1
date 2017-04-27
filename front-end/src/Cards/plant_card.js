/**
 * Created by Jens-Andreas on 06-Apr-17.
 */
import React from 'react';
import {Card, Button, Modal} from 'react-materialize';
import configData from '../config.json';
import GraphArea from './graphArea';


const style = {

    content: {
        padding: '0px 0px 0px 10px',
        width: '100%',
        maxWidth: '400px',
        float: 'left',
    },

    divider: {
        margin: '25px 0px 8px 0px',
        height: 1,
        backgroundColor: '#757575',
    },

    cardStyle: {
        className: 'green lighten-3',
        textClassName: 'gray-text',
        title: 'Card title',
        style: {
            height: "235px",
        }
    },
    configureButtonStyle: {
        waves: 'light',
        className: 'green lighten-2',
        style: {
            position: 'absolute',
            bottom: '20px',
            maxWidth: '150px',
            width: "40%",
            zIndex: 1,
        }
    },

    waterButtonStyle: {
        waves: 'light',
        className: 'green lighten-2',
        style: {
            position: 'absolute',
            bottom: '20px',
            right: '25px',
            maxWidth: '150px',
            width: "40%",
            zIndex: 1,
        }
    },

    grayConfigureButtonStyle: {
        waves: 'light',
        className: 'grey lighten-2',
        style: {
            position: 'absolute',
            bottom: '20px',
            maxWidth: '150px',
            width: "40%",
            zIndex: 1,

        }
    },

    grayWaterButtonStyle: {
        waves: 'light',
        className: 'grey lighten-2',
        style: {
            position: 'absolute',
            bottom: '20px',
            right: '25px',
            maxWidth: '150px',
            width: "40%",
            zIndex: 1,
        }
    },

    grayCardStyle: {
        className: 'grey lighten-3',
        textClassName: 'gray-text',
        title: 'Unconfigured plant',
        style: {
            height: "235px",
        }

    },

    roomFieldStyle: {
        style: {
            fontSize: '20px',
            color: '#424242',
            display: 'inline-block',
            width: '70px',
            position: 'relative',
            left: "-15px"
        }
    },

    roomTextStyle: {
        style: {
            fontSize: '18px',
            color: '#424242',
            display: 'inline-block',
            width: '180px',
            position: 'relative',
        }
    },

    iconStyle: {
        style: {
            padding: '50px 10px 0px 0px',
            color: '#424242',
            position: 'relative',
            bottom: '-5px'
        }
    },

    internalCardStyle: {
        style: {
            height: '45px',
            padding: '5px',
        }
    },

    internalCardFields: {
        style: {
            height: '45px',
            position: 'absolute',
            top: '5px'
        }
    },

    titleProps: {
        style: {
            color: '#424242'
        }
    }

};




const PlantCard = (props) => {

    const OK_STATUS = 0;

    const YELLOW_STATUS = 1;
    const RED_STATUS = 2;

    const IS_HIGH = 1;
    const IS_LOW = 2;



    let plantStatus = {
        color: OK_STATUS,
        tempDirection: OK_STATUS,
        moistureDirection: OK_STATUS,
    };

    function handleConfigureClick() {
        props.handleConfigureEvent(props);
    }

    function handleWaterClick() {
        props.handleWaterEvent(props);
    }

    function getGraphButton() {
        const modalButtonStyle = {
            className: 'green lighten-2',
            style: {
                position: 'fixed',
                bottom: '5%',
                right: '5%'
            }
        };

        let GraphAreaProps = {
            waterData: props.waterData,
            sensorData: props.sensorData
        }

        if(props.plant.sensor_data.moisture !== undefined && props.plant.sensor_data.temp !== undefined){
            return(
                <Modal trigger={
                    <Button {...modalButtonStyle}>VIEW GRAPH</Button>
                    }>
                        <GraphArea {...GraphAreaProps}/>
                </Modal>
            );
        }
        return
    }

    function renderReveal(plantStatus) {

        const textStyle = {
            style: {
                fontSize: '18px',
                padding: '10px 0px 0px 0px',
            }
        };

        function getTempWarning(){

            let style = {
                color: 'green',
                fontSize: '13px'
            };


            let text = "Temperature is normal";

            if(plantStatus.color === RED_STATUS && plantStatus.tempDirection !== OK_STATUS){
                style.color = 'red';
            } else if(plantStatus.color === YELLOW_STATUS && plantStatus.tempDirection !== OK_STATUS){
                style.color = '#ffa000';
            }

            if(plantStatus.tempDirection === IS_HIGH){
                text = "WARNING: Temperature is HIGH"
            }
            else if(plantStatus.tempDirection === IS_LOW){
                text = "WARNING: Temperature is LOW"
            }

            return <div style={style}>{text}</div>

        }

        function getMoistureWarning() {
            let style = {
                color: 'green',
                fontSize: '13px'
            }

            let text = "Moisture is normal";

            if(plantStatus.color === RED_STATUS && plantStatus.moistureDirection !== OK_STATUS){
                style.color = 'red';
            }

            else if(plantStatus.color === YELLOW_STATUS && plantStatus.moistureDirection !== OK_STATUS){
                style.color = '#ffa000';
            }

            if(plantStatus.moistureDirection === IS_HIGH){
                text = "WARNING: Moisture is HIGH"
            }

            else if(plantStatus.moistureDirection === IS_LOW){
                text = "WARNING: Moisture is LOW"
            }

            return <div style={style}>{text}</div>
        }

        function cardBackContent(){
            if(props.plant.sensor_data.moisture === undefined && props.plant.sensor_data.temp === undefined){
                return (
                    <div>
                        <div>No tempratures or moisture data to show.</div>
                    </div>
                )
            }

            else if(plantStatus.color >= 0){
                return (
                    <div>
                        <div>
                            <div {...textStyle}>Plant moisture is {props.plant.sensor_data.moisture}</div>
                            {getMoistureWarning()}
                            <div {...textStyle}>Plant temprature is {props.plant.sensor_data.temp} degrees</div>
                            {getTempWarning()}
                        </div>
                    </div>
                )
            }
        }



        const deleteButtonProps = {
            onClick: deletePlant,
            className: 'red lighten-2',
            style: {
                position: 'fixed',
                bottom: '5%',
                width: '40%'
            }
        };
        


        return (
            <div>
                <div>
                    {cardBackContent()}
                </div>
                <Button {...deleteButtonProps}>DELETE</Button>
                {getGraphButton()}
            </div>
        )
    }


    function deletePlant() {
        var request = require('superagent');
        request
            .del(configData.serverConfig.baseUrl + configData.serverConfig.port + configData.serverConfig.plantEndpoint + props.plant.id + "/")
            .end(function () {
                props.getPlantData();
            });
    }


    if (props.room === undefined || props.type === undefined || props.plant.name === undefined) {
        return (
            <div style={style.content}>
                <Card {...style.grayCardStyle}>
                    <div>This plant needs configuring.</div>
                    <div style={style.divider}/>
                    <Button {...style.grayConfigureButtonStyle} onClick={handleConfigureClick}>Configure</Button>
                    <Button {...style.grayWaterButtonStyle} onClick={handleWaterClick}>Water</Button>
                </Card>
            </div>
        )
    }

    else {

        //Logic to determine the plant status and set the color of the plant

        if(props.plant.sensor_data.moisture !== undefined && props.plant.sensor_data.temp !== undefined){

            /**
             The following section is the locic to determin the color of the card based on moisture.
             Used props: Config.json, type reference levels, plant current props.
             */
            let redMoistureTreshhold = (Number(props.type.max_moisture) - Number(props.type.min_moisture)) * Number(configData.plantConfig.moistureRedLimit);
            let yellowMoistureTreshhold = (Number(props.type.max_moisture) - Number(props.type.min_moisture)) * Number(configData.plantConfig.moistureYellowLimit);

            if(Number(props.plant.sensor_data.moisture) > (Number(props.type.max_moisture) - Number(redMoistureTreshhold))){
                plantStatus.color = RED_STATUS;
                plantStatus.moistureDirection = IS_HIGH;
            }

            else if(Number(props.plant.sensor_data.moisture) < (Number(props.type.min_moisture) + Number(redMoistureTreshhold))){
                plantStatus.color = RED_STATUS;
                plantStatus.moistureDirection = IS_LOW;
            }
            else if(Number(props.plant.sensor_data.moisture) > (Number(props.type.max_moisture) - Number(yellowMoistureTreshhold))){
                plantStatus.color = YELLOW_STATUS;
                plantStatus.moistureDirection = IS_HIGH;
            }
            else if(Number(props.plant.sensor_data.moisture) < (Number(props.type.min_moisture) + Number(yellowMoistureTreshhold))){
                plantStatus.color = YELLOW_STATUS;
                plantStatus.moistureDirection = IS_LOW;
            }

            /**
             * Determine the card color, based on plant temprature
             */
            let redTempTreshhold = (props.type.max_temp - props.type.min_temp) * configData.plantConfig.tempRedLimit;
            let yellowTempTreshhold = (props.type.max_temp - props.type.min_temp) * configData.plantConfig.tempYellowLimit;

            if(Number(props.plant.sensor_data.temp) > (Number(props.type.max_temp) - Number(redTempTreshhold))){
                plantStatus.color = RED_STATUS;
                plantStatus.tempDirection = IS_HIGH;
            }

            else if(Number(props.plant.sensor_data.temp) < (Number(props.type.min_temp) + Number(redTempTreshhold))){
                plantStatus.color = RED_STATUS;
                plantStatus.tempDirection = IS_LOW;
            }
            else if(Number(props.plant.sensor_data.temp) > (Number(props.type.max_temp) - Number(yellowTempTreshhold))){
                plantStatus.color = YELLOW_STATUS;
                plantStatus.tempDirection = IS_HIGH;
            }
            else if(Number(props.plant.sensor_data.temp) < (Number(props.type.min_temp) + Number(yellowTempTreshhold))){
                plantStatus.color = YELLOW_STATUS;
                plantStatus.tempDirection = IS_LOW;
            }
        }


        if (plantStatus.color === YELLOW_STATUS) {
            style.cardStyle.className = 'amber lighten-3';
            style.configureButtonStyle.className = 'amber lighten-2';
            style.waterButtonStyle.className = 'amber lighten-2';

        } else if (plantStatus.color === RED_STATUS) {
            style.cardStyle.className = 'red lighten-3';
            style.waterButtonStyle.className = 'red lighten-2';
            style.configureButtonStyle.className = 'red lighten-2';
        } else {
            style.cardStyle.className = 'green lighten-3';
            style.waterButtonStyle.className = 'green lighten-2';
            style.configureButtonStyle.className = 'green lighten-2';
        }

        style.cardStyle.title = props.plant.name;
        style.internalCardStyle.className = style.cardStyle.className;
    }

    return (
        <div style={style.content}>
            <Card
                {...style.cardStyle}
                reveal={renderReveal(plantStatus)}
            >
                <Card {...style.internalCardStyle}>
                    <div {...style.internalCardFields}>
                        <a {...style.roomFieldStyle}>ROOM: </a>
                        <a {...style.roomTextStyle}>{props.room.name}</a>
                    </div>
                </Card>

                <Card {...style.internalCardStyle}>
                    <div {...style.internalCardFields}>
                        <a {...style.roomFieldStyle}>TYPE: </a>
                        <a {...style.roomTextStyle}>{props.type.name}</a>
                    </div>
                </Card>

                <Button {...style.configureButtonStyle} onClick={handleConfigureClick}>Configure</Button>
                <Button {...style.waterButtonStyle} onClick={handleWaterClick}>Water</Button>
            </Card>
        </div>
    )

};

export default PlantCard;
