const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
);

exports.checkId = (req, res, next, val) => {
  const tour = tours.find(
    (tour) => tour.id === Number(val)
  );
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid body',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
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

exports.getTourById = (req, res) => {
  const id = req.params.id * 1; // convert string to number
  const tour = tours.find((el) => el.id === id);
  res
    .json({
      status: 'success',
      data: {
        tour,
      },
    })
    .status(200);
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);
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

exports.deleteTour = (req, res) => {
  const id = req.params.id;
  res.status(204).json({
    message: 'success',
    updatet: true,
    id,
  });
};
