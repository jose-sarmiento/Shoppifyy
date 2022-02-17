import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

/**
 * @desc    Fetch all products
 * @route   GET api/products
 * @access  public
 */
const getProducts = asyncHandler(async (req, res) => {
  // const pageSize = Number(req.query.pageSize) || 5
  // const page = Number(req.query.pageNumber) || 1

  // const keyword = req.query.keyword ? {
  //   name: {
  //     $regex: req.query.keyword,
  //     $options: 'i'
  //   }
  // } : {}

  // const count = await Product.count({...keyword})
  // const products = await Product.find({...keyword})
  //   .limit(pageSize)
  //   .skip(pageSize * (page - 1))

  res.json(res.paginatedResults)
  // res.json({products, page, pages: Math.ceil(count / pageSize)})
})

/**
 * @desc    Fetch all products
 * @route   GET api/products
 * @access  private
 */
const getAdminProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 5
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const count = await Product.count({...keyword})
  const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({products, page, pages: Math.ceil(count / pageSize)})
})

/**
 * @desc    Fetch top rated products
 * @route   GET api/products/top
 * @access  public
 */
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({rating: -1})
    .limit(3)

  if (products) {
    res.json(products)
  } else {
    res.status(404)
    throw new Error('Products Not Found')
  }
})

/**
 * @desc    Fetch single product by ID
 * @route   GET api/products/:id
 * @access  public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

/**
 * @desc    Delete a product
 * @route   DELETE api/products/:id
 * @access  private/admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({message: 'Product removed'})
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

/**
 * @desc    Create a product
 * @route   POST api/products
 * @access  private/admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    user: req.user._id,
    image: req.body.image,
    category: req.body.category,
    countInStock: req.body.countInStock,
    numReviews: 0,
    description: req.body.description
  })
  const createdProduct = await product.save()

  if (createdProduct) {
    res.status(201).json(createdProduct)
  } else {
    res.status(500)
    throw new Error('Something went wrong')
  }
})

/**
 * @desc    Update a product
 * @route   PUT api/products/:id
 * @access  private/admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = req.body.name
    product.price = req.body.price
    product.image = req.body.image
    product.brand = req.body.brand
    product.category = req.body.category
    product.countInStock = req.body.countInStock
    // product.numReviews = req.body.numReviews
    product.description = req.body.description

    const updatedProduct = await product.save()
    res.status(200).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

/**
 * @desc    Create new review
 * @route   POST api/products/:id/reviews
 * @access  private
 */
const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(review => {
      return review.user.toString() === req.user._id.toString()
    })

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name.firstname + " " + req.user.name.lastname,
      rating: Number(req.body.rating),
      comment: req.body.comment,
      user: req.user._id
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((total, item) => {
      return total + item.rating
    }, 0) / product.reviews.length

    await product.save()
    res.status(201)
    res.json({message: 'Review added'})
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { 
  getProducts,
  getAdminProducts,
  getProductById, 
  getTopProducts,
  deleteProduct, 
  createProduct, 
  updateProduct,
  createProductReview
}
