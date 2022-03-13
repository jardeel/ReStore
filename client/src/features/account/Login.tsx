import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import agent from '../../app/api/agent';
import { useForm, FieldValues } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

const theme = createTheme();

export default function Login() {
  const { register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
    mode: 'onTouched'
  });
  
  async function submitForm(data: FieldValues) {
    try {
      await agent.Account.login(data);      
    }catch(error){
      console.log(error);
    }
  }  


  return (
    <ThemeProvider theme={theme}>
      <Container 
        component={Paper} 
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            autoFocus
            {...register('username', {required: 'Username is required'})}
            error={!!errors.username}
            helperText={errors?.username?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register('password', {required: 'Password is required'})}
            error={!!errors.password}
            helperText={errors?.password?.message}
          />
          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link to="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}