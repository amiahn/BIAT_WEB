import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function NativeSelectDemo(setRoleHandler, value) {

  const handleSetRole  =React.useCallback(event => {
    setRoleHandler(event.target.value)
  }, [setRoleHandler])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl >
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Role
        </InputLabel>
        <NativeSelect

          defaultValue={30}

          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
            
          }}
          onChange = {handleSetRole}
        >
          <option value={10}>Administrateur</option>
          <option value={20}>Magazinier</option>
          <option value={20}>technicien</option>
          <option value={30}>Employé</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}