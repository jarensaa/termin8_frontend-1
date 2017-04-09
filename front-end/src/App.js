import React, {Component} from 'react';
import './CSS/App.css';
import Sidebar from './Sidebar/sidebar';
import MaterialTitlePanel from './material_title_panel';
import SidebarContent from './Sidebar/sidebar_content';
import CardArea from './Cards/card_area';


//This is a change.

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

    getInitialState(){
        return {
            docked: false,
            open: false,
            data: [],
            roomFilter: -1,
        };
    },

    componentWillMount() {
        const mql = window.matchMedia(`(min-width: 1000px)`);
        mql.addListener(this.mediaQueryChanged);
        this.setState({
            mql: mql,
            docked: mql.matches,
        });

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


        const sidebarProps = {
            sidebar: <SidebarContent filter={this.filterCards}/>,
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