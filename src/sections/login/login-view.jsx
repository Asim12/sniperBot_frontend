import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useLogin } from 'src/hooks/useLogin';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const { login, error, isLoading } = useLogin();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const [showPassword, setShowPassword] = useState(false);
  const formValidationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(4, 'Password should be of minimum 4 characters length')
      .required('Password is required'),
  });

  const Formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      await login(email, password);
    },
  });

  const renderForm = (
    <form onSubmit={Formik.handleSubmit}>
      <Stack spacing={3}>
        {/* Email Text Field */}
        <TextField
          autoComplete="off"
          name="email"
          type="email"
          label="Email address"
          value={Formik.values.email}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.email && Boolean(Formik.errors.email)}
          helperText={Formik.touched.email && Formik.errors.email}
        />
        {/* Password Text Field */}
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={Formik.values.password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.password && Boolean(Formik.errors.password)}
          helperText={Formik.touched.password && Formik.errors.password}
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
      {/* Submit Button */}
      <LoadingButton
        disabled={isLoading}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{
          my: 3,
          background: `linear-gradient(45deg,${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 100%)`,
          color: theme.palette.common.white,
          fontSize: 18,
        }}
        // onClick={handleClick}
      >
        Login
      </LoadingButton>
    </form>
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
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Snipper Bot</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link to="/signup" variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
