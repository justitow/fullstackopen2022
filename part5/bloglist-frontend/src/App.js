import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const new_user = JSON.parse(loggedUserJSON)
      setUser(new_user)
      blogService.setToken(new_user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogoutButton = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLikeButton = async (blog) => {
    const newBlog = await blogService.changeLike(blog, blog.likes + 1)
    console.log(newBlog)
    setBlogs(blogs.filter((val) => val.id !== blog.id).concat(newBlog).sort((a, b) => a.likes - b.likes))
  }


  return (
    <div>
      <Notification notificationMessage={notificationMessage}/>
      {
        user === null ?
          <LoginForm setUser={setUser} setNotificationMessage={setNotificationMessage}/> :
          <div>
            <div>{user.name} logged-in <button onClick={() => handleLogoutButton()}>log out</button></div>
            <Blog blogs={blogs} setBlogs={setBlogs} handleLikeButton={handleLikeButton}/>
            <Togglable buttonLabel={'Add New Blog'} ref={blogFormRef}>
              <BlogForm blogs={blogs} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage} blogFormRef={blogFormRef}/>
            </Togglable>
          </div>
      }
    </div>
  )
}

export default App
