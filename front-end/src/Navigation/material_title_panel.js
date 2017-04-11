/**
 * Created by Jens-Andreas on 04-Apr-17.
 */
import React from 'react';

const styles = {
    root: {
        fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
        fontWeight: 300,
    },
    header: {
        backgroundColor: '#ee6e73',
        color: 'white',
        padding: '16px',
        fontSize: '1.5em',
    },
};

const MaterialTitlePanel = (props) => {
    const rootStyle = props.style ? {...styles.root, ...props.style} : styles.root;

    return (
        <div style={rootStyle}>
            <div style={styles.header}>{props.title}</div>
            {props.children}
        </div>
    );
};

export default MaterialTitlePanel;