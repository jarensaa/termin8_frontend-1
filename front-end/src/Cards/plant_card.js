/**
 * Created by Jens-Andreas on 06-Apr-17.
 */
import React from 'react';
import {Card, Button, Icon} from 'react-materialize';

const style = {

    content: {
        padding: '0px 10px 0px 10px',
        width: '400px',
        float: 'left',
    },

    divider: {
        margin: '25px 0px 8px 0px',
        height: 1,
        backgroundColor: '#757575',
    },

    cardStyle: {
        className: 'green lighten-3',
        textClassName: 'gray-text',
        title: 'Card title',
        style: {
            width: "380px",
            height: "235px",
        }
    },
    configureButtonStyle: {
        waves: 'light',
        className: 'green lighten-2',
        style: {
            position: 'absolute',
            bottom: '20px',
            width: '150px',
            zIndex: 1,
        }
    },

    waterButtonStyle: {
        waves: 'light',
        className: 'green lighten-2',
        style: {
            position: 'absolute',
            bottom: '20px',
            right: '25px',
            width: '150px',
            zIndex: 1,
        }
    },

    grayConfigureButtonStyle: {
        waves: 'light',
        className: 'grey lighten-2',
        style: {
            position: 'absolute',
            bottom: '20px',
            width: '150px',
            zIndex: 1,
        }
    },

    grayWaterButtonStyle: {
        waves: 'light',
        className: 'grey lighten-2',
        style: {
            position: 'absolute',
            bottom: '20px',
            right: '25px',
            width: '150px',
            zIndex: 1,
        }
    },

    grayCardStyle: {
        className: 'grey lighten-3',
        textClassName: 'gray-text',
        title: 'Unconfigured plant',
        style: {
            width: "380px",
            height: "235px",
        }
    },

    roomFieldStyle: {
        style: {
            fontSize: '25px',
            color: '#424242',
            display: 'inline-block',
            width: '80px'
        }
    },

    iconStyle: {
        style: {
            padding: '50px 10px 0px 0px',
            color: '#424242',
            position: 'relative',
            bottom: '-5px'
        }
    },

    internalCardStyle: {
        style: {
            height: '45px',
            padding: '5px',
        }
    },

    internalCardFields: {
        style: {
            height: '45px',
            position: 'absolute',
            top: '5px'
        }
    },

    titleProps: {
        style: {
            color: '#424242'
        }
    }

}

const PlantCard = (props) => {

    function handleConfigureClick() {
        props.handleConfigureEvent(props);
    }

    function handleWaterClick() {
        props.handleWaterEvent(props);
    }

    function renderReveal() {
        return (
            <div>Here is the card back</div>
        )
    }

    if (props.room === undefined || props.type === undefined || props.name === undefined) {
        return (
            <div style={style.content}>
                <Card {...style.grayCardStyle}>
                    <div>This plant needs configuring.</div>
                    <div style={style.divider}/>
                    <Button {...style.grayConfigureButtonStyle} onClick={handleConfigureClick}>Configure</Button>
                    <Button {...style.grayWaterButtonStyle} onClick={handleWaterClick}>Water</Button>
                </Card>
            </div>
        )
    }

    else {

        if (props.color === "yellow") {
            style.cardStyle.className = 'amber lighten-3';
            style.configureButtonStyle.className = 'amber lighten-2';
            style.waterButtonStyle.className = 'amber lighten-2';

        } else if (props.color === "red") {
            style.cardStyle.className = 'red lighten-3';
            style.waterButtonStyle.className = 'red lighten-2';
            style.configureButtonStyle.className = 'red lighten-2';
        } else {
            style.cardStyle.className = 'green lighten-3';
            style.waterButtonStyle.className = 'green lighten-2';
            style.configureButtonStyle.className = 'green lighten-2';
        }

        style.cardStyle.title = <a {...style.titleProps}>{props.name}</a>;
        style.internalCardStyle.className = style.cardStyle.className;
    }

    return (
        <div style={style.content}>
            <Card
                {...style.cardStyle}
                reveal={renderReveal()}
            >
                <Card {...style.internalCardStyle}>
                    <div {...style.internalCardFields}>
                        <a {...style.roomFieldStyle}>Room</a>
                        <a {...style.iconStyle}><Icon>label</Icon></a>
                        <a {...style.roomFieldStyle}>{props.room.name}</a>
                    </div>
                </Card>
                <Card {...style.internalCardStyle}>
                    <div {...style.internalCardFields}>
                        <a {...style.roomFieldStyle}>Type</a>
                        <a {...style.iconStyle}><Icon>label</Icon></a>
                        <a {...style.roomFieldStyle}>{props.type.name}</a>
                    </div>
                </Card>

                <Button {...style.configureButtonStyle} onClick={handleConfigureClick}>Configure</Button>
                <Button {...style.waterButtonStyle} onClick={handleWaterClick}>Water</Button>
            </Card>
        </div>
    )

};

export default PlantCard;
