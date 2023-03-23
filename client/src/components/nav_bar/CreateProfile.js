import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";

const CreateProfile = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="bname"
            label="Business Name"
            name="bname"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            type="text"
            id="address"
            autoComplete="address"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="eyear"
            label="Establishment Year"
            type="text"
            id="eyear"
            autoComplete="eyear"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="clist"
            label="Category"
            type="text"
            id="clist"
            autoComplete="clist"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="nproduct"
            label="Number of Product"
            type="text"
            id="nproduct"
            autoComplete="address"
          />
          <Button variant="contained" component="label">
            Upload Logo
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <br></br>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default CreateProfile;
