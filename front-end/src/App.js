import React, {Component} from 'react';
import './CSS/App.css';
import Sidebar from './Navigation/sidebar';
import MaterialTitlePanel from './Navigation/material_title_panel';
import SidebarContent from './Navigation/sidebar_content';
import CardArea from './Cards/card_area';



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
            data: [],
            roomFilter: -1,
        };
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


        /*GET plant data from server with superagent framework

        Key concept: Call the GET to the server, then render the area. Since no data has been recieved yet,
        a progress bar will be rendered instead of the plant-cards. Once data is recieved from the server, the
        self.setState method is called, triggering the re-rendering of the area.

         */
        var request = require('superagent');
        const self = this;
        request
            .get('http://localhost:4000/plants')
            .end(function (err, res) {
                self.setState({
                    data: res.body
                });
            })
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
            data: this.state.data,
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
            data: this.state.data,
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