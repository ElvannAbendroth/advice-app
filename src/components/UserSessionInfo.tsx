import { useStore } from '@nanostores/react'
import { $authStore, $userStore } from '@clerk/astro/client'

export default function UserSessionInfo() {
  const { userId, sessionId } = useStore($authStore)
  const user = useStore($userStore)

  //In case the user signs out while on the page.
  if (!userId || !user) {
    return null
  }

  return (
    <div>
      <h2 className="typo-h3">User Info</h2>
      <p>
        <span className="font-bold">Active Session ID: </span>
        {sessionId}
      </p>
      <p>
        <span className="font-bold">Username: </span>
        {JSON.stringify(user?.fullName).slice(1, -1)}
      </p>

      <p>
        <span className="font-bold">Email: </span>
        {JSON.stringify(user?.primaryEmailAddress?.emailAddress).slice(1, -1)}
      </p>
      <p>
        {' '}
        <span className="font-bold">User ID:</span> {userId}
      </p>
    </div>
  )
}
