/**
 * Created by Jens-Andreas on 06-Apr-17.
 */
import React from 'react';
import PlantCard from './plant_card';
import {Preloader} from 'react-materialize';

const PreloaderStyle = {
    position: 'fixed',
    left: '50%',
    top: '50%'
};

class CardArea extends React.Component {

    render() {
        if (this.props.data.length === 0 || this.props.rooms.length === 0 || this.props.types.length === 0) {

            return (
                <div style={PreloaderStyle}>
                    <Preloader size="big" flashing/>
                </div>
            )
        }

        let plants = [];

        for (let i = 0; i < this.props.data.length; i++) {
            const plant = this.props.data[i];
            const room = this.props.rooms[plant.room-1];

            let plantColor = "green";

            //TODO: Remove when watering logic is implemented
            if (plant.id % 3 === 0) {
                plantColor = "yellow";
            } else if (plant.id % 5 === 0) {
                plantColor = "red";
            }

            const plantProps = {
                color: plantColor,
                room: room,
                key: plant.id,
                id: plant.id,
                name: plant.name,
                type: plant.plant_type,
                handleConfigureEvent: this.props.handleConfigureEvent,
                handleWaterEvent: this.props.handleWaterEvent,
            }

            if (this.props.roomFilter === -1 && this.props.typeFilter === -1) {
                plants.push(<PlantCard {...plantProps}/>);
            } else {
                if (plant.room === this.props.roomFilter)
                    plants.push(<PlantCard {...plantProps}/>);
                else if(plant.plant_type.id === this.props.typeFilter)
                    plants.push(<PlantCard {...plantProps}/>);
            }
        }


        return (
            <div style={this.props.styles}>
                {plants}
            </div>

        )

    }


}

export default CardArea;