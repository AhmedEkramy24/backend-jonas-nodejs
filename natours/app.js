const express = require('express');
const app = express();

const fs = require('fs');

// app.get('/', (req, res) => {
//   //   res.status(200).send('Hello form server side');
//   res.status(404).json({ message: 'Hello form server side' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);

app.get('/api/v2/tours', (req, res) => {
  res
    .json({
      status: 'success',
      data: {
        tours,
      },
    })
    .status(200);
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
