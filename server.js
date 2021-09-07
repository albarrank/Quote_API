const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// get all quotes
app.get('/api/quotes', (req, res) => {
    res.status(200).send({quotes})
})

// get random quote
app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    console.log(randomQuote)
    if (randomQuote) {
        res.status(200).send(randomQuote);
    } else {
        res.status(500).send("Server Error");
    }
})

// get quote by author
app.get('/api/quotes/:person', (req, res) => {
    console.log(req.params);
    res.status(200).send('author found')
})

// make new quote
app.post('/api/quotes/:quote/:person', (req, res) => {
    console.log(req.params);
    res.status(203).send('quote created');
})
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});