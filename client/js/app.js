//https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd
jQuery( document ).ready(function() {
  var priceSpan = jQuery('#avaxprice');


  async function grabPrice() {
    await fetch(`/api/price.json`)  //'http://example.com/movies.json'
    .then(response => response.json())
    .then(data => {
      console.log(data)
      console.log(`Fetched Price Data: ${data[0].price}`);
      //jQuery('#avaxprice').val(`$${data[0].price} USD / 1 AVAX`);
      jQuery('#avaxprice').html(`<img src="/img/avax.png" style=" width:10%;filter: drop-shadow(0px 0px 10px white);"><br>$${data[0].price} USD`);
    });
};
grabPrice();
  setInterval(async function () {
    grabPrice();
  }, 5000);
});
