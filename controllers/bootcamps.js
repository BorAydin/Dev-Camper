const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamp');

// desc     Get all bootcamps
// @route   GET api/v1/bootcamps
// access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`${req.params.id}'li bootcamp bulunamadı.`, 404)
    );
  }

  bootcamp.remove();

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

// desc     Upload photo for bootcamp
// @route   PUT api/v1/bootcamps/:id/photo
// access   Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`${req.params.id}'li bootcamp bulunamadı.`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Lütfen dosya yükleyiniz.`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.starsWith('image')) {
    return next(new ErrorResponse(`Lütfen fotoğraf dosyası yükleyiniz.`, 400));
  }

  // Check filesize
  if (!file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Lütfen fotoğraf boyutu ${process.env.MAX_FILE_UPLOAD} değerini aşmasın.`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Dosya yüklemede problem var.`, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      succces: true,
      data: file.name,
    });
  });
});
