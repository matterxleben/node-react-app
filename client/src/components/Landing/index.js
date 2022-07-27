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
    >
        <Grid item>

        <AppBar position="static" style={{background:"#ffbdc9"}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
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
                    color: "black",
                    textDecoration: "none"
                }}
            >
                Matts IMDB Page
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>

                <Button
                    key={'Search'}
                    sx={{ my: 2, color: "black", display: "block" }}
                    onClick={() => history.push('/search')}
                >
                    Search
                </Button>

                <Button
                    key={'Search'}
                    sx={{ my: 2, color: "black", display: "block" }}
                    onClick={() => history.push('/reviews')}
                >
                    Reviews
                </Button>

                <Button
                    key={'MyPage'}
                    sx={{ my: 2, color: "black", display: "block" }}
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
                align = 'center'
                sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".01rem",
                color: "inherit",
                }}
                >
                Welcome to Matt's Movie Review Website!
                </Typography>
            </Grid>

            <Grid item>
                    <Typography
                        variant="h5"
                        noWrap
                        href="/"
                        align = 'center'
                        sx={{
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".01rem",
                        color: "inherit",
                        }}
                    >
                        <p>
                            MSCI 245 Project
                            <br></br>
                            By: Matthew Erxleben
                            <br></br>
                            <br></br>
                            This website is a movie reviewing platform, similar to IMDB!
                            
                            <br></br>
                            <br></br>
                            Functionalities:
                            <br></br>
                            App Bar: User can use the App Bar at the top of the screen to navigate to different pages
                            <br></br>
                            Page 1) Search: User can search for movies based on Movie Title, Actor Name, and/or Director Name
                            <br></br>
                            Page 2) Reviews: User can enter movie reviews to add to the database
                            <br></br>
                            Page 3) Romance movies: Displays all Romance Movies and links their Movie Trailers

                        </p>
                    </Typography>
            </Grid>


    </Grid>
    
  );
};
export default Landing;


