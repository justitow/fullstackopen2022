const logger = require('./logger')
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (listOfLikes) => {  return listOfLikes.reduce( (sum, blog) =>  sum + Number(blog.likes), 0)
}

const favoriteBlog = (listOfLikes) => { return listOfLikes.reduce((max, blog) => max.likes < blog.likes ? blog: max)}

const mostBlogs = (listOfLikes) => {
  return _.map(_.countBy(listOfLikes, "author"), (val, key) => ({author: key, blogs: val})).reduce( (max, curr) => max.blogs < curr.blogs ? curr : max)
}

const mostLikes = (listOfLikes) => {
  var result = []
  listOfLikes.reduce( (res, value) => {
    if (!res[value.author]) {
      res[value.author] = {author: value.author, likes: 0};
      result.push(res[value.author])
      }
    res[value.author].likes += value.likes
    return res;
    }
  , {})
  return result.reduce( (max, curr) => max.likes < curr.likes ? curr : max)
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs, 
  mostLikes
}