/**
 * Created by Jens-Andreas on 06-Apr-17.
 */
import React from 'react';
import {Card, Button} from 'react-materialize';

const style = {
    content: {
        padding: '16px',
        width: '400px',
        float: 'left',
    },
    divider: {
        margin: '8px 0',
        height: 1,
        backgroundColor: '#757575',
    },
    cardStyle: {
        className: 'green lighten-3',
        textClassName: 'gray-text',
        title: 'Card title',
    },
    buttonStyle: {
        waves: 'light',
        className: 'green lighten-2',
        style: {
            margin: "10px",
        }
    },
}

const PlantCard = (props) => {

       return(
           <div style={style.content}>
               <Card {...style.cardStyle}>
                   <div style={props}>
                       About the plant
                       <div style={style.divider} />
                       <Button {...style.buttonStyle}>Configure</Button>
                       <Button {...style.buttonStyle}>Water</Button>
                   </div>
               </Card>
           </div>
       )
};

export default PlantCard;
