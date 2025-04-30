import React, { useEffect, useState } from "react";

function Messages() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/followers")
      .then((res) => res.json())
      .then((data) => {
        setFollowers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching followers:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Messages</h2>

      {loading ? (
        <p>Loading followers...</p>
      ) : followers.length === 0 ? (
        <p>No followers found.</p>
      ) : (
        <div className="space-y-4">
          {followers.map((follower) => (
            <div key={follower.id} className="p-4 border rounded-lg shadow">
              <h3 className="font-semibold">{follower.username}</h3>
              <p className="text-gray-600">Start a conversation...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Messages;
