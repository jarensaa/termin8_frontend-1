import React, {Component} from 'react';
import './App.css';
import Sidebar from './sidebar';
import MaterialTitlePanel from './material_title_panel';
import SidebarContent from './sidebar_content';
import PlantCard from './Cards/plant_card';
import CardContent from './Cards/card_content';


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
const App = React.createClass({
    getInitialState(){
        return {docked: false, open: false};
    },

    componentWillMount() {
        const mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql, docked: mql.matches});
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


    render: function () {

        const sidebar = <SidebarContent />;
        const card = <CardContent/>;

        const contentHeader = (
            <span>
                {!this.state.docked &&
                <a onClick={this.toggleOpen} href="#" style={styles.contentHeaderMenuLink}>=</a>}
                <span> Termin8 perfect plant watering system</span>
            </span>
        );

        const sidebarProps = {
            sidebar: sidebar,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen,
        };

        const cardProps = {
            cards: card
        }

        return (
            <Sidebar {...sidebarProps}>
                <MaterialTitlePanel title={contentHeader}>
                    Hi!
                    /*<PlantCard {...cardProps} />*/
                </MaterialTitlePanel>
            </Sidebar>
        );
    }
});

export default App;
