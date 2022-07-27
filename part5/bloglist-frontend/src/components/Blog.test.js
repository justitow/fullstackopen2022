import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Togglable />', () => {

  let container
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blogs = [{ id: 1, author: 'test', url: 'this is the test URL', likes: 7, user:{ name:'justin' } }]
    container = render(
      <Blog blogs={blogs} handleLikeButton={mockHandler} />
    ).container
  })


  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })


  test('at start the children are not displayed', () => {
    const div = container.querySelector('.titleAndAuthor')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking a button calls the event handler', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking a button calls the event handler', async () => {

    const user = userEvent.setup()
    const button = container.querySelector('.likeButton')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})