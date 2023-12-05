import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const SearchDropdown = ({ data, onItemsSelected }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddItem = (item) => {
    if (!selectedItems.some(selectedItem => selectedItem.symbol === item.symbol)) {
      const newSelectedItems = [...selectedItems, item];
      setSelectedItems(newSelectedItems);
      onItemsSelected(newSelectedItems);
    }
  };

  return (
    <div>
      <Autocomplete
        options={data}
        getOptionLabel={(option) => `${option.companyName} (${option.symbol})`}
        style={{ width: '50%' }}
        renderInput={(params) => (
          <TextField {...params} label="Search Companies" variant="outlined" />
        )}
        onChange={(event, newValue) => {
          if (newValue) {
            handleAddItem(newValue);
          }
        }}
      />
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {selectedItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText primary={`${item.companyName} (${item.symbol})`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SearchDropdown;
