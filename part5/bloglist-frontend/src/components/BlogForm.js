import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setNotificationMessage, blogFormRef }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')


  const handleNewBlogForm = async (event) => {
    event.preventDefault()
    if (blogFormRef)
      blogFormRef.current.toggleVisibility()

      setNotificationMessage(`a new blog ${blogTitle} by ${blogAuthor} has been added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    const new_blog = await blogService.create({ title: blogTitle, author: blogAuthor, url: blogURL })
    setBlogs(blogs.concat(new_blog))
    setBlogTitle('')
    setBlogAuthor('')
    setBlogURL('')

    
  }

  return (
    <div>


      <h2>new blog entry</h2>
      <form onSubmit={handleNewBlogForm}>
        <div>
          title <input type='text'
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author <input type='text'
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url <input type='text'
            value={blogURL}
            name="URL"
            onChange={({ target }) => setBlogURL(target.value)}
          />
        </div>


        <button type='submit' className='submitButton'>submit</button>
      </form>

    </div>
  )
}

export default BlogForm