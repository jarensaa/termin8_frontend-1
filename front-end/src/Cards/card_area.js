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
    constructor(props){
        super(props);
        this.state = {
            data: props.data,
            roomFilter: props.roomFilter,
            filterActive: props.filterActive,
        };
    }

    render() {
        let plants = [];

        for(let i = 0; i < this.state.data.length; i++){
            const plant = this.state.data[i]
            let plantColor = "green";

            //TODO: Remove when watering logic is implemented
            if(plant.id % 2 === 0){
                plantColor = "yellow";
            }


            const plantProps = {
                color: plantColor,
                room: plant.room.id,
                key: plant.id,
                id: plant.id,
                name: plant.name,
                roomName: plant.room.name,
            }

            plants.push(<PlantCard {...plantProps}/>);
        }


        return (
            <div style={styles.area}>
                {plants}
            </div>
        )
    }


}

export default CardArea;