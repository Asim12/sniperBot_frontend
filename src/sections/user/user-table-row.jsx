import moment from 'moment';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  contractAddress,
  pairAddress,
  sell_price,
  amount,
  buy_price,
  createdAt,
  logo,
  profit_percentage,
  status,
  symbol,
  updatedAt,
  user_id,
  selected,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          {/* <Checkbox disableRipple checked={selected} onChange={handleClick} /> */}
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={logo} src={logo} />
            <Typography variant="subtitle2" noWrap>
              {symbol}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{contractAddress}</TableCell>
        <TableCell>{pairAddress}</TableCell>
        <TableCell>{amount}</TableCell>
        <TableCell>{buy_price}</TableCell>
        <TableCell>{sell_price}</TableCell>
        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>
        <TableCell>{profit_percentage}%</TableCell>
        <TableCell>{moment(createdAt).format('lll')}</TableCell>
        <TableCell>{moment(updatedAt).format('MMM Do YY')}</TableCell>
        {/* <TableCell>{user_id}</TableCell> */}

        {/* <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="mdi:eye" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  contractAddress: PropTypes.any,
  pairAddress: PropTypes.any,
  sell_price: PropTypes.any,
  amount: PropTypes.any,
  buy_price: PropTypes.any,
  profit_percentage: PropTypes.any,
  handleClick: PropTypes.func,
  createdAt: PropTypes.any,
  logo: PropTypes.string,
  symbol: PropTypes.string,
  selected: PropTypes.any,
  updatedAt: PropTypes.any,
  user_id: PropTypes.any,
  status: PropTypes.string,
};
