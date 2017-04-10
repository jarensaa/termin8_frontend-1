import React, {Component} from 'react';
import './CSS/App.css';
import Sidebar from './Navigation/sidebar';
import MaterialTitlePanel from './Navigation/material_title_panel';
import SidebarContent from './Navigation/sidebar_content';
import CardArea from './Cards/card_area';
import configData from './config.json';



// Some css overrides. Should probably by moved to the App.css.
const styles = {
    contentHeaderMenuLink: {
        textDecoration: 'none',
        color: 'white',
        padding: 8,
    },
    content: {
        padding: '16px',
        height: '400px',
        width: '400px',
    },
};

let App = React.createClass({

    /*
    Set the initial states of the component. Acts as a constructor in this case, since this
    is the main component of the system.
     */

    getInitialState(){
        return {
            docked: false,
            open: false,
            plantData: [],
            roomData: [],
            roomFilter: -1,
            roomKeyTracker: 0,
        };
    },

    getPlantData(){
        var request = require('superagent');
        const self = this;
        request
            .get(configData.serverConfig.baseUrl + configData.serverConfig.port + configData.serverConfig.plantEndpoint)
            .end(function (err, res) {
                self.setState({
                    plantData: res.body
                });
            })
    },

    getRoomData(){
        var request = require('superagent');
        const self = this;
        request
            .get(configData.serverConfig.baseUrl + configData.serverConfig.port + configData.serverConfig.roomEndpoint)
            .end(function (err, res) {

                let keyTracker = 0;
                for(let i = 0; i < res.body.length; i++){
                    if(res.body[i].id > keyTracker){
                        keyTracker = res.body[i].id;
                    }
                }

                self.setState({
                    roomData: res.body,
                    roomKeyTracker: keyTracker
                });
            })


    },

    getPlantTypes(){
        //TODO add this stuff
    },

    getWateringHistory(){
        //TODO add this stuff
    },

    getSensorHistory(){
        //TODO add this stuff
    },

    addRoomData(roomName){
        this.state.roomKeyTracker++;

        const roomData = {
            id: this.state.roomKeyTracker,
            name: roomName
        }


        //POST data to the server over the REST API.
        var request = require('superagent');
        const self = this;
        request
            .post(configData.serverConfig.baseUrl + configData.serverConfig.port + configData.serverConfig.roomEndpoint)
            .send(roomData)
            .end(function () {
                self.getRoomData();
            })
    },

    addPlantData(plantName,roomKey,plantType){
        //TODO add post request for add plant
    },

    addPlantType(typeName, maxTemp, minTemp, maxMoisture, minMoisture){
        //TODO add this stuff.
    },


    /*
    Called after the component is initalized, but right before it's rendered.
     */
    componentWillMount() {
        //Set the sidebar Props
        const mql = window.matchMedia(`(min-width: 1000px)`);
        mql.addListener(this.mediaQueryChanged);
        this.setState({
            mql: mql,
            docked: mql.matches,
        });

        //Get the initial data from the server.
        this.getPlantData();
        this.getRoomData();
    },


    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    },

    onSetOpen(open) {
        this.setState({open: open});
    },

    mediaQueryChanged() {
        this.setState({docked: this.state.mql.matches});
    },

    toggleOpen(ev) {
        this.setState({open: !this.state.open});

        if (ev) {
            ev.preventDefault();
        }
    },

    handleConfigureEvent(plantCardProps){
        console.log("Pressed the configure button on plant with id:" + plantCardProps.id);
        //Open configuration panel TODO: Make config planel
        this.addRoomData("Magic Room");
    },

    handleWaterEvent(plantCardProps){
        console.log("Pressed the water button on plant with id:" + plantCardProps.id);
        //Send a POST to the server, then re-render the area.
    },

    filterCards(filterOnID){
        this.setState({roomFilter: filterOnID});
    },


    render: function () {

        const contentHeader = (
            <span>
                {!this.state.docked &&
                <a onClick={this.toggleOpen} href="#" style={styles.contentHeaderMenuLink}>=</a>}
                <span> My Plants</span>
            </span>
        );


        const sidebarContentProps = {
            filterCards: this.filterCards,
            activeButton: this.state.roomFilter,
            roomData: this.state.roomData,
        }

        const sidebarProps = {
            sidebar: <SidebarContent {...sidebarContentProps}/>,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen,
        };

        const cardAreaProps = {
            handleConfigureEvent: this.handleConfigureEvent,
            handleWaterEvent: this.handleWaterEvent,
            roomFilter: this.state.roomFilter,
            data: this.state.plantData,
        }

        return (
            <Sidebar {...sidebarProps}>
                <MaterialTitlePanel title={contentHeader}>
                    <CardArea {...cardAreaProps}/>
                </MaterialTitlePanel>
            </Sidebar>
        );
    }
});

export default App;

/*



















asdasd
 */