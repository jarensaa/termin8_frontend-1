/**
 * Created by Jens-Andreas on 25-Apr-17.
 */
import React from 'react';
import {Legend, Line,LineChart, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

class GraphArea extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            show: {
                waterhistory: false,
                temprature: false,
                moisture: false,
            }
        }
    }



    stampToText(timeStamp){
        let splitTime = timeStamp.split("Z");
        splitTime = splitTime[0].split("T");
        let month = splitTime[0].split("-")[1];
        let day = splitTime[0].split("-")[2];
        return day + "/" + month + ": " + splitTime[1];
    }


    getData(){
        let returnData = [];
        for(let i = 0; i < this.props.sensorData.length; i++){
            returnData[i] = {
                time: this.stampToText(this.props.sensorData[i].timestamp),
                moisture:  Number(this.props.sensorData[i].moisture),
                Temperature:  Number(this.props.sensorData[i].temp)
            }
        }

        return returnData;
    }

    render(){
        return(
            <div>

                <h4>Data</h4>
                <LineChart width={800} height={300} data={this.getData()}
                           margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="time"/>
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line yAxisId="left" dataKey="moisture" fill="#8884d8"/>
                    <Line yAxisId="right" dataKey="Temperature" fill="#82ca9d" />
                </LineChart>
                <h5>Last watered: 2017-04-07 12:32:33</h5>
            </div>
        );
    }


}


export default GraphArea;