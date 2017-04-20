import React from 'react';
import {Button} from 'react-materialize';
import plant from './ic_local_florist_white_48px.svg';

const FixedActionButton = React.createClass({



  render: function() {
    return(
      <div>
        <Button floating fab='vertical' icon='menu' className='red lighten-2' large style={{bottom: '45px', right: '24px'}}>
          <Button floating icon='add' className='amber lighten-3' onClick={this.props.handleAddNewTypeEvent} title='Add type'/>
          <Button floating icon='plant'  className='green lighten-3' onClick={this.props.handleNewPlantEvent} title='Add plant'/>
          <Button floating icon='home' className='light-blue lighten-3' onClick={this.props.handleAddNewRoomEvent} title='Add room'/>
        </Button>
      </div>
    )
  }
  });


export default FixedActionButton;
