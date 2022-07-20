const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({...body, user: user._id})

  const savedNote = await blog.save()
  user.blogs = user.blogs.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }
  //const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if (request.userId === blog.user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
  else {
    return response.status(401).json({ error: 'only post creator can delete a post'})
  } 

  
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {author: body.author,
                url: body.url,
                title: body.title,
                likes: body.likes}
  await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(blog)
})

module.exports = blogsRouter