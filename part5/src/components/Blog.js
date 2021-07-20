import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleLike, username, handleDelete }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [isDetail, setIsDetail] = useState(false);

  const handleDetail = () => {
    setIsDetail(!isDetail);
  };

  const handleLikeButton = () => {
    handleLike(blog.id);
  };

  const handleDeleteButton = () => {
    const result = window.confirm(
      `Do you really want to delete ${blog.title} by ${blog.author} ?`
    );
    if (result) {
      handleDelete(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        &nbsp;
        <button onClick={handleDetail}>{isDetail ? 'hide' : 'show'}</button>
      </div>
      <div style={{ display: isDetail ? '' : 'none' }}>
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes}
          &nbsp;
          <button onClick={handleLikeButton}>like</button>
        </p>
        <p>Uploaded by {blog.user.name}</p>
        {username === blog.user.username && (
          <button onClick={handleDeleteButton}>delete</button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
