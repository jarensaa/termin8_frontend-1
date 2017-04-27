/**
 * Created by Jens-Andreas on 25-Apr-17.
 */
import React from 'react';
import {Legend, Line,LineChart, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const data = [
    {name: 'Page A', moisture: 4000, Temperature: 2400, amt: 2400},
    {name: 'Page B', moisture: 3000, Temperature: 1398, amt: 2210},
    {name: 'Page C', moisture: 2000, Temperature: 9800, amt: 2290},
    {name: 'Page D', moisture: 2780, Temperature: 3908, amt: 2000},
    {name: 'Page E', moisture: 1890, Temperature: 4800, amt: 2181},
    {name: 'Page F', moisture: 2390, Temperature: 3800, amt: 2500},
    {name: 'Page G', moisture: 3490, Temperature: 4300, amt: 2100},
];


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

    getMoistureData(){
        let returnData = []
        return data;
    }

    getTempratureData(){
        return data;
    }

    render(){
        return (
            <div>
                <h4>Data</h4>
                <LineChart width={600} height={300} data={data}
                          margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line yAxisId="left" dataKey="Moisture" fill="#8884d8" />
                    <Line yAxisId="right" dataKey="Temperature" fill="#82ca9d" />
                </LineChart>
            </div>
        );
    }

}


export default GraphArea;