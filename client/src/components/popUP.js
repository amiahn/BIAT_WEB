import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core'
import React from 'react'


import CloseIcon from '@mui/icons-material/Close';
import ActionButton from './actionbutton';

const useStyles = makeStyles(theme => ({
    Popup : {
        
        //top : theme.spacing(5),
        //padding : theme.spacing(2),
        //position : 'absolute' ,
        width : "100%",
        height : "80%",
    },
    dialogtitle : {
        paddingRight : '0px'
    },
    
}))

function PopUp(props) {
    const {title, children, openPop, setopenPop} = props
    const classes = useStyles()
    return (
        <Dialog open={openPop} maxWidth='md' classes={{paper :classes.Popup}}>
            <DialogTitle className={classes.dialogtitle}>
                <div style={{display : 'flex'}}>
                    <Typography variant='h6' component='div' style={{flexGrow :1 }}>
                        {title}
                    </Typography>
                    <ActionButton
                    color='secondary'
                    onClick={()=>{setopenPop(false)}}>
                        <CloseIcon/>
                    </ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default PopUp