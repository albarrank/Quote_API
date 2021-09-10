const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// get all quotes and quote by author
app.get('/api/quotes', (req, res) => {
    const { person } = req.query;
    console.log(person);
    const filterQuotes = quotes.filter(quote => {
        return quote.person === person;
    });

    if (person) {
        console.log('author quote')
        res.send({ quotes: filterQuotes })

    } else {
        console.log('get all quotes')
        res.send({ quotes: quotes })
        // res.status(200).send({ quotes })
    }
})

// get random quote
app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    if (randomQuote) {
        console.log("randomquote")
        res.status(200).send({ quote: [randomQuote] });
    } else {
        res.status(500).send("Server Error");
    }
})

// make new quote
app.post('/api/quotes', (req, res) => {
    console.log(req.query);
    res.status(203).send('quote created');
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});