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
        margin: '8px 0',
        height: 1,
        backgroundColor: '#757575',
    },
    greenCardStyle: {
        className: 'green lighten-3',
        textClassName: 'gray-text',
        title: 'Card title',
    },
    greenButtonStyle: {
        waves: 'light',
        className: 'green lighten-2',
        style: {
            margin: "10px",
        }
    },
    yellowCardStyle: {
        className: 'amber lighten-3',
        textClassName: 'gray-text',
        title: 'Card title',
    },
    yellowButtonStyle: {
        waves: 'light',
        className: 'amber lighten-2',
        style: {
            margin: "10px",
        }
    },
    redCardStyle: {
        className: 'red lighten-3',
        textClassName: 'gray-text',
        title: 'Card title',
    },
    redButtonStyle: {
        waves: 'light',
        className: 'red lighten-2',
        style: {
            margin: "10px",
        }
    },
    buttonStyle: {
    },
    cardStyle: {
        title: "Default",
    },
}

const PlantCard = (props) => {


        if(props.color === "green"){
            style.cardStyle = style.greenCardStyle;
            style.buttonStyle = style.greenButtonStyle
        } else if(props.color === "red"){
            style.cardStyle = style.redCardStyle;
            style.buttonStyle = style.redButtonStyle;
        } else {
            style.cardStyle = style.yellowCardStyle;
            style.buttonStyle = style.yellowButtonStyle;
        }

        style.cardStyle.title = props.name;

       return(
           <div style={style.content}>
               <Card {...style.cardStyle}>
                   <div>
                       This plant is located in room {props.roomName}
                       <div style={style.divider} />
                       <Button {...style.buttonStyle}>Configure</Button>
                       <Button {...style.buttonStyle}>Water</Button>
                   </div>
               </Card>
           </div>
       )
};

export default PlantCard;
