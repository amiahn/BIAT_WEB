import { Button as MuiButton, makeStyles } from '@material-ui/core'
import React from 'react'


const useStyles= makeStyles(theme =>({
    ButtonRoot : {
        margin : theme.spacing(0.5)
    },
    ButtonLabel : {
        textTransform : 'none'
    },
}))
function Button(props) {
    const {text, size, color, onClick, variant, ...other} = props
    const classes = useStyles()
    return (
        <MuiButton
        variant={variant || 'contained'}
        size={size || 'large'}
        color={color || 'primary'}
        onClick={onClick}
        {...other}
        classes={{root:classes.ButtonRoot , label:classes.ButtonLabel}}>
            {text}
        </MuiButton>
    )
}

export default Button