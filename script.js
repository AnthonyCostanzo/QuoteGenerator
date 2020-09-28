// Get Quote From API
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const TwitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');

function loading()
{
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete()
{
    if(!loader.hidden)
    {
        quoteContainer.hidden = false;
        loader.hidden = true;
    } 
}

async function getQuote()
{
    //loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try
    {
        loading()
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If author is blank add unknown
        if(data.quoteAuthor === "")
        {
            authorText.innerText = 'Unknown'
        }
        else
        {
            authorText.innerText = data.quoteAuthor;
        }
        if(data.quoteText.length > 120)
        {
            quoteText.classList.add("long-quote");
        }
        else
        {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;
        // Stop loader
        complete();
    } catch (error) {
        getQuote();
        console.log('whoops, no quote', error);
    }
}

function tweetQuote()
{
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,"_blank");
}
TwitterBtn.onclick = tweetQuote;
newQuoteBtn.addEventListener('click',getQuote);

getQuote();