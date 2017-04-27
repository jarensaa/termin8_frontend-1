import React from 'react';
import {Button} from 'react-materialize';
import plant from './ic_local_florist_white_48px.svg';

const iconStyle = {
    style: {
        height: "70%",
        width: "70%",
        top: "15%",
        left: "15%",
        position: 'fixed',
    }
}

const FixedActionButton = React.createClass({
  render: function() {
    return(
      <div>
        <Button floating icon='add' fab='vertical' className='red lighten-2' large style={{bottom: '45px', right: '24px'}}>
          <Button floating icon='turned_in_not' className='amber lighten-3' onClick={this.props.handleAddNewTypeEvent} title='Add type'/>
          <Button floating className='green lighten-3' onClick={this.props.handleNewPlantEvent} title='Add plant'></Button>
          <Button floating icon='home' className='light-blue lighten-3' onClick={this.props.handleAddNewRoomEvent} title='Add room'/>
        </Button>
      </div>
    )
  }
  });

//<img src={plant} alt="" {...iconStyle}/>
export default FixedActionButton;
