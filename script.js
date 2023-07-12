const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const btnTwitter = document.getElementById("twitter");
const btnNewQuote = document.getElementById("new-quote");

const apiQuoteUrl_01 =
  "https:jacintodesign.github.io/quotes-api/data/quotes.json";
const apiQuoteUrl_02 = "https://zenquotes.io/api/quotes";

let apiQuotes = [];

// Show new quote
function newQuote(quotes) {
  // pick a random quote from apiQuotes array
  const randomNumber = Math.floor(Math.random() * quotes.length);
  console.log(randomNumber);
  const quote = quotes[randomNumber];
  console.log(quote);
}

// Get Quotes from API
async function getQuotes(api_url) {
  try {
    const response = await fetch(api_url);
    apiQuotes = await response.json();
    console.log(apiQuotes);
    newQuote(apiQuotes);
  } catch (error) {
    // error here
    console.log(`Something went wrong:\n${error}\nUsing local quotes`);
    newQuote(localQuotes);
  }
}

//on load
getQuotes(apiQuoteUrl_01);
