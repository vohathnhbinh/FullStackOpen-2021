const blogsRouter = require('express').Router();
const { isValidObjectId } = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user');
  res.status(200).json(blogs);
});

blogsRouter.post('/', userExtractor, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  const blog = new Blog(req.body);
  if (blog.likes === undefined) {
    blog.likes = 0;
  }

  if (blog.title === undefined && blog.url === undefined) {
    return res.status(400).end();
  }

  const user = await User.findById(req.user.id);
  blog.user = user._id;

  const result = await blog.save();

  user.blogs.push(result._id);
  await user.save();
  res.status(200).json(result);
});

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (blog.user.toString() !== req.user.id) {
    console.log('ok');
    return res.status(401).json({ error: 'Not creator of blog' });
  }
  console.log('ok');
  await Blog.findByIdAndDelete(id);
  res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    return res.status(400).end();
  }

  const blog = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  if (updatedBlog) {
    res.status(200).json(updatedBlog);
  } else {
    res.status(404).end();
  }
});

module.exports = blogsRouter;
