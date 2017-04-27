/**
 * Created by Jens-Andreas on 25-Apr-17.
 */
import React from 'react';
import {Legend, Line,LineChart, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


const newData = [
    {time: "10", moisture: 500, Temperature: 20},
    {time: "20", moisture: 550, Temperature: 26},
    {time: "30", moisture: 600, Temperature: 30}
]

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
                moisture:  this.props.sensorData[i].moisture,
                Temperature:  this.props.sensorData[i].temp
            }
        }

        return returnData;
    }

    render(){
        console.log(this.getData());
        console.log(newData);
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
            </div>
        );
    }


}


export default GraphArea;