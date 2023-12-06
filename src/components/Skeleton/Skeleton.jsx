import * as React from 'react';

import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

function Row() {
  return (
    <Stack spacing={3} display="flex" direction="row" px={2} py={2}>
      <Skeleton variant="rounded" width={125} height={40} />
      <Skeleton variant="rounded" width={125} height={40} />
      <Skeleton variant="rounded" width={200} height={40} />
      <Skeleton variant="rounded" width={125} height={40} />
      <Skeleton variant="rounded" width={125} height={40} />
      <Skeleton variant="rounded" width={125} height={40} />
    </Stack>
  );
}

export default function Variant() {
  return [...Array(5)].map((index) => <Row key={index} />);
}
