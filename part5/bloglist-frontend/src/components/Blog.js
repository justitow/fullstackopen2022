import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blogs, handleLikeButton }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div >
      <h2>blogs</h2>
      <div>
        {blogs.sort((a, b) => a.likes - b.likes).map(blog => {
          return (
            <div key={blog.id} style={blogStyle} className='titleAndAuthor'> {blog.title} {blog.author}
              <Togglable buttonLabel="show">
                <div className='blogURL'>{blog.url}</div>
                <div>ls {blog.likes}<button className='likeButton' onClick={() => handleLikeButton(blog)}>like</button></div>
                <div>{blog.user.name}</div></Togglable>
            </div>
          )})}
      </div>
    </div>
  )}

export default Blog