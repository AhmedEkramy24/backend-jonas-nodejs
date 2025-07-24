module.exports = (card, ele) => {
  let output = card.replace(/{%NAME%}/g, ele.productName);
  output = output.replace(/{%IMAGE%}/g, ele.image);
  output = output.replace(/{%QUANTITY%}/g, ele.quantity);
  output = output.replace(/{%PRICE%}/g, ele.price);
  output = output.replace(/{%ID%}/g, ele.id);
  output = output.replace(/{%NUTRIENTS%}/g, ele.nutrients);
  output = output.replace(/{%FROM%}/g, ele.from);
  output = output.replace(/{%DESCRIPTION%}/g, ele.description);

  if (!ele.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};
