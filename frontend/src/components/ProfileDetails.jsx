import { useChatStore } from "../store/useChatStore";

const ProfileDetails = () => {
  const { selectedUser, setShowSelectedProfile } = useChatStore();
  return (
    <div className="profile-details w-4/5">
      {/* Profile Header */}
      <header className="flex justify-start items-center py-4 px-16 bg-secondary border-b-4 border-neutral">
        <span className="text-4xl font-bold pl-7 py-4">
          About This Account
        </span>

        <button
          className="ml-auto"
          onClick={() => setShowSelectedProfile(false)}
        >
          <img src="/info.svg" alt="Profile Info" />
        </button>
      </header>

      {/* Profile Information */}
      <main className="justify-self-center justify-center items-center p-32">
        <img
          src={selectedUser?.profilePic || ""}
          alt="Profile Picture"
          className="size-64 border-4 rounded-full  border-gray-300 dark:border-gray-400"
        />
        <div className="pt-6 space-y-6">
          {/* Name */}
          <div className="space-y-1.5">
            <div className="flex items-center text-sm pl-1">
              <img src="/person.svg" alt="Name" className="size-5 dark:hidden"/>
              <img src="/person-white.svg" alt="Name" className="size-5 hidden dark:inline"/>
              <span className="font-semibold px-2">Name</span>
            </div>
            <p className="bg-gray-200 rounded-lg border border-gray-300 px-6 py-2 text-black">
              {selectedUser?.name}
            </p>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <div className="flex items-center text-sm pl-1">
              <img src="/mail.svg" alt="Email Address" className="size-5 dark:hidden"/>
              <img src="/mail-white.svg" alt="Email Address" className="size-5 hidden dark:inline"/>
              <span className="font-semibold px-2">Email</span>
            </div>
            <p className="bg-gray-200 rounded-lg border border-gray-300 px-6 py-2 text-black">
              {selectedUser?.email}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileDetails;
