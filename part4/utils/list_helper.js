const blog = require('../models/blog');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (a, b) => (a.likes > b.likes ? a : b);

  return blogs.reduce(reducer, 0);
};

const mostBlogs = (blogs) => {
  const blogsWithUniqueAuthor = blogs.filter((blog, index, arr) => {
    return arr.findIndex(({ author }) => author === blog.author) === index;
  });
  const authors = blogsWithUniqueAuthor.map((blog) => {
    return {
      author: blog.author,
      blogs: 0,
    };
  });

  for (let author of authors) {
    for (const blog of blogs) {
      if (author.author === blog.author) {
        ++author.blogs;
      }
    }
  }

  const reducer = (a, b) => (a.blogs > b.blogs ? a : b);

  return authors.reduce(reducer, 0);
};

const mostLikes = (blogs) => {
  const blogsWithUniqueAuthor = blogs.filter((blog, index, arr) => {
    return arr.findIndex(({ author }) => author === blog.author) === index;
  });
  const authors = blogsWithUniqueAuthor.map((blog) => {
    return {
      author: blog.author,
      likes: 0,
    };
  });

  for (let author of authors) {
    for (const blog of blogs) {
      if (author.author === blog.author) {
        author.likes += blog.likes;
      }
    }
  }

  const reducer = (a, b) => (a.likes > b.likes ? a : b);

  return authors.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
