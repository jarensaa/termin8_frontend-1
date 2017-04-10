/**
 * Created by Jens-Andreas on 04-Apr-17.
 */
import React from 'react';
import Logo from '../Termin8_logo.svg';

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
};

class SidebarContent extends React.Component{
    render(){
        const style = this.props.style ? {...styles.sidebar, ...this.props.style} : styles.sidebar;

        const rooms = [];
        const sidebarContent = [];

        //The data property is passed from from the server through a GET in App.js.
        if(this.props.roomData.length > 0){

            for(let i = 0; i < this.props.roomData.length; i++){
                let currentRoom = this.props.roomData[i];

                //If the room does not exist...
                if(rooms[currentRoom.id] === undefined){
                    //... add it to the dict for further identification...
                    rooms[currentRoom.id] = currentRoom.name;

                    //...determine if the button for the room is active...
                    let style = styles.sidebarLink;
                    if(currentRoom.id === this.props.activeButton){
                        style = styles.activeSidebarLink;
                    }

                    //...then add it to the sidebar.
                    sidebarContent.push(
                        <a key={currentRoom.id}
                           href="#"
                           style={style}
                           onClick={(props) => this.props.filterCards(currentRoom.id)}
                        >{currentRoom.name}</a>
                    )

                }
            }
        }

        //Determine if home is active. Set style accordingly.
        let homeStyle = styles.sidebarLink;
        if(this.props.activeButton === -1){
           homeStyle = styles.activeSidebarLink;
        }


        return (
            <div style={style}>
                <img src={Logo} style={styles.image}/>
                <a onClick={(props) => this.props.filterCards(-1)} href="#" style={homeStyle}>Home</a>
                <div style={styles.divider} />
                {sidebarContent}
            </div>

        );
    }
};



SidebarContent.propTypes = {
    style: React.PropTypes.object,
};

export default SidebarContent;