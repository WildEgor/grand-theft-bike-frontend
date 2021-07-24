import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";

import { rgba } from 'Utils/css-utils';
import theme from 'Style/theme';

const useStyles = makeStyles(theme => ({
    '@global': {
        a: {
            color: 'inherit', /* blue colors for links too */
            'text-decoration': 'inherit', /* no underline */
        },
        '*::-webkit-scrollbar': {
          width: '0.7em'
        },
        '*::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.secondary.light,
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.secondary.main,
          outline: '1px solid slategrey'
        }
    },
    whiteText:{
        color: theme.palette.common.white
    },
    blackText:{
        color: theme.palette.common.black
    },
    warningColorText:{
        color: theme.palette.warning.main
    },
    successColorText: {
        color: theme.palette.success.main
    },
    root: {
        backgroundColor: theme.palette.primary.light,
    },
    paper: {
        backgroundColor: theme.palette.primary.light,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    app: {
        height: '95vh',
        display: 'grid',
        gridTemplateRows: '50px 1fr 30px',
        color: 'white',
        fontFamily: '/"Noto Sans/", sans-serif'
    },
    container: {
        maxWidth: '1200px',
        width: '95%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    main: {
        padding: '15px 0',
        overflowY: 'auto',
        overflowX: 'hidden',
    }, 
    label: {
        width: '100%',
        display: 'flex',
        'justify-content':' flex-end',
        'margin-bottom': '10px',
        'align-items': 'center',
        'text-align': 'end',
    },
    input: {
        width: '250px',
        padding: '5px',
        'margin-left': '10px',
        'font-size': '16px',
    },
    textarea: {
        resize: 'none',
        height: '90px',
        padding: '10px',
        width: '100%',
        'font-size': '16px',
    },
    radio: {
        display: 'flex',
        'align-items': 'center',
        'margin-left': '20px',
    },
    radioDot: {
        width: '15px',
        height: '15px',
        'margin-right': '10px',
    }
}));

const StyledTypography = withStyles((theme) => ({
    root: {
        color: theme.palette.common.white
    }
}))(Typography);

const StyledIconButton = withStyles((theme) => ({
    root: {
        color: theme.palette.common.white,
        //backgroundColor: 'white',
        // '&:hover': {
        //     backgroundColor: 'white',
        // }
    },
    disabled: {
        backgroundColor: rgba(theme.palette.primary.main, 0.7)
    },
    colorPrimary: {
        backgroundColor: theme.palette.primary.main
    },
    colorSecondary: {
        backgroundColor: theme.palette.secondary.main
    },
}))(IconButton);

const _StyledButton = withStyles((theme) => ({
    root: {
        background: `linear-gradient(45deg, ${theme.palette.secondary.light} 20%, ${theme.palette.secondary.main} 80%)`,
        // backgroundColor: `${rgba(theme.palette.secondary.main, 1.0)}`,
        borderRadius: '5px',
        border: `1px solid ${rgba(theme.palette.primary.main, 1.0)}`,
        minWidth: '60px',
        padding: '5px',
        margin: '5px',
        boxShadow: `0 5px 7px 2px ${rgba(theme.palette.common.black, 0.2)}`,
        color: theme.palette.type === 'light'? rgba(theme.palette.common.white, 1.0) : rgba(theme.palette.common.black, 1.0),
    },
    disabled: {
        backgroundColor:  rgba(theme.palette.common.white, 0.3),
        color: rgba(theme.palette.common.white, 0.3),
    },
    endIcon: {
        margin: 0,
        color: theme.palette.type === 'light'? rgba(theme.palette.common.black, 1.0) : rgba(theme.palette.common.white, 1.0),
    }
}))(Button);

const StyledButton = (props) => {
    return(
        <_StyledButton 
        startIcon = {props.pending? <CircularProgress size={20}/> : ''}
        {...props}
        >
            {props.children}
        </_StyledButton>
    )
}

const StyledSpinner = withStyles({
    colorPrimary: {
        color: theme.palette.common.white
    },
    colorSecondary: {
        color: theme.palette.common.black
    },

})(CircularProgress)

export {
    useStyles, 
    StyledButton, 
    StyledSpinner,
    StyledIconButton,
    StyledTypography
}