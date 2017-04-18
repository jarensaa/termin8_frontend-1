/**
 * Created by Jens-Andreas on 12-Apr-17.
 *
 * An overlay.  Covers the div, darkens it, and makes any buttons beneath unclickable.
 */

import React from 'react';

const overlayProps = {
    key: "2",
    style: {
        position:'fixed',
        top: "0px",
        width:'100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: '.4',
        zIndex: 2,
    }
}

const Overlay = (props) => {
    return <div {...overlayProps} onClick={props.handleCancelButton}>{props.content}</div>
}

export default Overlay
