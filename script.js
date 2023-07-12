const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const btnTwitter = document.getElementById("twitter");
const btnNewQuote = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const quoteIcon = document.querySelector("fa-quote-left");

const proxyUrl = "https://cors-anymwere.herokuapp.com/";

const apiQuoteUrl = "https:jacintodesign.github.io/quotes-api/data/quotes.json";

/* const apiQuoteUrl_02 =
  "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"; */

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new quote
function newQuote(quotes) {
  showLoadingSpinner();
  // pick a random quote from quotes array
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  // Check if Author field is blank and replace it with 'Unknown'
  quoteAuthor.textContent = !quote.author ? "Unknown" : quote.author;

  quoteText.textContent = quote.text;
  hideLoadingSpinner();
}

// Get Quotes from API
async function getQuotes(api_url) {
  showLoadingSpinner();
  try {
    const response = await fetch(api_url);
    apiQuotes = await response.json();
    try {
      newQuote(apiQuotes);
    } catch (error) {
      console.log(`Error in newQuote():\n${error}`);
    }
  } catch (error) {
    console.log(
      `Something went wrong getting datas:\n${error}\nUsing local quotes`
    );
    apiQuotes = localQuotes;
    newQuote(apiQuotes);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
btnNewQuote.addEventListener("click", () => {
  newQuote(apiQuotes);
});

btnTwitter.addEventListener("click", tweetQuote);

//on load
getQuotes(apiQuoteUrl);
