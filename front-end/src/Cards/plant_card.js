/**
 * Created by Jens-Andreas on 06-Apr-17.
 */
import React from 'react';
import {Card, Button} from 'react-materialize';

const defaultStyles = {
    content: {
        padding: '16px',
        height: '400px',
        width: '400px',
    },
}

const PlantCard = React.createClass({
   render: function () {
       return(
           <div style={defaultStyles.content}>
               <Card class="card small" className='blue-grey darken-1' textClassName='white-text' title='Card title'
                     actions={[
                         <div>
                             <Button waves='light' margin="5px">button</Button>
                             <Button waves='light'>button</Button>
                             <Button waves='light'>button</Button>
                         </div>
                     ]}>
                   I am a very simple card.
               </Card>
           </div>
       );
   }
});

export default PlantCard;
