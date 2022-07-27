import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser, setNotificationMessage }) => {
  const [usernameForm, setUsernameForm] = useState('')
  const [passwordForm, setPasswordForm] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: usernameForm, password: passwordForm
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsernameForm('')
      setPasswordForm('')
    } catch (exception) {
      console.log(exception)
      setNotificationMessage(exception.response.data.error.toString())
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }

  }


  return ( <>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
    username <input type='text'
          value={usernameForm}
          name="Username"
          onChange={({ target }) => setUsernameForm(target.value)}
        />
      </div>
      <div>
      password <input type='text'
          value={passwordForm}
          name="Password"
          onChange={({ target }) => setPasswordForm(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  </>
  )
}

export default LoginForm