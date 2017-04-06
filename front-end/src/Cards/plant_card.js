/**
 * Created by Jens-Andreas on 06-Apr-17.
 */
import React from 'react';
import {Card, Button} from 'react-materialize';

const defaultStyles = {
    dimensions: {
        padding: '16px',
        height: '400px',
        width: '400px',
    },
}

class PlantCard extends React.createClass{
    /*constructor(props){
        super(props);
    }*/



   render() {
       return(
           <div style={defaultStyles.dimensions}>
               <Card class="card small" className='blue-grey darken-1' textClassName='white-text' title='Card title'>
                     /*actions={this.props.cards}>*/
                   I am a very simple card.
               </Card>
           </div>
       );
   }
};

export default PlantCard;
