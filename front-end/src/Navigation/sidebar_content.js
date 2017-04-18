/**
 * Created by Jens-Andreas on 04-Apr-17.
 */
import React from 'react';
import Logo from '../Termin8_logo.svg';
import {Button} from 'react-materialize';

const styles = {
    sidebar: {
        width: 256,
        height: '100%',
        backgroundColor: 'white',
    },
    sidebarLink: {
        display: 'block',
        padding: '16px 16px',
        color: '#757575',
        textDecoration: 'none',
    },
    activeSidebarLink: {
        display: 'block',
        padding: '16px 16px',
        color: 'white',
        textDecoration: 'none',
        backgroundColor: '#ee6e73',
    },
    divider: {
        margin: '8px 0',
        height: 1,
        backgroundColor: '#757575',
    },
    content: {
        padding: '16px',
        height: '100%',
        backgroundColor: 'white',
    },
    image: {
        width: 200,
        padding: '16px 16px',
    },
    deleteButtonStyle: {
        className: 'red lighten-2',
        waves: 'light',
        style: {
            margin: '0px 16px 16px 16px',
            width: '224px'
        }
    },
};

class SidebarContent extends React.Component {

    constructor(props) {
        super(props);
        this.turnOffFilter = this.turnOffFilter.bind(this);
        this.deleteSelected = this.deleteSelected.bind(this);
    }

    turnOffFilter() {
        this.props.filterCardsOnRoom(-1);
        this.props.filterCardsOnType(-1);
    }

    deleteSelected() {
        if (this.props.activeRoomButton !== -1) {
            this.props.deleteSelectedRoom(this.props.activeRoomButton);
        } else if (this.props.activeTypeButton !== -1) {
            this.props.deleteSelectedType(this.props.activeTypeButton);
        }
    }

    render() {
        const style = this.props.style ? {...styles.sidebar, ...this.props.style} : styles.sidebar;

        const rooms = [];
        const types = [];

        const roomContent = [];
        const typeContent = [];


        console.log(this.props);

        //The data property is passed from from the server through a GET in App.js.
        if (this.props.roomData.length > 0) {

            for (let i = 0; i < this.props.roomData.length; i++) {
                let currentRoom = this.props.roomData[i];

                //If the room does not exist...
                if (rooms[currentRoom.id] === undefined) {
                    //... add it to the dict for further identification...
                    rooms[currentRoom.id] = currentRoom.name;

                    //...determine if the button for the room is active...
                    let style = styles.sidebarLink;
                    if (currentRoom.id === this.props.activeRoomButton) {
                        style = styles.activeSidebarLink;
                    }

                    //...then add it to the sidebar.
                    roomContent.push(
                        <a key={currentRoom.id}
                           href="#"
                           style={style}
                           onClick={(props) => this.props.filterCardsOnRoom(currentRoom.id)}
                        >{currentRoom.name}</a>
                    )

                }
            }
        }


        if (this.props.typeData.length > 0) {

            for (let i = 0; i < this.props.typeData.length; i++) {
                let currentType = this.props.typeData[i];

                //If the room does not exist...
                if (types[currentType.id] === undefined) {
                    //... add it to the dict for further identification...
                    types[currentType.id] = currentType.name;

                    //...determine if the button for the room is active...
                    let style = styles.sidebarLink;
                    if (currentType.id === this.props.activeTypeButton) {
                        style = styles.activeSidebarLink;
                    }

                    //...then add it to the sidebar.
                    typeContent.push(
                        <a key={currentType.id}
                           href="#"
                           style={style}
                           onClick={(props) => this.props.filterCardsOnType(currentType.id)}
                        >{currentType.name}</a>
                    )

                }
            }
        }


        //Determine if home is active. Set style accordingly.
        let homeStyle = styles.sidebarLink;
        if (this.props.activeRoomButton === -1 && this.props.activeTypeButton === -1) {
            homeStyle = styles.activeSidebarLink;
        }


        return (
            <div style={style}>
                <div>
                    <img src={Logo} style={styles.image}/>
                    <a onClick={this.turnOffFilter} href="#" style={homeStyle}>Home</a>
                    <div style={styles.divider}/>
                    {roomContent}
                    <div style={styles.divider}/>
                    {typeContent}
                    <div style={styles.divider}/>
                    <Button
                        {...styles.deleteButtonStyle}
                        onClick={this.deleteSelected}
                    >Delete</Button>
                </div>
            </div>
        );
    }
}
;


SidebarContent.propTypes = {
    style: React.PropTypes.object,
};

export default SidebarContent;

/*




 asdsad

 asd
 asd
 a


 asd
 asd
 as
 d
 */