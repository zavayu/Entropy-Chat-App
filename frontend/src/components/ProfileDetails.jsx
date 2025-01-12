
const ProfileDetails = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="profile-details">
      <h2>Profile Details</h2>
      <p>Name: John Doe</p>
      <p>Email:</p>
    </div>
  )
}

export default ProfileDetails