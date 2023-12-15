import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Avatar,
  Divider,
  Skeleton,
  // Add other Material-UI components as needed
} from '@mui/material';

import { useSelector } from 'react-redux';

const profilePageStyles = {
  root: {
    marginTop: '2rem',
  },
  paper: {
    padding: '1.5rem',
  },
  avatar: {
    width: '9rem',
    height: '9rem',
    margin: '0 auto',
  },
  section: {
    marginTop: '2rem',
  },
};

const ProfilePage = () => {
  const userState = useSelector((state) => state.user);

  console.log('user state is', userState);

  // Check if user data exists
  const isUserDataAvailable = Boolean(userState?.first_name && userState?.last_name);

  return (
    <Container style={profilePageStyles.root}>
      <Paper style={profilePageStyles.paper} elevation={3}>
        {isUserDataAvailable ? (
          <>
            <Avatar style={profilePageStyles.avatar} alt="User Avatar" />
            <Typography variant="h4" align="center" gutterBottom>
              {`${userState?.first_name} ${userState?.last_name}`}
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary">
              {userState?.role}
            </Typography>

            <Divider style={profilePageStyles.section} />

            <div style={profilePageStyles.section}>
              <Typography variant="h6">Role</Typography>
              <Typography variant="body1">{userState?.role}</Typography>
            </div>

            <Divider style={profilePageStyles.section} />

            <div style={profilePageStyles.section}>
              <Typography variant="h6">Email</Typography>
              <Typography variant="body1">{userState?.email}</Typography>
            </div>
          </>
        ) : (
          // Render skeleton when user data is not available
          <>
            <Skeleton variant="circle" width={120} height={120} style={profilePageStyles.avatar} />
            <Skeleton variant="text" width={200} height={40} style={{ marginBottom: '1rem' }} />
            <Skeleton variant="text" width={150} height={20} style={{ marginBottom: '1rem' }} />
            <Skeleton variant="rectangular" width="100%" height={20} style={{ marginBottom: '1rem' }} />
            <Skeleton variant="rectangular" width="100%" height={20} style={{ marginBottom: '1rem' }} />
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ProfilePage;
