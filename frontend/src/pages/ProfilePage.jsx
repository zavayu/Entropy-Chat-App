import React, { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, logout, updateProfile } = useAuthStore();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
        await updateProfile({ profilePic: base64Image });
      }
    }
  };

  return (
    <div className="flex bg-secondary w-full">
      <Sidebar />
      {/* Profile Header */}
      <div className="w-full h-full">
        <header className="pl-12 px-24 pt-7">
          <span className="text-5xl font-bold pl-7 pb-4"> Profile</span>
          <hr className="w-10/12 border-2 m-0 fixed top-24 border-neutral" />
        </header>

        {/* Profile Information */}
        <main className="justify-self-center justify-center items-center p-32">
          {/* TODO: Implement Upload Picture */}
          <button
            className="transition-transform transform hover:scale-[104%] rounded-full "
            onClick={handleButtonClick}
          >
            <div className="absolute size-64 bg-gray-400 dark:bg-gray-700 bg-opacity-0 opacity-0 hover:opacity-100 rounded-full hover:bg-opacity-25 z-10">
              <img
                src="/pencil.svg"
                alt="Edit Profile Picture"
                className="size-20 absolute z-10 translate-x-[92px] translate-y-[92px]"
              />
            </div>

            <img
              src={selectedImage || authUser.profilePic}
              alt="Profile Picture"
              className="size-64 border-4 rounded-full border-gray-300 dark:border-gray-400"
            />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />

          <div className="pt-6 space-y-6">
            {/* Name */}
            <div className="space-y-1.5">
              <div className="flex items-center text-sm pl-1">
                <img
                  src="/person.svg"
                  alt="Name"
                  className="size-5 dark:hidden"
                />
                <img
                  src="/person-white.svg"
                  alt="Name"
                  className="size-5 hidden dark:inline"
                />
                <span className="font-semibold px-2">Name</span>
              </div>
              <p className="bg-gray-200 rounded-lg border border-gray-300 px-6 py-2 text-black">
                {authUser.name}
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <div className="flex items-center text-sm pl-1">
                <img
                  src="/mail.svg"
                  alt="Email Address"
                  className="size-5 dark:hidden"
                />
                <img
                  src="/mail-white.svg"
                  alt="Email Address"
                  className="size-5 hidden dark:inline"
                />
                <span className="font-semibold px-2">Email</span>
              </div>
              <p className="bg-gray-200 rounded-lg border border-gray-300 px-6 py-2 text-black">
                {authUser.email}
              </p>
            </div>
          </div>
        </main>

        {/* Logout Button */}
        <button onClick={logout} className="absolute right-10 bottom-10 flex">
          <span className="text-lg font-semibold underline pr-2">Logout</span>
          <img
            src="/logout_icon.svg"
            alt="Logout"
            className="size-9 -translate-y-1 dark:hidden"
          />
          <img
            src="/logout-white.svg"
            alt="Logout"
            className="size-9 -translate-y-1 hidden dark:inline"
          />
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
