const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// get all quotes and quote by author
app.get('/api/quotes', (req, res) => {
    const { person } = req.query;
    const filterQuotes = quotes.filter(quote => {
        return quote.person === person;
    });

    if (person) {
        res.send({ quotes: filterQuotes })

    } else {
        res.send({ quotes: quotes })
    }
})

// get random quote
app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    if (randomQuote) {
        res.status(200).send({ quote: [randomQuote] });
    } else {
        res.status(500).send("Server Error");
    }
})

// make new quote
app.post('/api/quotes', (req, res) => {
    const { quote, person } = req.query;
    quotes.push({ quote, person })
    res.status(203).send('quote created');
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});