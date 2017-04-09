/**
 * Created by Jens-Andreas on 06-Apr-17.
 */
import React from 'react';
import PlantCard from './plant_card';


const styles = {
    area: {
        padding: "10px 10px 0px",
    }
}

class CardArea extends React.Component{

    render() {
        let plants = [];

        for(let i = 0; i < this.props.data.length; i++){
            const plant = this.props.data[i]
            let plantColor = "green";

            //TODO: Remove when watering logic is implemented
            let number = Math.floor(Math.random() * 10 + 1);
            if(number<2){
                plantColor = "yellow";
            } else if (number < 4){
                plantColor = "red";
            } else {
                plantColor = "green";
            }

            const plantProps = {
                color: plantColor,
                room: plant.room.id,
                key: plant.id,
                id: plant.id,
                name: plant.name,
                roomName: plant.room.name,
                handleConfigureEvent: this.props.handleConfigureEvent,
                handleWaterEvent: this.props.handleWaterEvent,
            }

            if(this.props.roomFilter === -1) {
                plants.push(<PlantCard {...plantProps}/>);
            } else {
                if (plant.room.id === this.props.roomFilter)
                    plants.push(<PlantCard {...plantProps}/>);
            }
        }


        return (
            <div style={styles.area}>
                {plants}
            </div>
        )
    }


}

export default CardArea;