/**
 * Created by Jens-Andreas on 06-Apr-17.
 */
import React from 'react';
import Button from 'react-materialize';

const styles = {

}

const PlantContent = React.createClass({

    render(){
        return(
            <div>
                I am a very simple card.
                <div style={styles.divider} />
                <Button waves='light' margin="5px">button</Button>
                <Button waves='light'>button</Button>
                <Button waves='light'>button</Button>
            </div>
        )
    }

});

export default PlantContent;
