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

// Searching button from Material UI

/*

const Searcher = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '40ch',
        '&:focus': {
          width: '40ch',
        },
      },
    },
}));

*/

///////////////////////////////////////////////////////



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
        setDirectorNameList(directorName.split(" "))
        setDirectorFirstName(directorNameList[0])
        setDirectorLastName(directorNameList[1])
    }
    
    const searchSplitting = () => {
        
        setActorNameList(actorName.split(" "))
        // setActorFirstName(actorNameList[0])
        // setActorLastName(actorNameList[1])


    }

    const actorFirstNameChange = () => {
        setActorFirstName(actorNameList[0])
    }

    const submitOnClick = () => {
        searchSplitting()
        actorFirstNameChange()

        /*
        console.log(actorFirstName)
        console.log(actorLastName)

        console.log(actorName)
        console.log(actorNameList)
        
        console.log(actorFirstName)
        console.log(actorLastName)
        console.log(title)
        */
        console.log(actorFirstName)
        console.log(actorLastName)


    }

    return (
        <Grid
        container
        spacing={8}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        >
            <Grid item>
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
                <TextField
                    id="standard-multiline-flexible"
                    label="Movie Title"
                    multiline
                    value={title}
                    onChange={titleChange}
                    inputProps={{
                    maxLength: 200,
                    }}
                />                            

            </Grid>
            <Grid item>
                <form noValidate autoComplete="off">
                    <div>
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
                    </div>
                </form>
            </Grid>
            <Grid item>
                <form noValidate autoComplete="off">
                    <div>
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
                    </div>
                </form>
            </Grid>
            <Grid item>
                <Button
                variant="outlined"
                onClick={submitOnClick}
                >
                Submit
                </Button>
            </Grid>


        </Grid>
    );
};
export default Search;
