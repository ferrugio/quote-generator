const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const btnTwitter = document.getElementById("twitter");
const btnNewQuote = document.getElementById("new-quote");

const apiQuoteUrl = "https:jacintodesign.github.io/quotes-api/data/quotes.json";

let apiQuotes = [];

// Show new quote
function newQuote(quotes) {
  // pick a random quote from quotes array
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  // Check if Author field is blank and replace it with 'Unknown'
  quoteAuthore.textContent = !quote.author ? "Unknown" : quote.author;

  // Check quote lenght to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
}

// Get Quotes from API
async function getQuotes(api_url) {
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
//if (apiQuotes.length !== 0) newQuote(apiQuotes);
