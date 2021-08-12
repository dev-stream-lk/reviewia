import { DialogActions, DialogTitle, makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import React from 'react';
import Controls from '../Controls';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles( theme => ({
    dialog:{
        padding: theme.spacing(2),
        position:"absolute",
        top: theme.spacing(5)
    },
    dialogTitle:{
        paddingRight:"0px"
    }
}))

export default function Popup(props) {

    const classes = useStyles();
    const {title, children, openPopup, setOpenPopup, actions} = props;

    return (
        <Dialog open={openPopup} classes={{ paper: classes.dialog}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display:"flex"}}>
                    <Typography variant="h6" component="div" style={{flexGrow:1}}>
                        {title}
                    </Typography>
                    <Controls.Button
                        color="secondary"
                        variant="outlined"
                        onClick={ () => setOpenPopup(false)}
                    >
                        <CloseIcon></CloseIcon>
                    </Controls.Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>

            <DialogActions>
                {actions}
            </DialogActions>
        </Dialog>
    )
}
