import React from 'react'
import Button from './addButton';
import AddIcon from '@mui/icons-material/Add';
function Inventaire() {
  return (
    <div>
        <Button 
      
      className=""
      text='Add new'
      variant='outlined'
      startIcon= {<AddIcon/>}
      
      /> 
    </div>
  )
}

export default Inventaire ;