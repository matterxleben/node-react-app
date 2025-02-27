import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import FavoriteIcon from '@mui/icons-material/Favorite';
import history from '../Navigation/history';

//Dev mode
//const serverURL = ""; //enable for dev mode

//Deployment mode instructions
// const serverURL = "http://ov-research-4.uwaterloo.ca:3061"; //enable for deployed mode; Change PORT to the port number given to you;
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3061"; //enable for deployed mode; Change PORT to the port number given to you; 

//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");


const MyPage = () => {

    React.useEffect(() => {
        romanceMovies();
    }, [])
    
    const romanceMovies = () => {
        callApiRomanceMovies()
          .then(res => {
            console.log("callApiRomanceMovies returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiRomanceMovies parsed: ", parsed);
            setRomanceMoviesList(parsed);
        })
    }
      
    const callApiRomanceMovies = async () => {
        const url = serverURL + "/api/romanceMovies";
        console.log(url);
      
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        });
      
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("User settings: ", body);
        return body;
    }

    const [romanceMoviesList, setRomanceMoviesList] = React.useState([]);
    
    const romanceMoviesListChange = (event) => {
        setRomanceMoviesList(event.target.value)
    }


    return (
    <Grid
        container
        spacing={10}
        direction="column"
    >
        <Grid item>
            <AppBar position="static" style={{background:"#ffbdc9"}}>
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
        <Container maxWidth = 'xl'>
            <Grid item>

                <Typography
                        variant="h5"
                        noWrap
                        href="/"
                        align = "center"
                        sx={{
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".01rem",
                        color: "inherit",
                        }}
                    >
                        &nbsp;<FavoriteIcon /> This is a list of Romance Movies (Matt's favourite genre!)&nbsp;<FavoriteIcon />
                </Typography>

                

            </Grid>
            
            <Grid item>
                <Box sx={{p:2}}>
                    <FormControl fullWidth>
                        <Typography
                                variant="h6"
                                noWrap
                                href="/"
                                align = "center"
                                sx={{
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".01rem",
                                color: "inherit",
                                }}
                            >
                                Click the Trailer button to watch each specific movie trailer
                                <br></br>
                                The movies Annie Hall, Barry Lyndon, Beauty and the Beast, Ben-Hur, and Casablanca have trailers linked to the button 
                                <br></br>
                                (Anus Magillicutty didnt have a trailer, so check out that link for a suprise instead!)

                        </Typography>
                    </FormControl>
                </Box>

            </Grid>
        </Container>


        <Grid item>
            <List>
                {romanceMoviesList.map(movie =>
                    <>
                        <Box sx={{p:2}}>
                            <ListItem disablePadding>
                                <ListItemText primary={movie.name} secondary= {'Release Year: ' + movie.year}/>
                            </ListItem>
                            <Button variant="contained" href={movie.trailer} sx={{color: 'black', backgroundColor: '#ffbdc9'}}>
                                Movie Trailer
                            </Button>
                        </Box>
                        <Divider />
                    </>
                )}
            </List>
        </Grid>

        <Grid item>


        </Grid>
    </Grid>
    

    
  );
};
export default MyPage;
