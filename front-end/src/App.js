import React, {Component} from 'react';
import './App.css';
import Sidebar from './sidebar';
import MaterialTitlePanel from './material_title_panel';
import SidebarContent from './sidebar_content';
import CardArea from './Cards/card_area';


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
            filterActive: false,
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


    render: function () {
        const sidebar = <SidebarContent />;

        const contentHeader = (
            <span>
                {!this.state.docked &&
                <a onClick={this.toggleOpen} href="#" style={styles.contentHeaderMenuLink}>=</a>}
                <span> My Plants</span>
            </span>
        );

        const sidebarProps = {
            sidebar: sidebar,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen,
        };

        const self = this;

        if(this.state.data.length > 0){
            return (
                <Sidebar {...sidebarProps}>
                    <MaterialTitlePanel title={contentHeader}>
                        <CardArea {...self.state}/>
                    </MaterialTitlePanel>
                </Sidebar>
            );
        }

        return( <div>
                    <div> Loading....</div>
                    <div> If you can see this, there is probably no connection with the server.</div>
                </div>
            )


    }
});

export default App;