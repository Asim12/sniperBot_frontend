import { useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { account } from 'src/_mock/account';
import { logoutUser, resetWalletDetails } from 'src/redux/action';
import { useDispatch } from 'react-redux';
import { useRouter } from 'src/routes/hooks';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { getWalletDetails } from 'src/redux/action';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { CircularProgress } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';


// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'My Wallet',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // New state for the dialog
  const [copyStatus, setCopyStatus] = useState({ wallet: false, privateKey: false });
  const [copyTimeout, setCopyTimeout] = useState(null);

  const dispatch=useDispatch()
  const router=useRouter()
  const passwordRef = useRef(null);
  const walletState = useSelector((state) => state.wallet);
  console.log('wallet state',walletState)


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout=async ()=>{
    await logoutUser(dispatch,router)
  }

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    resetWalletDetails(dispatch)
  };

  const getWalletDetailsHandler=async ()=>{
    const password = passwordRef.current.value;
    try{

      await  dispatch(getWalletDetails(password))
    }catch(error){
      console.log(error)
    }

  }

  const truncateAddress = (address) => {
    const prefix = address.substring(0, 6);
    const suffix = address.substring(address.length - 4);
    return `${prefix}...${suffix}`;
  };
  const handleCopyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopyStatus((prev) => ({ ...prev, [type]: true }));

    // Clear previous timeout
    clearTimeout(copyStatus[type]);

    // Set a new timeout to reset copy status after a few seconds
    const timeoutId = setTimeout(() => {
      setCopyStatus((prev) => ({ ...prev, [type]: false }));
    }, 3000);

    setCopyStatus((prev) => ({ ...prev, [type]: timeoutId }));
  };
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={(e)=>{
            if(e.target.textContent==='My Wallet'){
              handleDialogOpen()
            }else{

              handleClose()
            }
            }}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </Popover>


      <Dialog open={dialogOpen} onClose={handleDialogClose} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <DialogTitle>Get Wallet Details</DialogTitle>
       {walletState.loading? <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <CircularProgress />
        </div>:walletState.wallet&&walletState.wallet!==''&&walletState.private_key&&walletState.private_key!==''?<div style={{padding:'1rem'}}>
        <Typography variant="body1" style={{ padding: '1rem' }}>
      <span style={{ fontWeight: 'bold' }}>Wallet Address:</span>{' '}
      {truncateAddress(walletState?.wallet)}
      <Tooltip title={copyStatus.wallet ? 'Copied!' : 'Copy to Clipboard'} arrow>
        <Button
          size="small"
          onClick={() => handleCopyToClipboard(walletState?.wallet, 'wallet')}
          disabled={copyStatus.wallet}
        >
          {copyStatus.wallet ? 'Copied' : 'Copy'}
        </Button>
      </Tooltip>
    </Typography>
    <Typography variant="body1" style={{ padding: '1rem' }}>
      <span style={{ fontWeight: 'bold' }}>Private Key:</span>{' '}
      {truncateAddress(walletState?.private_key)}
      <Tooltip title={copyStatus.privateKey ? 'Copied!' : 'Copy to Clipboard'} arrow>
        <Button
          size="small"
          onClick={() => handleCopyToClipboard(walletState?.private_key, 'privateKey')}
          disabled={copyStatus.privateKey}
        >
          {copyStatus.privateKey ? 'Copied' : 'Copy'}
        </Button>
      </Tooltip>
    </Typography>
        </div>: <div>
        <DialogContent>
          <DialogContentText>
            To get your wallet details, please enter your password here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="password"
            type="password"
            fullWidth
            variant="standard"
            inputRef={passwordRef}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={getWalletDetailsHandler}>Get Details</Button>
        </DialogActions>
        </div>}
      </Dialog>
    
    </>
  );
}
