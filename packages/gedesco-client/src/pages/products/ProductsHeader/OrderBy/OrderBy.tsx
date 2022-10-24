import React, { BaseSyntheticEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { SortOrder } from '../../products-utils';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '120px'
  },
}));

type OrderOption = {
  label: JSX.Element;
  orderBy: string;
  order: SortOrder;
};

type OrderByComponentProps = {
  onOrder: ( orderBy: string, order: SortOrder) => void;
};

const OrderByComponent = (props: OrderByComponentProps) => {
  const { onOrder } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handleClickListItem = (event: BaseSyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: BaseSyntheticEvent, index: number, option: OrderOption) => {
    setSelectedIndex(index);
    onOrder(option.orderBy, option.order);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const optionLabel = (label: string, order: SortOrder) => (
    <div className='flex-row-space-beetween fullWidth'>
          <span>
              {label}
          </span>
          <span>
            {order === 'asc'
            ? <ArrowDropUpIcon fontSize='small'  />
            : <ArrowDropDownIcon fontSize='small'  />}
          </span>
    </div>
  );

  const options: OrderOption[] = [
    {label: optionLabel('Price', 'asc'), orderBy: 'price', order: 'asc'},
    {label: optionLabel('Price', 'desc'), orderBy: 'price', order: 'desc'},
    {label: optionLabel('Title', 'asc'), orderBy: 'title', order: 'asc'},
    {label: optionLabel('Title', 'desc'), orderBy: 'title', order: 'desc'},
  ];

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="order-by-menu"
          aria-label="Order by"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Order by" secondary={options[selectedIndex].label} />
        </ListItem>
      </List>
      <Menu
        id="order-by-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index, option)}
            
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default OrderByComponent;