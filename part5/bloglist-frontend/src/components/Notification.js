const Notification = ({ notificationMessage }) => {
  if (notificationMessage === null)
  {
    return null
  }

  return (
    <div>{`notification: ${notificationMessage}`}</div>
  )

}

export default Notification