const express = require('express');
const app = express();
app.use(express.json());
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// ROUTE HANDLERS

// GET all tours
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

// GET spacific tour by ID
app.get('/api/v2/tours/:id', (req, res) => {
  const id = req.params.id * 1; // convert string to number
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res
    .json({
      status: 'success',
      data: {
        tour,
      },
    })
    .status(200);
});

// POST a new tour
app.post('/api/v2/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// PATCH update tour by id

app.patch('/api/v2/tours/:id', (req, res) => {
  const id = req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      message: 'Invalid id',
    });
  }
  res
    .json({
      message: 'success',
      updatet: true,
      id,
    })
    .status(200);
});

// DELETE tour

app.delete('/api/v2/tours/:id', (req, res) => {
  const id = req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      message: 'Invalid id',
    });
  }
  res.status(204).json({
    message: 'success',
    updatet: true,
    id,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
