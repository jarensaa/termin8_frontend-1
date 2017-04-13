/**
 * Created by Jens-Andreas on 06-Apr-17.
 */
import React from 'react';
import {Card, Button} from 'react-materialize';

const style = {
    content: {
        padding: '0px 10px 0px 10px',
        width: '400px',
        float: 'left',
    },
    divider: {
        margin: '8px 0px',
        height: 1,
        backgroundColor: '#757575',
    },
    cardStyle: {
        className: 'green lighten-3',
        textClassName: 'gray-text',
        title: 'Card title',
        style: {
            width: "380px",
            height: "235px",
        }

    },
    configureButtonStyle: {
        waves: 'light',
        className: 'green lighten-2',
        style: {
            position: 'absolute',
            bottom: '20px',
            width: '150px'
        }
    },

    waterButtonStyle: {
        waves: 'light',
        className: 'green lighten-2',
        style: {
            position: 'absolute',
            bottom: '20px',
            right: '25px',
            width: '150px'
        }
    }

}

const PlantCard = (props) => {

    function handleConfigureClick() {
        props.handleConfigureEvent(props);
    }

    function handleWaterClick() {
        props.handleWaterEvent(props);
    }

    if (props.color === "yellow") {
        style.cardStyle.className = 'amber lighten-3';
        style.configureButtonStyle.className = 'amber lighten-2';
        style.waterButtonStyle.className = 'amber lighten-2';

    } else if (props.color === "red"){
        style.cardStyle.className = 'red lighten-3';
        style.waterButtonStyle.className = 'red lighten-2';
        style.configureButtonStyle.className = 'red lighten-2';
    } else {
        style.cardStyle.className = 'green lighten-3';
        style.waterButtonStyle.className = 'green lighten-2';
        style.configureButtonStyle.className = 'green lighten-2';
    }

    style.cardStyle.title = props.name;

    return (
        <div style={style.content}>
            <Card {...style.cardStyle}>
                This plant is located in {props.room.name}
                <div style={style.divider}/>
                <Button {...style.configureButtonStyle} onClick={handleConfigureClick}>Configure</Button>
                <Button {...style.waterButtonStyle} onClick={handleWaterClick}>Water</Button>
            </Card>
        </div>
    )
};

export default PlantCard;
