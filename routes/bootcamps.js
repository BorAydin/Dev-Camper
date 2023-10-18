const express = require(express);
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ succces: true, msg: 'Tüm eğitimleri göster' });
});

router.get('/:id', (req, res) => {
  res
    .status(200)
    .json({ succces: true, msg: `${req.params.id} idli eğitimi getir.` });
});

router.post('/', (req, res) => {
  res.status(200).json({ succces: true, msg: 'Yeni eğitim oluştur' });
});

router.put('/:id', (req, res) => {
  res
    .status(200)
    .json({ succces: true, msg: `${req.params.id} idli eğitimi güncelle.` });
});

router.delete('/:id', (req, res) => {
  res
    .status(200)
    .json({ succces: true, msg: `${req.params.id} idli eğitimi sil.` });
});

module.exports = router;
