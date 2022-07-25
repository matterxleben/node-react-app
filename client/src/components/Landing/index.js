import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import history from '../Navigation/history';


const Landing = () => {
  return (
    <Grid
        container
        spacing={8}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
    >
        <Grid item xs = {12}>

        <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
                }}
            >
                Matts IMDB Page
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>

                <Button
                    key={'Search'}
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={() => history.push('/search')}
                >
                    Search
                </Button>

                <Button
                    key={'Search'}
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={() => history.push('/reviews')}
                >
                    Reviews
                </Button>

                <Button
                    key={'MyPage'}
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={() => history.push('/myPage')}
                >
                    Romance movies
                </Button>


            </Box>
            </Toolbar>
        </Container>
        </AppBar>
        </Grid>

            <Grid item>
                <Typography
                variant="h3"
                noWrap
                href="/"
                sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
                }}
                >
                Welcome to Matt's IMDB Landing Page
                </Typography>
            </Grid>

            <Grid item>
                    <Typography
                        variant="h6"
                        noWrap
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none"
                        }}
                    >
                        <p>
                            MSCI 245 Project
                            <br></br>
                            By: Matthew Erxleben
                            <br></br>
                            <br></br>
                            The user can use the App Bar to navigate to different pages
                            <br></br>
                            <br></br>
                            Functionalities of each page:
                            <br></br>
                            1. Search: User can search for movies
                            <br></br>
                            2. Reviews: User can enter movie reviews and store them
                            <br></br>
                            3. Romance movies: Displays all Romance Movies 

                        </p>
                    </Typography>
            </Grid>


    </Grid>
    
  );
};
export default Landing;


