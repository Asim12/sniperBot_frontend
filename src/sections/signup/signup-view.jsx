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
import { login, registerUser } from 'src/redux/action';
import { useDispatch } from 'react-redux';
import { useRouter } from 'src/routes/hooks';
import { useRef } from 'react';
import { CircularProgress } from '@mui/material';
import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import { useSelector } from 'react-redux';
import Iconify from 'src/components/iconify';
import { register } from 'numeral';

// ----------------------------------------------------------------------

export default function SignupView() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const theme = useTheme();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email) => {
    // Add your email validation logic here
    // For simplicity, this example uses a basic regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setIsEmailValid(validateEmail(emailValue));
  };

  const handleSignupClick = async () => {
    console.log('running');
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try{

      await dispatch(registerUser( {firstName, lastName, email, password,router}));
    }catch(error){
      console.log(error)
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField inputRef={firstNameRef} name="firstname" label="First name" />
        <TextField inputRef={lastNameRef} name="lastname" label="Last name" />

        <TextField
          error={!isEmailValid}
          helperText={!isEmailValid && 'Enter a valid email'}
          onChange={handleEmailChange}
          inputRef={emailRef}
          name="email"
          label="Email address"
        />

        <TextField
          name="password"
          inputRef={passwordRef}
          label="Password"
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

      <LoadingButton
        sx={{ my: 3 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSignupClick}
      >
        Register
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
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        {user.signupLoading ? (
          <CircularProgress />
        ) : (
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography variant="h4">Sign up to Minimal</Typography>

            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              Already have an account?
              <Link style={{cursor:'pointer'}} onClick={()=>router.push('/login')} variant="subtitle2" sx={{ ml: 0.5 }}>
                Login
              </Link>
            </Typography>


            {renderForm}
          </Card>
        )}
      </Stack>
    </Box>
  );
}
