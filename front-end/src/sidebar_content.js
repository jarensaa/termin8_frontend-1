/**
 * Created by Jens-Andreas on 04-Apr-17.
 */
import React from 'react';
import Logo from './Termin8_logo.svg';

const styles = {
    sidebar: {
        width: 256,
        height: '100%',
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

const SidebarContent = (props) => {
    const style = props.style ? {...styles.sidebar, ...props.style} : styles.sidebar;

    const links = [];

    for (let ind = 0; ind < 10; ind++) {
        links.push(
            <a key={ind} href="#" style={styles.sidebarLink}>Room {ind}</a>);
    }

    return (
            <div style={style}>
                <img src={Logo} style={styles.image}/>
                <a href="index.html" style={styles.sidebarLink}>Home</a>
                <div style={styles.divider} />
                {links}
            </div>

    );
};

SidebarContent.propTypes = {
    style: React.PropTypes.object,
};

export default SidebarContent;