import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [unfollowed, setUnfollowed] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/profile")
      .then((data) => setProfile(data.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/followers")
      .then((data) => setFollowers(data.data))
      .catch((err) => console.log(err));
  }, [unfollowed]);

  function onHandleOnChange(e) {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [name]: value,
      },
    }));
  }

  const handleUpdate = async () => {
    axios
      .put("http://localhost:3000/profile", profile)
      .then(() => alert("Profile updated"))
      .catch((err) => console.log(err));
  };

  const handleUnfollow = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/followers/${id}`);
      alert("Unfollowed successfully");
      setUnfollowed((prev) => !prev);
      setFollowers((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
    
      {profile ? (
        <div className="bg-white max-w-3xl mx-auto rounded-lg shadow-lg p-6 flex flex-col items-center gap-4 mb-10">
          <img
            src={profile.user.profile_pic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
          <h5 className="text-2xl font-semibold text-gray-800">{profile.user.username}</h5>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
            <input
              type="text"
              name="username"
              value={profile.user.username}
              onChange={onHandleOnChange}
              className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Username"
            />
            <input
              type="text"
              name="profile_pic"
              value={profile.user.profile_pic}
              onChange={onHandleOnChange}
              className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Profile Picture URL"
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg text-gray-600">Loading profile...</div>
      )}

      <div className="max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Followers</h3>
        {followers.length > 0 ? (
          followers.map((follower) => (
            <div
              key={follower.id}
              className="flex items-center justify-between bg-white shadow rounded-lg p-4 mb-3 hover:shadow-md transition-shadow"
            >
              <span className="text-gray-800 font-medium text-lg">{follower.username}</span>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
                onClick={() => handleUnfollow(follower.id)}
              >
                Unfollow
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-600 text-center">Loading followers...</div>
        )}
      </div>
    </div>
  );
}

export default Profile;
