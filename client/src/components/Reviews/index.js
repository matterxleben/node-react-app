import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

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

// const opacityValue = 0.9;
/*
const theme = createTheme({
    palette: {
      type: 'dark',
      background: {
        default: "#000000"
      },
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#b552f7",
      },
    },
  });


const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

});

*/


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }

  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }


  render() {
    return (
        <Review />
    );
  }
}




const MovieSelection = ({movieTitle, movieTitleChange, movies}) => {
  return (
    <Grid item>
      <Box sx={{p:2}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select a Movie:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={movieTitle}
            onChange={movieTitleChange}
          >
            {movies.map(movie =>
              <MenuItem 
                data-id = {movie.id}
                value = {movie.name}> 
                {movie.name}
              </MenuItem>
            )}
          </Select>
        </FormControl>
        </Box>
    </Grid>
  )
}


const ReviewTitle = ({movieReviewTitle, movieReviewTitleChange}) => {
  return (
    <Grid item>
      <form noValidate autoComplete="off">
      <Box sx={{p:2}}>
        <FormControl fullWidth>
            <TextField
                id="standard-multiline-flexible"
                label="Enter a Title for the Movie Review:"
                value={movieReviewTitle}
                onChange={movieReviewTitleChange}
            />
        </FormControl>
      </Box>
      </form>
    </Grid>
  )
}

const ReviewBody = ({movieReview, movieReviewChange}) => {
  return (
    <Grid item>
      <form noValidate autoComplete="off">
        <div>
            <Box sx={{p:2}}>
                <FormControl fullWidth>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Enter a Movie Review:"
                        multiline
                        value={movieReview}
                        onChange={movieReviewChange}
                        inputProps={{
                        maxLength: 200,
                        }}
                    />
                </FormControl>
            </Box>
        </div>
      </form>
    </Grid>
  )
}

const ReviewRating = ({movieRating, movieRatingChange}) => {
  return (
    <Grid item>
        <Box sx={{p:2}}>
            <FormControl fullWidth component="fieldset">
                <FormLabel component="legend">Rating</FormLabel>
                <RadioGroup aria-label="Enter a Movie Rating:" name="rating" value={movieRating} onChange={movieRatingChange}>
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
                </RadioGroup>
            </FormControl>
        </Box>
    </Grid>
  )
}

const Review = () => {

  React.useEffect(() => {
    getMovies();
  }, [])

  const getMovies = () => {
    callApiGetMovies()
      .then(res => {
        console.log("callApiGetMovies returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetMovies parsed: ", parsed);
        setMovies(parsed);
      })
  }
  
  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";
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
  
  const addReview = () => {
    callApiAddReview()
      .then(res => {
        console.log("callApiAddReview returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiAddReview parsed: ", parsed[0])
        //setRecipesList(parsed);
      });
  }

  const callApiAddReview = async () => {

    const url = serverURL + "/api/addReview";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },

      // movie id, user id, reviewTitle, reviewContent, reviewScore)
      body: JSON.stringify({
        //calorieSearchTerm: calorieSearchTerm,
        movieReviewTitle : movieReviewTitle,
        movieReview : movieReview,
        movieRating : movieRating,
        movieID : movieID
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Found : ", body);
    return body;
  }
  
  const [movies, setMovies] = React.useState([]);
  
  const [movieTitle, setMovieTitle] = React.useState('')

  const [movieID, setMovieID] = React.useState('')

  const movieTitleChange = (event) => {
    console.log(event.currentTarget.dataset)
    setMovieTitle(event.target.value);
    setMovieID(event.currentTarget.dataset.id);
  }

  const moviesChange = (event) => {
    setMovies(event.target.value)
  }

  const [movieReviewTitle, setMovieReviewTitle] = React.useState('')

  const movieReviewTitleChange = (event) => {
    setMovieReviewTitle(event.target.value);
  }

  const [movieReview, setMovieReview] = React.useState('');

  const movieReviewChange = (event) => {
    setMovieReview(event.target.value);
  };

  const [movieRating, setMovieRating] = React.useState('')

  const movieRatingChange = (event) => {
    setMovieRating(event.target.value);
  }

  const [reviewData, setReviewData] = React.useState('');

  const notifyReviewTitle = () => toast.warning("Please enter your review title");
  const notifyReview = () => toast.warning("Please enter your review");
  const notifyRating = () => toast.warning("Please enter your rating");
  const notifySuccess = () => toast.success(
    <div>
      <h4>Your review has been received</h4>

      <p>
        Movie Title: {movieTitle}
        <br></br>
        Movie Review Title: {movieReviewTitle}
        <br></br>
        Movie Review: {movieReview}
        <br></br>
        Movie Rating: {movieRating}
      </p>
    </div>
    );
  

  const movieEmpty = () => {
    if (movieReviewTitle.length === 0) {
      notifyReviewTitle();
    }
    if (movieReview.length === 0) {
      notifyReview();
    }
    if (movieRating.length === 0) {
      notifyRating();
    }
    if (movieReviewTitle.length !== 0 && movieReview.length !== 0 && movieRating.length !== 0) {
      notifySuccess();
      addReview();
    }
  }

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

      <Grid item>
        <Typography
            variant="h3"
            noWrap
            href="/"
            align = "center"
            sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            }}
        >
          IMDB Review Page
        </Typography>
      </Grid>

      <Container maxWidth = 'sm'>
        <MovieSelection
            movieTitle = {movieTitle}
            movieTitleChange = {movieTitleChange}
            movies = {movies}
        />

        <ReviewTitle
            movieReviewTitle={movieReviewTitle}
            movieReviewTitleChange={movieReviewTitleChange}
        />

        <ReviewBody
            movieReview={movieReview}
            movieReviewChange={movieReviewChange}
        />

        <ReviewRating
            movieRating={movieRating}
            movieRatingChange={movieRatingChange}
        />

        <Grid item>
            <Box sx={{p:2}}>
                <FormControl fullWidth>
                    <Button
                    variant="contained"
                    onClick={movieEmpty}
                    sx={{color: 'black', backgroundColor: '#ffbdc9', borderColor: 'grey'}}
                    >
                    Submit
                    </Button>
                    <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                </FormControl>
            </Box>
        </Grid>
      </Container>
    </Grid>

  )

}

export default Review;