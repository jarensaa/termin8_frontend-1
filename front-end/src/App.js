import React, {Component} from 'react';
import './CSS/App.css';
import Sidebar from './Navigation/sidebar';
import MaterialTitlePanel from './Navigation/material_title_panel';
import SidebarContent from './Navigation/sidebar_content';
import CardArea from './Cards/card_area';
import configData from './config.json';
import PlantConfigCard from './Cards/plant_configuration_card';



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
    getCardAreaContent(){
        const content = [];
        const cardAreaProps = {
            handleConfigureEvent: this.handleConfigureEvent,
            handleWaterEvent: this.handleWaterEvent,
            roomFilter: this.state.roomFilter,
            data: this.state.plantData,
            rooms: this.state.roomData,

            styles: {
                padding: "10px 10px 0px",
                opacity: '1'
            }
        };

        if(this.state.renderConfigCard){
            cardAreaProps.styles.opacity = '.3';
            content.push(<CardArea key="1" {...cardAreaProps}/>);
            content.push(<PlantConfigCard
                key="2"
                plantProps={this.state.plantConfig}
                roomData={this.state.roomData}
                typeData={this.state.typeData}
                handleCancelButton={this.handleCancelButton}
                handleConfirmButton={this.handleConfirmButton}
            />);
        } else {
            content.push(<CardArea key="1" {...cardAreaProps}/>);
        }

        return content;
    },

    handleCancelButton(){
        this.setState({
            renderConfigCard: false,
            plantConfig: undefined,
        })
    },

    handleConfirmButton(returnProps){


        const PATCH_Props = {
            id: returnProps.plantId,
            name: returnProps.plantName,
            room: returnProps.plantRoom,
            plant_type: returnProps.plantType,
            automatic_water: returnProps.autoWater,
        }

        //PATCH data to the server over the REST API.
        var request = require('superagent');
        const self = this;
        request
            .patch(configData.serverConfig.baseUrl + configData.serverConfig.port + configData.serverConfig.plantEndpoint + "/" + PATCH_Props.id)
            .send(PATCH_Props)
            .end(function () {
                self.getPlantData();
            })
        this.handleCancelButton();
    },


    //Triggered when the "configure" button is pressed on a plant-card.
    handleConfigureEvent(plantCardProps){
        if(!this.state.renderConfigCard) {
            this.setState({
                renderConfigCard: true,
                plantConfig: this.state.plantData[plantCardProps.id - 1],
            })
        }
    },

    getInitialState(){
        return {
            docked: false,
            open: false,
            plantData: [],
            roomData: [],
            roomFilter: -1,
            roomKeyTracker: 0,
            renderConfigCard: false,
            plantConfig: undefined,
            typeData: [],
            typeKeyTracker: 0,
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

    getTypeData(){
        var request = require('superagent');
        const self = this;
        request
            .get(configData.serverConfig.baseUrl + configData.serverConfig.port + configData.serverConfig.typesEndpoint)
            .end(function (err, res) {

                let keyTracker = 0;
                for(let i = 0; i < res.body.length; i++){
                    if(res.body[i].id > keyTracker){
                        keyTracker = res.body[i].id;
                    }
                }

                self.setState({
                    typeData: res.body,
                    typeKeyTracker: keyTracker
                });
            })
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
        };


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
        this.getTypeData();
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


    //Triggered when the "water" button is pressed on a plant-card.
    handleWaterEvent(plantCardProps){
        console.log("Pressed the water button on plant with id:" + plantCardProps.id);
        //Send a POST to the server, then re-render the area.
        this.addRoomData("New Room");
    },

    //Triggered when a sidebar button is pressed. ID to filter on is thrown from the sidebar.
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
        };

        const sidebarProps = {
            sidebar: <SidebarContent {...sidebarContentProps}/>,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen,
        };

        return (
            <Sidebar {...sidebarProps}>
                <MaterialTitlePanel title={contentHeader}>
                    {this.getCardAreaContent()}
                </MaterialTitlePanel>
            </Sidebar>
        );
    }
});

export default App;

/*



















asdasd
 */