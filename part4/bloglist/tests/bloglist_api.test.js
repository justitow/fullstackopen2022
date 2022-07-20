const helper = require('./test_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const create_token = async () => {
  await api
    .post('/api/users')
    .send({username: 'test', name: 'test', password: 'test'})
  const test_user_response = await api
    .post('/api/login')
    .send({username: 'test', password: 'test'})

  return test_user_response.body.token
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  
  const allBlogs = helper.initialBlogs.map( (blog) => new Blog(blog))
  const promiseArray = allBlogs.map(blog => blog.save())

  await Promise.all(promiseArray)
  
}, 100000)


describe('initial link to database', () => { 
test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('one of the names is initialized', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(blog => blog.author)
  expect(contents).toContain('Michael Chan')

})

})

describe('data model check', () => {

test('the unique idenitifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]
  expect(firstBlog.id).toBeDefined()
  expect(firstBlog._id).not.toBeDefined()
})

test('a new entry can be posted to the db', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)


  const new_entry = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
  const token = await create_token()
  await api.post('/api/blogs/')
    .auth(token, {type: 'bearer'})
    .send(new_entry)
    .expect(201)
    

  const new_blogs = await api.get('/api/blogs')
  const ids = new_blogs.body.map( blog => blog.id)
  expect(ids).toContain('5a422bc61b54a676234d17fc')
  expect(ids).toHaveLength(helper.initialBlogs.length + 1)
  
})

test('a missing like parameter is defaulted to zero', async () => {
  const new_id = "5a422bc61b54a676234d17fc"
  const new_entry = {
    _id: `${new_id}`,
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    __v: 0
  }

  const token = await create_token()

  await api.post('/api/blogs/')
    .auth(token, {type: 'bearer'})
    .send(new_entry)
    .expect(201)
  
  const result = await api.get(`/api/blogs/${new_id}`).expect(200)
  expect(result.body.likes).toBe(0)
})
})



describe('missing parameters', () => {
  test('missing author is posted correctly', async () => {
    const new_entry = {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
    const token = await create_token()
    await api.post('/api/blogs/')
      .auth(token, { type: 'bearer'})
      .send(new_entry)
      .expect(201)
  
    const blogs_after = await api.get('/api/blogs/')
    const blog_ids_after = blogs_after.body.map(blog => blog.id)
  
    expect(blog_ids_after).toContain('5a422bc61b54a676234d17fc')
  })

test('missing url returns error 400', async () => {
  const new_entry = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    likes: 2,
    __v: 0
  }
  const token = await create_token()
  await api.post('/api/blogs/')
    .auth(token, {type: 'bearer'})
    .send(new_entry)
    .expect(400)

  const blogs_after = await api.get('/api/blogs/')
  const blog_ids_after = blogs_after.body.map(blog => blog.id)

  expect(blog_ids_after).not.toContain('5a422bc61b54a676234d17fc')

})

test('missing title returns error 400', async () => {
  const new_entry = {
    _id: "5a422bc61b54a676234d17fc",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    author: "Robert C. Martin",
    likes: 2,
    __v: 0
  }
  const token = await create_token()

  await api.post('/api/blogs/')
    .auth(token, {type: 'bearer'})
    .send(new_entry)
    .expect(400)

  const blogs_after = await api.get('/api/blogs/')
  const blog_ids_after = blogs_after.body.map(blog => blog.id)

  expect(blog_ids_after).not.toContain('5a422bc61b54a676234d17fc')

})
})


describe('tests for deletion', () => {

test('deleting a single blog post', async () => {
  const delete_id = helper.initialBlogs[0]._id
  const token = await create_token()
  await api.delete(`/api/blogs/${delete_id}`)
    .auth(token, {type: 'bearer'})
    .expect(204)

  const blogs_after = await api.get('/api/blogs/')
  const blog_ids_after = blogs_after.body.map(blog => blog.id)

  expect(blog_ids_after).not.toContain(delete_id)

})


test('atempting to delete non-existant blog', async () => {
  const delete_id = "13412132321321321213213321321"
  const token = await create_token()
  await api.delete(`/api/blogs/${delete_id}`)
    .auth(token, {type: 'bearer'})
    .expect(400)

  const blogs_after = await api.get('/api/blogs/')
  const blog_ids_after = blogs_after.body.map(blog => blog.id)

  expect(blog_ids_after).toHaveLength(helper.initialBlogs.length)
})
})

describe('testing updating the information', () => {
test('updating the number of likes', async () => {
  const modify_id = helper.initialBlogs[0]._id
  //const curr_val_response = await api.get(`/api/blogs/${modify_id}`)
  //const new_value = {...curr_val_response.body, likes: 42}
  const new_value = {likes: 42}
  await api.put(`/api/blogs/${modify_id}`)
    .send(new_value)
    .expect(200)

  
})
})

describe('where we check the functionality of the user creation', () => {
  test('testing that a valid user can be added to the database', async () => {
    const new_user = {
      username: 'justitow',
      name: 'test',
      password: 'rekt'
    }

    const returned_user = await api.post('/api/users')
      .send(new_user)
      .expect(201)
  })
  test('where it is tested that a user cannot be created if one already exists within the database', async () => {
    const new_user = {
      username: 'justitow',
      name: 'test',
      password: 'rekt'
    }

    const returned_user = await api.post('/api/users')
      .send(new_user)
      .expect(201)

    const second_returned_user = await api.post('/api/users')
      .send(new_user)
      .expect(400)

    
  })
})

afterAll(() => {
  mongoose.connection.close()
})