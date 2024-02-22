/* eslint-disable react/prop-types */
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Grid, Paper, Stack } from '@mui/material';

export default function AlignItemsList({ users, handlePrevPage, handleNextPage, currentPage, totalPages }) {
  return (
    <Stack spacing={2} alignItems='center' justifyContent='center'>
      <Grid
        container
        rowSpacing={1}
        alignItems='center'
        justifyContent='center'
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {users.map((user, index) => (
          <Grid item xs={6} key={`user-${user.id}`}>
            <Paper elevation={3}>
              <Stack spacing={2} p={2}>
                <Stack spacing={2} direction='row' alignItems='center'>
                  <Avatar alt={`user: ${user.name} photo`} src={user.photo} />
                  <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.primary'>
                    {user.name}
                  </Typography>
                </Stack>
                <Typography>id: {user.id}</Typography>
                <Typography>
                  email:
                  {user.email}
                </Typography>
                <Typography>phone: {user.phone}</Typography>
                <Typography>
                  registration:
                  {user.registrationTimestamp}
                </Typography>
                <Typography>
                  position:
                  {user.position.name}
                </Typography>
              </Stack>
              {index + 1 >= index ? null : <Divider variant='inset' component='li' />}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} direction='row' alignItems='center' justifyContent='center'>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </Button>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </Button>
      </Stack>
    </Stack>
  );
}
