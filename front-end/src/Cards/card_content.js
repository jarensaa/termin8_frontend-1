/**
 * Created by Jens-Andreas on 06-Apr-17.
 */
import React from 'react';
import Button from 'react-materialize';

const PlantContent = React.createClass({

    render(){
        return(
            <div>
                <Button waves='light' margin="5px">button</Button>
                <Button waves='light'>button</Button>
                <Button waves='light'>button</Button>
            </div>
        )
    }

});

export default PlantContent;
