import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const changeLike = async (blog, likeValue) => {
  const config = {
    headers: { Authorization: token }
  }

  const newObject = { ...blog, likes: likeValue, user: blog.user.id }
  const response = await axios.put(`${baseUrl}/${blog.id}`, newObject, config)
  return response.data
}

const blogService = { getAll, setToken, create, changeLike }
export default blogService