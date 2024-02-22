import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import AlignItemsList from './userlist';
import axios from 'axios';
import { Box, Button, Chip, Link, Skeleton, Stack, Typography } from '@mui/material';
import CreateUserForm from './createUserForm';

const host = 'https://abz-app.adaptable.app/';

function App() {
  const [users, setUsers] = useState([]);
  const [positions, setPositions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.get(host + 'token');
        return response.data.token;
      } catch (error) {
        console.error('Error fetching token:', error);
        return null;
      }
    };
    const fetchData = async () => {
      const token = await getToken();
      if (!token) {
        return;
      }

      try {
        const userResponse = await axios.get(host + 'users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,
            count: 6,
          },
        });
        setUsers(userResponse.data.users || []);
        setTotalPages(userResponse.data.total_pages || totalPages);

        const positionsResponse = await axios.get(host + 'positions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPositions(positionsResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, totalPages]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Stack spacing={2} alignItems='center' justifyContent='center'>
      <Link href='/swagger'>
        <Button>Swagger</Button>
      </Link>

      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <Typography variant='h1'>abz</Typography>

      <Stack spacing={2} alignItems='center' justifyContent='center'>
        <Stack spacing={2} direction='row' alignItems='center'>
          <Typography variant='h5'>Positions:</Typography>
          {positions.map((position) => (
            <Chip label={position.name} key={`position-${position.id}`} variant='outlined' />
          ))}
        </Stack>

        {users.length ? (
          <AlignItemsList
            users={users}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        ) : (
          <Box>
            <Skeleton height={900} />
          </Box>
        )}
        <CreateUserForm />
      </Stack>
    </Stack>
  );
}

export default App;
