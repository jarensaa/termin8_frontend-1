import React from 'react';
import {Button} from 'react-materialize';
import plant from './ic_local_florist_white_48px.svg';

const iconStyle = {
    style: {
        position: "relative",
        top: "8px",
        height: "25px",
        width: "25px",

    }
};


const FixedActionButton = React.createClass({
  render: function() {
    return(
      <div>
        <Button fabClickOnly={false} floating icon='add' fab='vertical' className='red lighten-2' large style={{bottom: '45px', right: '24px'}}>
          <Button floating icon='turned_in_not' className='amber lighten-3' onClick={this.props.handleAddNewTypeEvent} title='Add type'/>
          <Button floating className='green lighten-3' onClick={this.props.handleNewPlantEvent} title='Add plant'><img src={plant} alt="" {...iconStyle}/></Button>
          <Button floating icon='home' className='light-blue lighten-3' onClick={this.props.handleAddNewRoomEvent} title='Add room'/>
        </Button>
      </div>
    )
  }
  });
export default FixedActionButton;

