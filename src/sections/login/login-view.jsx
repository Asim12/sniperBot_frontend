/* eslint-disable */
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { login } from 'src/redux/action';
import { useDispatch } from 'react-redux';
import { useRouter } from 'src/routes/hooks';
import { useRef } from 'react';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Avatar from '@mui/material/Avatar';
import logoImg from '../../images/logo.png'

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [passwordLength, setPasswordLength] = useState(0);
  const [emailLength, setEmailLength] = useState(0);


  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const user=useSelector((state)=>state.user)

  console.log('user state is',user)


  const handleClick = async () => {
    console.log('running')
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try{

      await dispatch(login({email,password,router}))
     }
      
      catch(error){
      console.log(error)
    }
  };

  const handlePasswordChange = () => {
    const password = passwordRef.current.value;
    setPasswordLength(password.length);
  };


  const handleEmailChange = () => {
    const email = emailRef.current.value // Trim to remove leading and trailing whitespaces
    setEmailLength(email.length);
  }

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField onChange={handleEmailChange} inputRef={emailRef} name="email" label="Email address" />

        <TextField
          name="password"
          inputRef={passwordRef}
          label="Password"
          onChange={handlePasswordChange}

          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        disabled={passwordLength < 8 || emailLength < 2}

      >
        Login
      </LoadingButton>
    </>
  );

  return (

    
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
    <Avatar
    src={logoImg} // Replace with the actual path or URL of your logo
    alt="Logo"
    sx={{ mt: 3, ml: 4, width: 48, height: 48 }} // Adjust the styling as needed
  />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>

        {user.loginLoading?<CircularProgress/>:<Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link style={{cursor:'pointer'}} onClick={()=>router.push('/register')} variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

        

          {renderForm}
        </Card>}
      </Stack>
    </Box>
  );
}
