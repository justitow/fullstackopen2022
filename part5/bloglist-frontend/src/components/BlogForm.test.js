import React from 'react'
import { useRef } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import Togglable from './Togglable'


describe('<Togglable />', () => {

  let container
  const mockSetBlogs = jest.fn()
  const mockSetNotificationMessage = jest.fn()


  beforeEach(() => {
    const blogs = [{ id: 1, author: 'test', url: 'this is the test URL', likes: 7, user:{ name:'justin' } }]
    container = render(
        <BlogForm blogs={blogs} setBlogs={mockSetBlogs} setNotificationMessage={mockSetNotificationMessage}/>
    ).container
  })

  test('clicking a button calls the event handler', async () => {

    const user = userEvent.setup()
    const button = container.querySelector('.submitButton')
    await user.click(button)

    expect(mockSetNotificationMessage.mock.calls).toHaveLength(1)
  })

})