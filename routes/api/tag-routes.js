const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// get all tags
router.get('/', async (req, res) => {
  const data = await Tag.findAll( {
    include: [{
      model: Product,
      through: ProductTag,
      as: 'tags_products' // ex 2 did work
     },
    ]})
  .catch((err) => res.status(500).json(err))

  res.status(200).json(data)
});


// get tag by id
router.get('/:id', async (req, res) => {
  try {
    const data = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag,
        as: 'tags_products' // ex 2 did work
       },
      ]})
    if (!data) {
      res.status(404).json({message: 'No tag with this id.'})
      return;
    } 
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err)
  }
});


// post a new tag
router.post('/', async (req, res) => {
  const data = await Tag.create(
    { tag_name: req.body.tag_name })
    .catch((err) => res.status(500).json(err))
  
  res.status(200).json({message: "Tag created.", data})
});


// update a tag by id
router.put('/:id', async (req, res) => {
  try {
    const data = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } })
      .catch((err) => res.status(500).json(err))
    
    if (!data) {
      res.status(404).json({ message: "No tag with this id."})
      return;
    }
    res.status(200).json({ message: "Tag updated."})

  } catch (err) {
    res.status(500).json(err)
  }
});


// delete a tag by id
router.delete('/:id', async (req, res) => {
  const data = await Tag.destroy({
    where: {
      id: req.params.id
    }
  }).catch((err) => res.status(500).json(err))
  res.status(200).json({message: `Tag deleted.`})
});


module.exports = router;