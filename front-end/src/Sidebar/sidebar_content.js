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

    constructor(props){
        super(props);
        this.state = {
            filter: this.props.filter,
        }
    }

    render(){
        const style = this.props.style ? {...styles.sidebar, ...this.props.style} : styles.sidebar;

        const links = [];

        for (let ind = 0; ind < 10; ind++) {
            links.push(
                <a key={ind} href="#" style={styles.sidebarLink} id={ind} onClick={(props) => this.props.filter(ind)}>Room {ind}</a>);
        }

        return (
            <div style={style}>
                <img src={Logo} style={styles.image}/>
                <a onClick={(props) => this.props.filter(-1)} href="#" style={styles.sidebarLink}>Home</a>
                <div style={styles.divider} />
                {links}
            </div>

        );
    }
};



SidebarContent.propTypes = {
    style: React.PropTypes.object,
};

export default SidebarContent;