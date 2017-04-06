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

const plantValues = {
    waterLevel: 3,
    room: 2,

}

class CardArea extends React.Component{
    constructor(){
        super();
        this.state = { items: []};
    }

    componentDidMount() {
        //TODO Add REST API features here.
        /*
        Based on JSON data, set the correct plantValues of the plant.
         */
    }

    render() {
        return(
            <div style={styles.area}>
                <PlantCard {...plantValues}/>
                <PlantCard {...plantValues}/>
                <PlantCard {...plantValues}/>
                <PlantCard {...plantValues}/>
                <PlantCard {...plantValues}/>
                <PlantCard {...plantValues}/>
                <PlantCard {...plantValues}/>
                <PlantCard {...plantValues}/>
                <PlantCard {...plantValues}/>
                <PlantCard {...plantValues}/>
                <PlantCard {...plantValues}/>
                <PlantCard {...plantValues}/>
                <PlantCard {...plantValues}/>
                <PlantCard {...plantValues}/>
            </div>
        )
    }
}

export default CardArea;