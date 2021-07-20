import React, { useState, useEffect, useRef } from 'react';
import Notification from './components/Notification';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Toggleable from './components/Toggleable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [msgType, setMsgType] = useState(null);

  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject);

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
    } catch (err) {
      setMsgType('error');
      setMessage('Incorrect username or password');

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);

    setMsgType('error');
    setMessage('You have just logged out');

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleAdd = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject);

      setBlogs(blogs.concat(blog));

      setMsgType('success');
      setMessage(`You just added ${blog.title} by ${blog.author}`);

      blogFormRef.current.toggleVisibility();
    } catch (err) {
      setMsgType('error');
      setMessage(err.response.data.error);
    }

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleLike = async (blogId) => {
    try {
      const blogToUpdate = blogs.find(({ id }) => id === blogId);
      const updatedBlog = { ...blogToUpdate };
      updatedBlog.user = updatedBlog.user.id;
      updatedBlog.likes++;

      const returnedBlog = await blogService.update(updatedBlog);

      setBlogs(blogs.map((blog) => (blog.id !== blogId ? blog : returnedBlog)));
    } catch (err) {
      setMsgType('error');
      setMessage(err.response.data.error);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await blogService.remove(blogId);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (err) {
      setMsgType('error');
      setMessage(err.response.data.error);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <h1>Blogs</h1>
      <Notification message={message} msgType={msgType} />
      {user === null && (
        <Toggleable buttonLabel="login">
          <LoginForm handleLogin={handleLogin} />
        </Toggleable>
      )}
      {user !== null && (
        <>
          <div>
            {user.name} is logged in &nbsp;
            <button onClick={handleLogout}>logout</button>
          </div>
          <br />
          <Toggleable buttonLabel="create a blog" ref={blogFormRef}>
            <BlogForm handleAdd={handleAdd} />
          </Toggleable>
        </>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          username={user ? user.username : null}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};

export default App;
