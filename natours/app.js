const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

app.use((req, res, next) => {
  console.log('this from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res
    .json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tours,
      },
    })
    .status(200);
};

const getTourById = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  Object.assign(tour, req.body);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to save data',
        });
      }
      res.status(200).json({
        status: 'success',
        message: 'Tour updated successfully',
        data: { tour },
      });
    }
  );
};

const deleteTour = (req, res) => {
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
};

// ROUTE HANDLERS

// // GET all tours
// app.get('/api/v2/tours', getAllTours);

// // GET spacific tour by ID
// app.get('/api/v2/tours/:id', getTourById);

// // POST a new tour
// app.post('/api/v2/tours', createTour);

// // PATCH update tour by id
// app.patch('/api/v2/tours/:id', updateTour);

// // DELETE tour
// app.delete('/api/v2/tours/:id', deleteTour);

app.route('/api/v2/tours').get(getAllTours).post(createTour);
app
  .route('/api/v2/tours/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
