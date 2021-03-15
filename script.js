
const newQuote = document.querySelector("#newquote");
const twitterBtn = document.querySelector("#twitter");
const quoteContainer = document.querySelector("#quote-container")

async function getQuote() {

  const endpoint = "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"
  try {
    quoteContainer.hidden = true;
    loader.hidden = false;
    const blob = await fetch(proxyUrl + endpoint);
    const quoteJSON = await blob.json();
    if (quoteJSON.quoteText.length > 120) {
      quote.classList.add("long-quote")
    } else {
      quote.classList.remove("long-quote")
    }
    quote.innerText = quoteJSON.quoteText;

    if (quoteJSON.quoteAuthor == "") {
      author.innerText = "Unknown";
    } else {
      author.innerText = quoteJSON.quoteAuthor;
    }
    quoteContainer.hidden = false;
    loader.hidden = true;
  } catch (error) {
    getQuote()
    console.log(error)
  }

}

function twitter() {
  const twitterUrl = `https://twitter.com/intent/tweet/?text=${quote.innerText}  ${author.innerText}`
  window.open(twitterUrl, "_blank")
}



newQuote.addEventListener("click", getQuote)
twitterBtn.addEventListener("click", twitter);

//on Load
getQuote();