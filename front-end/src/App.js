import React, {Component} from 'react';
import './CSS/App.css';
import Sidebar from './Navigation/sidebar';
import MaterialTitlePanel from './Navigation/material_title_panel';
import SidebarContent from './Navigation/sidebar_content';
import CardArea from './Cards/card_area';
import RoomCard from './Cards/room_add_card';
import TypeAddCard from './Cards/add_plant_type_card';
import PlantAddCard from './Cards/add_plant';
import Overlay from './StyleComponents/overlay'
import configData from './config.json';
import PlantConfigCard from './Cards/plant_configuration_card';
import {Button} from 'react-materialize';



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


// stuffs
let App = React.createClass({

    /*
    Set the initial states of the component. Acts as a constructor in this case, since this
    is the main component of the system.
     */
    getCardAreaContent(){
        const cardAreaContent = [];

        const cardAreaProps = {
            key: '1',
            handleConfigureEvent: this.handleConfigureEvent,
            handleWaterEvent: this.handleWaterEvent,
            roomFilter: this.state.roomFilter,
            data: this.state.plantData,
            rooms: this.state.roomData,

            styles: {
                padding: "10px 10px 0px",
            }
        };


        cardAreaContent.push(<CardArea {...cardAreaProps}/>)

        //Check if something other than cardarea got focus:
        if(this.checkOtherProcedures()){

            cardAreaContent.push(<Overlay
                key="2"
                handleCancelButton={this.handleCancelButton}
            />);


            if(this.state.renderConfigCard){
                cardAreaContent.push(<PlantConfigCard
                    key="3"
                    plantProps={this.state.plantConfig}
                    roomData={this.state.roomData}
                    typeData={this.state.typeData}
                    handleCancelButton={this.handleCancelButton}
                    handleConfirmButton={this.handleConfigConfirmButton}
                />);
            }

            else if(this.state.renderPlantAddCard){
                cardAreaContent.push(
                    <PlantAddCard
                        key="3"
                        roomData={this.state.roomData}
                        typeData={this.state.typeData}
                        handleCancelButton={this.handleCancelButton}
                        handleConfirmButton={this.addPlantData}
                    />
                )

            }

            else if(this.state.renderRoomAddCard){
                cardAreaContent.push(
                    <RoomCard
                        key="3"
                        handleCancelButton={this.handleCancelButton}
                        handleConfirmButton = {this.addRoomData}
                    />
                )
            }

            else if(this.state.renderTypeAddCard){
                cardAreaContent.push(
                    <TypeAddCard
                        key = "3"
                        handleCancelButton = {this.handleCancelButton}
                        handleConfirmButton = {this.addTypeData}
                    />
                )
            }
        }

        return cardAreaContent;

    },

    handleCancelButton(){
        this.setState({
            renderConfigCard: false,
            renderTypeAddCard: false,
            renderRoomAddCard: false,
            renderPlantAddCard: false,
            plantConfig: undefined,
        })
    },

    handleConfigConfirmButton(returnProps){

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
        if(!this.checkOtherProcedures()) {
            this.setState({
                renderConfigCard: true,
                plantConfig: this.state.plantData[plantCardProps.id - 1],
            })
        }
    },

    //Triggered when the 'add new room' button is pressed on the fixed add button.
    handleAddNewRoomEvent(){
        if(!this.checkOtherProcedures()){
            this.setState({
                renderRoomAddCard: true,
            })
        }
    },

    handleAddNewTypeEvent(){
        if(!this.checkOtherProcedures()){
            this.setState({
                renderTypeAddCard: true,
            })
        }
    },

    handleNewPlantEvent(){
        if(!this.checkOtherProcedures()){
            this.setState({
                renderPlantAddCard: true,
            })
        }
    },


    /**
     * Check if some other procedure is active. For example addRoom or configure plant
     * @returns {boolean}: True if some other card is active, otherwise false
     */
    checkOtherProcedures(){
        return(
                this.state.renderConfigCard ||
                this.state.renderPlantAddCard ||
                this.state.renderTypeAddCard ||
                this.state.renderRoomAddCard
        )
    },

    getInitialState(){
        return {
            docked: false,
            open: false,
            plantData: [],
            roomData: [],
            roomFilter: -1,
            renderConfigCard: false,
            renderTypeAddCard: false,
            renderPlantAddCard: false,
            renderRoomAddCard: false,
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
                self.setState({
                    roomData: res.body,
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
        if(roomName !== undefined) {
            const roomData = {
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
        }

        this.handleCancelButton();
    },

    addTypeData(props){
        if(props.name !== undefined) {

            //POST data to the server over the REST API.
            var request = require('superagent');
            const self = this;
            request
                .post(configData.serverConfig.baseUrl + configData.serverConfig.port + configData.serverConfig.typesEndpoint)
                .send(props)
                .end(function () {
                    self.getTypeData();
                })
        }

        this.handleCancelButton();
    },

    addPlantData(props){
        console.log(props);

        const POST_Props={
            name: props.plantName,
            room: props.plantRoom,
            plant_type: props.plantType,
            automatic_water: props.autoWater,
        };

        if(POST_Props.name !== undefined) {
            //POST data to the server over the REST API.
            var request = require('superagent');
            const self = this;
            request
                .post(configData.serverConfig.baseUrl + configData.serverConfig.port + configData.serverConfig.plantEndpoint)
                .send(POST_Props)
                .end(function () {
                    self.getPlantData();
                })
        }

        this.handleCancelButton();
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

        const addroom = {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '280px',
            zIndex: 2
        }

        const addplant = {
            position: 'fixed',
            bottom: '70px',
            right: '20px',
            width: '280px',
            zIndex: 2
        }

        const addType = {
            position: 'fixed',
            bottom: '120px',
            right: '20px',
            width: '280px',
            zIndex: 2
        }


        return (
            <Sidebar {...sidebarProps}>
                <MaterialTitlePanel title={contentHeader}>
                    {this.getCardAreaContent()}
                    <Button style={addroom} onClick={this.handleAddNewRoomEvent}>Prototyping: addroom</Button>
                    <Button style={addplant} onClick={this.handleNewPlantEvent}>Prototyping: addPlant</Button>
                    <Button style={addType} onClick={this.handleAddNewTypeEvent}>Prototyping: addType</Button>
                </MaterialTitlePanel>
            </Sidebar>
        );
    }
});

export default App;

/*



















asdasd
 */