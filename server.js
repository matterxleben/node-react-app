let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/addReview', (req, res) => {
	let movieReviewTitle = req.body.movieReviewTitle;
	let movieReview = req.body.movieReview;
	let movieRating = req.body.movieRating;
	let movieID = req.body.movieID;
	let userID = 1;

	let connection = mysql.createConnection(config);
	let sql = `INSERT INTO Review (reviewTitle, reviewContent, reviewScore, userID, movieID) values (?, ?, ?, ?, ?)`;
	console.log(sql);
	console.log(movieID);
	let data = [movieReviewTitle, movieReview, movieRating, userID, movieID]
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
	});
	connection.end();
});

app.post('/api/getMovies', (req, res) => {

	let connection = mysql.createConnection(config);
	let sql = `SELECT * FROM movies`;
	console.log(sql);
	let data = []

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		//console.log(results);
		let string = JSON.stringify(results);
		// let obj = JSON.parse(string);
		//console.log(string)
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/romanceMovies', (req, res) => {

	let connection = mysql.createConnection(config);
	let sql = `SELECT a.name, a.year FROM movies a, movies_genres b WHERE b.genre = 'Romance' AND a.id =  b.movie_id`;
	console.log(sql);
	let data = []

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		//console.log(results);
		let string = JSON.stringify(results);
		// let obj = JSON.parse(string);
		//console.log(string)
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/searchMovies', (req, res) => {
	let title = (req.body.title + "%");
	let actorName = req.body.actorName;
	let directorName = req.body.directorName;

	let actorNameList = actorName.split("+")
	let directorNameList = directorName.split("+")

	let actorFirstName = (actorNameList[0] + "%")
	let actorLastName = "%"
	if (actorName.length > 1) {
		actorLastName = (actorNameList[1] + "%")
	}

	let directorFirstName = (directorNameList[0] + "%")
	let directorLastName = "%"
	if (directorName.length > 1) {
		directorLastName = (directorNameList[1] + "%")
	}

	console.log("TITLE: " + title)
	console.log("ACTOR NAME: " + actorName)
	console.log("DIRECTOR NAME: " + directorName)

	console.log("D FIRST NAME: " + directorFirstName)
	console.log("D LAST NAME: " + directorLastName)

	let connection = mysql.createConnection(config);
	// let sql = `SELECT * FROM directors WHERE first_name = ? AND last_name = ?;`;
	
	let sql = `SELECT m.name, d.first_name, d.last_name, rev.reviewContent, sc.averageScore
	FROM Review rev
	LEFT OUTER JOIN movies m ON rev.movieID = m.id
	LEFT OUTER JOIN movies_directors md ON rev.movieID = md.movie_id 
	LEFT OUTER JOIN directors d ON md.director_id = d.id
	LEFT OUTER JOIN ( 
	SELECT movieID, avg(reviewScore) as averageScore
	FROM Review
	GROUP BY movieID
	) sc ON rev.movieID = sc.movieID
	WHERE m.name LIKE ?
	AND d.first_name LIKE ?
	AND d.last_name LIKE ?
	AND m.id IN (
	SELECT movie_id
	FROM movies m
	RIGHT OUTER JOIN roles r ON m.id = r.movie_id
	LEFT OUTER JOIN actors a ON r.actor_id = a.id
	WHERE a.first_name LIKE ?
	AND a.last_name LIKE ? )`;
	
	
	//console.log(sql);
	//let data = [title, actorFirstName, actorLastName, directorFirstName, directorLastName]
	let data = [title, directorFirstName, directorLastName, actorFirstName, actorLastName]
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		//console.log(results);
		let string = JSON.stringify(results);
		// let obj = JSON.parse(string);
		console.log(string)
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		console.log(string)
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server


