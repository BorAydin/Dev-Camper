// desc     Get all bootcamps
// @route   GET api/v1/bootcamps
// access   Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ succces: true, msg: 'Tüm eğitimleri göster' });
};

// desc     Get single bootcamps
// @route   GET api/v1/bootcamps/:id
// access   Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ succces: true, msg: `${req.params.id} idli eğitimi getir.` });
};

// desc     Create new bootcamp
// @route   POST api/v1/bootcamps
// access   Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ succces: true, msg: 'Yeni eğitim oluştur' });
};

// desc     Update bootcamp
// @route   PUT api/v1/bootcamps/:id
// access   Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ succces: true, msg: `${req.params.id} idli eğitimi güncelle.` });
};

// desc     Delete bootcamp
// @route   DELETE api/v1/bootcamps/:id
// access   Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ succces: true, msg: `${req.params.id} idli eğitimi sil.` });
};
