const router = require('express').Router();
const { Category, Product } = require('../../models');


// get all categories
router.get('/', async (req, res) => {
  const data = await Category.findAll( {include: [{model: Product}]} ).catch((err) => res.status(500).json(err))
  res.status(200).json(data)
});


// get category by id
router.get('/:id', async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id, {include: [{model: Product}]} )
    if (!data) {
      res.status(404).json({ message: "No category with this id."})
      return;
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});


// post new category
router.post('/', async (req, res) => {
  const data = await Category.create(
    { category_name: req.body.category_name })
    .catch((err) => res.status(500).json(err))

  res.status(200).json({message: "Category created.", data})
});


// update category by id
router.put('/:id', async (req, res) => {
  try {
    const data = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } })
      .catch((err) => res.status(500).json(err))
    
    if (!data) {
      res.status(404).json({ message: "No category with this id."})
      return;
    }
    
    const newData = await Category.findByPk(req.params.id, {include: [{model: Product}]} )
    res.status(200).json({message: 'Category updated.', newData})

  } catch (err) {
    res.status(500).json(err)
  }
});


// delete category by id
router.delete('/:id', async (req, res) => {
  const data = await Category.destroy({
    where: {
      id: req.params.id
    }
  }).catch((err) => res.status(500).json(err))
  res.status(200).json({message: 'Category deleted.'})
});


module.exports = router;