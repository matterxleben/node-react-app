import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import history from '../Navigation/history';
import Grid from "@material-ui/core/Grid";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import TextField from '@material-ui/core/TextField';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { FormControl } from "@material-ui/core";

//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
// const serverURL = "http://ov-research-4.uwaterloo.ca:3061"; //enable for deployed mode; Change PORT to the port number given to you;
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3061"; //enable for deployed mode; Change PORT to the port number given to you; 

//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");





const Search = () => {
    const [title, setTitle] = React.useState('')

    const[actorName, setActorName] = React.useState('')
    const[actorNameList, setActorNameList] = React.useState('')
    const[actorFirstName, setActorFirstName] = React.useState('')
    const[actorLastName, setActorLastName] = React.useState('')

    
    const[directorName, setDirectorName] = React.useState('')
    const[directorNameList, setDirectorNameList] = React.useState('')
    const[directorFirstName, setDirectorFirstName] = React.useState('')
    const[directorLastName, setDirectorLastName] = React.useState('')

    const[searchResults, setSearchResults] = React.useState([])

    const searchResultsChange = (event) => {
        setSearchResults(event.target.value)
    }

    
    const titleChange = (event) => {
        //console.log(event.currentTarget.dataset)
        setTitle(event.target.value);
        //setMovieID(event.currentTarget.dataset.id);
    }
    
    const actorNameChange = (event) => {
        setActorName(event.target.value);
        
    }     

    const directorNameChange = (event) => {
        setDirectorName(event.target.value);
    }
    
    /*
    const searchSplitting = () => {
        
        setActorNameList(actorName.split(" "))
        setActorFirstName(actorNameList[0])
        setActorLastName(actorNameList[1])

        setDirectorNameList(directorName.split(" "))
        setDirectorFirstName(directorNameList[0])
        setDirectorLastName(directorNameList[1])

    }
    */


    const searchMovies = () => {
        callApiSearchMovies()
          .then(res => {
            console.log("callApiSearchMovies returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiSearchMovies parsed: ", parsed[0])
            //setRecipesList(parsed);
            setSearchResults(parsed);
            getReviewContent()
          });
    }
    
    const callApiSearchMovies = async () => {
    
        const url = serverURL + "/api/searchMovies";
        console.log(url);
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //authorization: `Bearer ${this.state.token}`
          },
    
          body: JSON.stringify({
            title : title,
            actorName : actorName,
            directorName : directorName,
            actorFirstName : actorFirstName,
            actorLastName : actorLastName,
            directorFirstName : directorFirstName,
            directorLastName : directorLastName
          }),

        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Found : ", body);
        return body;
    }
    

    const submitOnClick = () => {
        searchMovies()
    }

    const getReviewContent = () => {
        //prevTitle = searchResults[0].name
        
        searchResults.forEach((result)=>{
            console.log(result)


        })

    }

    return (
        <Grid
        container
        spacing={10}
        direction="column"
        >
            <Grid item>
                <AppBar position="static" style={{background:"purple"}}>
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
                        Please enter Actors and Directors name using the following format: FirstName+LastName
                        <br></br>
                        
                        <br></br>
                        Please make sure there is a '+' between the first and last name
                        <br></br>
                        e.g. To find the actor Kevin Spacey, enter: Kevin+Spacey
                </Typography>
            </Grid>
            <Container maxWidth = 'sm'>
            <Grid item>
                <Box sx={{p:2}}>
                    <FormControl fullWidth>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Movie Title"
                            multiline
                            value={title}
                            onChange={titleChange}
                            xs = {6}
                            
                            inputProps={{
                            maxLength: 200,
                            
                            }}
                        />
                    </FormControl>
                </Box>
            </Grid>
            <Grid item>
                <Box sx={{p:2}}>
                <form noValidate autoComplete="off">
                    <div>
                            <FormControl fullWidth>
                                <TextField
                                    id="standard-multiline-flexible"
                                    label="Actor's first name + last name"
                                    multiline
                                    value={actorName}
                                    onChange={actorNameChange}
                                    inputProps={{
                                    maxLength: 200,
                                    }}
                                />
                            </FormControl>
                    </div>
                </form>
                </Box>
            </Grid>
            <Grid item>
                <Box sx={{p:2}}>
                <form noValidate autoComplete="off">
                    <div>
                    <FormControl fullWidth>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Director's first name + last name"
                            multiline
                            value={directorName}
                            onChange={directorNameChange}
                            inputProps={{
                            maxLength: 200,
                            }}
                        />
                    </FormControl>
                    </div>
                </form>
                </Box>
            </Grid>
            <Grid item>
                <Box sx={{p:2}}>
                    <FormControl fullWidth>
                        <Button
                        variant="outlined"
                        onClick={submitOnClick}
                        >
                        Submit
                        </Button>
                    </FormControl>
                </Box>
            </Grid>
            </Container>
            <Grid item>
                <List>
                    {searchResults.map(result =>
                        <>
                            <Box sx={{p:2}}>
                                <ListItem disablePadding>
                                    <ListItemText primary={result.name} secondary= {['Director First Name: ' + result.first_name, <br></br>, 'Director Last Name: ' + result.last_name, <br></br>, 'Average User Rating: ' + result.averageScore, <br></br>, 'Review Text: ' + result.reviewContentList]}/>
                                </ListItem>
                            </Box>
                            <Divider />
                        </>
                    )}
                </List>

            </Grid>


        </Grid>
    );
};
export default Search;
