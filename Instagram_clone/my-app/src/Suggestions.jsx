import React, { useEffect, useState } from "react";
import axios from "axios";

function Suggestions() {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/profile")
      .then((data) => data.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log(err));

    fetch("http://localhost:3000/suggestions")
      .then((data) => data.json())
      .then((data) => setSuggestions(data))
      .catch((err) => console.log(err));
  }, []);

  const handleFollow = async (id, username) => {
    axios
      .post("http://localhost:3000/followers", {
        id,
        username,
      })
      .then(() => alert("Followed"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-80 p-4 sticky top-4 bg-white shadow-md rounded-xl">

      {profile ? (
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={profile.user.profile_pic}
              alt="profilepic"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h5 className="font-semibold">{profile.user.username}</h5>
            <button className="cursor-pointer text-blue-500 text-sm hover:underline ">
              Switch
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

     
      <div className="flex justify-between items-center mb-3">
        <p className="text-gray-500 font-medium text-sm">Suggested for you</p>
        <b className="text-xs text-black cursor-pointer hover:underline">
          See All
        </b>
      </div>

      {Array.isArray(suggestions) && suggestions.length > 0 ? (
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={suggestion.profile_pic}
                    alt="profilepic"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="ml-3 text-sm font-medium">
                  {suggestion.username}
                </h5>
              </div>
              <button
                className="text-blue-500 text-sm font-semibold hover:underline cursor-pointer"
                onClick={() => handleFollow(suggestion.id, suggestion.username)}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-sm">Loading suggestions...</div>
      )}
    </div>
  );
}

export default Suggestions;
