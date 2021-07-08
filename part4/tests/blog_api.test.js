const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');

const api = supertest(app);
let thisToken;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }

  const passwordHash = await bcrypt.hash('secret', 10);
  const user = new User({
    username: 'hello',
    name: 'Thanh Binh',
    passwordHash,
  });

  await user.save();

  const userInfo = {
    username: 'hello',
    password: 'secret',
  };

  const res = await api.post('/api/login').send(userInfo);
  thisToken = res.body.token;
});

describe('when there is initially some notes saved', () => {
  test('return the right amount of blog', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(res.body).toHaveLength(helper.initialBlogs.length);
  });

  test('unique identifier of blog is named "id"', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(res.body[0].id).toBeDefined();
  });

  describe('add a blog', () => {
    test('succeeds with valid data', async () => {
      const blog = {
        title: 'Test add blog',
        author: 'Thanh Binh',
        url: 'abc.xyz',
        like: 5,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${thisToken}`)
        .send(blog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogs = await helper.blogsInDB();
      expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
      expect(blogs.map(({ title }) => title)).toContain(blog.title);

      const addedBlog = blogs.find(({ title }) => title === blog.title);
      expect(addedBlog.user.username).toEqual('hello');

      const users = await helper.usersInDB();
      expect(users[0].blogs[0].title).toEqual(blog.title);
    });

    test('fail with 401 if token is invalid or not provided', async () => {
      const blog = {
        title: 'Test add blog',
        author: 'Thanh Binh',
        url: 'abc.xyz',
        like: 5,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer dwqeqweqw`)
        .send(blog)
        .expect(401);

      const blogs = await helper.blogsInDB();
      expect(blogs).toHaveLength(helper.initialBlogs.length);
      expect(blogs.map(({ title }) => title)).not.toContain(blog.title);
    });

    test('if likes is missing, default to 0', async () => {
      const blog = {
        title: 'Test add blog',
        author: 'Thanh Binh',
        url: 'abc.xyz',
      };
      if (blog.likes === undefined) {
        blog.likes = 0;
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${thisToken}`)
        .send(blog)
        .expect(200);

      const blogs = await helper.blogsInDB();
      expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
      expect(blogs.find(({ title }) => title === blog.title).likes).toEqual(0);
    });

    test('if title, url are missing, fail with 400', async () => {
      const blog = {
        author: 'Thanh Binh',
        likes: 5,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${thisToken}`)
        .send(blog)
        .expect(400);

      const blogs = await helper.blogsInDB();
      expect(blogs).toHaveLength(helper.initialBlogs.length);
    });
  });

  describe('deletion of a blog', () => {
    test('succeeds with 204 if id is valid', async () => {
      const blog = {
        title: 'Test add blog',
        author: 'Thanh Binh',
        url: 'abc.xyz',
        like: 5,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${thisToken}`)
        .send(blog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsBefore = await helper.blogsInDB();
      const blogToDelete = blogsBefore.find(
        ({ title }) => title === blog.title
      );

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${thisToken}`)
        .expect(204);

      const blogsAfter = await helper.blogsInDB();

      expect(blogsAfter).toHaveLength(helper.initialBlogs.length);
      expect(blogsAfter.map(({ title }) => title)).not.toContain(
        blogToDelete.title
      );
    });

    test('fails if token is invalid or not provided', async () => {
      const blogsBefore = await helper.blogsInDB();
      const blogToDelete = blogsBefore[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer asdqeq`)
        .expect(401);

      const blogsAfter = await helper.blogsInDB();

      expect(blogsAfter).toHaveLength(helper.initialBlogs.length);
      expect(blogsAfter.map(({ title }) => title)).toContain(
        blogToDelete.title
      );
    });
  });

  describe('updating a blog', () => {
    test('succeeds with 200 if id is valid', async () => {
      const blogsBefore = await helper.blogsInDB();
      const blogToUpdate = blogsBefore[0];
      blogToUpdate.likes++;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200);

      const blogsAfter = await helper.blogsInDB();
      expect(blogsAfter).toHaveLength(helper.initialBlogs.length);
      expect(blogsAfter[0].likes).toEqual(helper.initialBlogs[0].likes + 1);
    });

    test('fails with 400 if id is invalid', async () => {
      const blogsBefore = await helper.blogsInDB();
      const blogToUpdate = blogsBefore[0];
      blogToUpdate.id = 'invalid';
      blogToUpdate.likes++;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(400);

      const blogsAfter = await helper.blogsInDB();
      expect(blogsAfter).toHaveLength(helper.initialBlogs.length);
      expect(blogsAfter[0].likes).toEqual(helper.initialBlogs[0].likes);
    });

    test('fails with 404 if id is non exist', async () => {
      const validNonExistId = await helper.nonExistingId();
      const blogToUpdate = {
        title: 'Test update blog',
        author: 'Thanh Binh',
        url: 'abc.xyz',
        like: 5,
        id: validNonExistId,
      };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(404);

      const blogsAfter = await helper.blogsInDB();
      expect(blogsAfter).toHaveLength(helper.initialBlogs.length);
      expect(blogsAfter.map(({ title }) => title)).not.toContain(
        blogToUpdate.title
      );
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
