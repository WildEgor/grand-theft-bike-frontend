import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';
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

const _StyledToggleButton = withStyles((theme) => ({
    root: {
        //background: `linear-gradient(45deg, ${theme.palette.secondary.light} 30%, ${theme.palette.secondary.main} 90%)`,
        background: `${rgba(theme.palette.secondary.main, 1.0)}`,
        borderRadius: '5px',
        border: `1px solid ${rgba(theme.palette.common.white, 1.0)}`,
        color: theme.palette.type === 'light'? rgba(theme.palette.common.black, 1.0) : rgba(theme.palette.common.white, 1.0),
        minWidth: '60px',
        padding: '5px',
        margin: '5px',
        boxShadow: `0 3px 5px 2px ${rgba(theme.palette.primary.main, 0.8)}`,
    },
    label: {
        color: theme.palette.type === 'light'? rgba(theme.palette.common.black, 1.0) : rgba(theme.palette.common.white, 1.0),
    },
    disabled: {
        backgroundColor: rgba(theme.palette.common.white, 0.4),
        border: 'none'
    },
    selected: {
        color: theme.palette.type === 'light'? rgba(theme.palette.common.black, 1.0) : rgba(theme.palette.common.white, 1.0),
    },
    // endIcon: {
    //     margin: 0,
    //     color: theme.palette.type === 'light'? rgba(theme.palette.common.black, 1.0) : rgba(theme.palette.common.white, 1.0),
    // },
}))(ToggleButton);

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

const StyledToggleButton = (props) => {
    return(
        <_StyledToggleButton 
        //startIcon = {props.pending? <CircularProgress size={20}/> : ''}
        {...props}
        >
            {props.children}
        </_StyledToggleButton>
    )
}

const StyledSelector = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        "&:focus": {
            backgroundColor: theme.palette.common.white
        }
    },
    select: {
        backgroundColor: theme.palette.common.black
    },
    selectMenu: {
        backgroundColor: theme.palette.common.white
    },
    filled: {
        backgroundColor: theme.palette.common.white
    },
    outlined: {
        backgroundColor: theme.palette.common.white
    },
    // inputProps: {
    //     classes: {
    //         root: {
    //             backgroundColor: theme.palette.common.white
    //         },
    //         //icon: classes.icon,
    //     },
    // }
}))(Select)

const StyledTextField = withStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        padding: '5px 0px',
        margin: '5px 5px',
        '& .MuiTextField-root': {
            fontSize: 12,
            backgroundColor: 'white'
        },
        '& label': {
            paddingBottom: '5px'
        },
        '& label.Mui-focused': {
          color: theme.palette.common.black,
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: theme.palette.common.black,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'red',
            backgroundColor: 'white'
          },
          '&:hover fieldset': {
            borderColor: 'yellow',
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.common.black,
          },
        },
      },
}))(TextField)

const StyledSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
});

const StyledSpinner = withStyles({
    // root: {

    // },
    // static: {
        
    // },
    colorPrimary: {
        color: theme.palette.common.white
    },
    colorSecondary: {
        color: theme.palette.common.black
    },

})(CircularProgress)

const StyledAccordion = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
        '&$expanded': {
          margin: 'auto',
        },
      },
      expanded: {},
}))(Accordion)

const StyledAccordionSummary = withStyles((theme) => ({
    expandIcon: {
        color: theme.palette.common.white,
    }
}))(AccordionSummary)

const StyledSkeleton = withStyles((theme) => ({
    root: {},
    wave: {
        '&::after': {
            background: `linear-gradient(0.25turn, ${rgba(theme.palette.primary.main, 0.3)}, ${rgba(theme.palette.secondary.main, 0.8)}, ${rgba(theme.palette.primary.main, 0.3)})`
        }
    },
    withChildren: {},
    rect: {
        backgroundColor: theme.palette.primary.main
    },
}))(Skeleton)

export {
    useStyles, 
    StyledButton, 
    StyledToggleButton,
    StyledSelector, 
    StyledTextField,
    StyledSwitch,
    StyledSpinner,
    StyledAccordion,
    StyledAccordionSummary,
    StyledIconButton,
    StyledSkeleton,
    StyledTypography
}