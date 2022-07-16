const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {
  test('of a list with no values', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('of a list with one item with 5 likes', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })


  const listWithOneBlogWithZeroLikes = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    }
  ]

  test('of a list with one item with zero likes', () => {
    expect(listHelper.totalLikes(listWithOneBlogWithZeroLikes)).toBe(0)
  })


  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '321321321321321331',
      title: 'Other Blogs',
      author: 'Zero Blanks',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/OtherThings_And_Stuff.html',
      likes: 10,
      __v: 0
    }
  ]

  test('of a list with two items', () => {
    expect(listHelper.totalLikes(listWithTwoBlogs)).toBe(15)
  })

})


describe('favoriteBlog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('of a list with one item with 5 likes', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  const listWithTwoBlogs = [
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '321321321321321331',
    title: 'Other Blogs',
    author: 'Zero Blanks',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/OtherThings_And_Stuff.html',
    likes: 10,
    __v: 0
  }
]

test('of a two lists with different numbers of likes', () => {
  expect(listHelper.favoriteBlog(listWithTwoBlogs)).toEqual(listWithTwoBlogs[1])
})


const listWithTwoBlogsSameLikes = [
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '321321321321321331',
    title: 'Other Blogs',
    author: 'Zero Blanks',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/OtherThings_And_Stuff.html',
    likes: 5,
    __v: 0
  }
  ]

  test('of a two lists with different numbers of likes', () => {
  expect(listHelper.favoriteBlog(listWithTwoBlogsSameLikes)).toEqual(listWithTwoBlogsSameLikes[0])
  })
})


describe('mostBlogs', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const outputlistWithOneBlog = { author: 'Edsger W. Dijkstra', blogs: 1 }


  test('of a list with one blog', () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(outputlistWithOneBlog)
  })


  const authorTwoBlogsAuthorOneBlog = [
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '321321321321321331',
    title: 'Other Blogs',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/OtherThings_And_Stuff.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '1234sfsar3421dsasdas',
    title: 'Other Blogs',
    author: 'Tedd',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/OtherThings_And_Stuff.html',
    likes: 5,
    __v: 0
  }
  ]

  const outputauthorTwoBlogsAuthorOneBlog = { author: 'Edsger W. Dijkstra', blogs: 2 }

  test('of a list with one blog', () => {
    expect(listHelper.mostBlogs(authorTwoBlogsAuthorOneBlog)).toEqual(outputauthorTwoBlogsAuthorOneBlog)
  })
}
)

describe('mostLikes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const outputlistWithOneBlog = { author: 'Edsger W. Dijkstra', likes: 5 }


  test('of a list with one blog', () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual(outputlistWithOneBlog)
  })


  const authorTwoBlogsAuthorOneBlog = [
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '321321321321321331',
    title: 'Other Blogs',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/OtherThings_And_Stuff.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '1234sfsar3421dsasdas',
    title: 'Other Blogs',
    author: 'Tedd',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/OtherThings_And_Stuff.html',
    likes: 5,
    __v: 0
  }
  ]

  const outputauthorTwoBlogsAuthorOneBlog = { author: 'Edsger W. Dijkstra', likes: 10 }

  test('of a list with one blog', () => {
    expect(listHelper.mostLikes(authorTwoBlogsAuthorOneBlog)).toEqual(outputauthorTwoBlogsAuthorOneBlog)
  })
})