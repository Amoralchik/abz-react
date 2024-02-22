import { useState } from 'react';
import axios from 'axios';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';

const host = 'https://abz-app.adaptable.app/';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    positionId: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const getToken = async () => {
      try {
        const response = await axios.get(host + 'token');
        return response.data.token;
      } catch (error) {
        console.error('Error fetching token:', error);
        return null;
      }
    };

    const token = await getToken();

    try {
      const formDataWithPhoto = new FormData();
      formDataWithPhoto.append('email', formData.email);
      formDataWithPhoto.append('name', formData.name);
      formDataWithPhoto.append('phone', formData.phone);
      formDataWithPhoto.append('positionId', formData.positionId);
      formDataWithPhoto.append('photo', formData.photo);

      const response = await axios.post(host + 'users', formDataWithPhoto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User created:', response.data);
      setFormData({
        email: '',
        name: '',
        phone: '',
        positionId: '',
        photo: null,
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} alignItems='center' justifyContent='center'>
          <Typography variant='h6'>Create User</Typography>
          <Grid
            container
            rowSpacing={1}
            alignItems='center'
            justifyContent='center'
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Email'
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Name'
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Phone'
                fullWidth
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Position ID'
                fullWidth
                type='number'
                name='positionId'
                value={formData.positionId}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth component='label' role={undefined} variant='contained' tabIndex={-1}>
                Upload photo
                <VisuallyHiddenInput onChange={handleFileChange} type='file' />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button type='submit' variant='contained' color='success'>
                Create
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </form>
    </div>
  );
};

export default CreateUserForm;
