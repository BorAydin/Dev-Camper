const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamp');

// desc     Get all bootcamps
// @route   GET api/v1/bootcamps
// access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, $lt, $lte, $in)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' '); // İstekteki parametre alanları , ile ayrıldığı için önce diziye çevirip, boşluklu olacak şekilde String dönüşümünü join(' ') yapıyoruz. Boşluğun sebebi mongoose tarafı dökümantasyon query.select( 'name occupation' ) biçiminde çalışması. Araya, ortaya boşluk.
    query = query.select(fields);
  }

  // Executing query
  const bootcamps = await query;

  res
    .status(200)
    .json({ succces: true, count: bootcamps.length, data: bootcamps });
});

// desc     Get single bootcamps
// @route   GET api/v1/bootcamps/:id
// access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`${req.params.id}'li bootcamp bulunamadı.`, 404)
    );
  }

  res.status(200).json({ succces: true, data: bootcamp });
});

// desc     Create new bootcamp
// @route   POST api/v1/bootcamps
// access   Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    succces: true,
    data: bootcamp,
  });
});

// desc     Update bootcamp
// @route   PUT api/v1/bootcamps/:id
// access   Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`${req.params.id}'li bootcamp bulunamadı.`, 404)
    );
  }

  res.status(200).json({ succces: true, data: bootcamp });
});

// desc     Delete bootcamp
// @route   DELETE api/v1/bootcamps/:id
// access   Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`${req.params.id}'li bootcamp bulunamadı.`, 404)
    );
  }

  res.status(200).json({ succces: true, data: {} });
});

// @desc    Get bootcamps within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 6378;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    succces: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
