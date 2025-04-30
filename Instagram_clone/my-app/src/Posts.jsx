import React, { useEffect, useState } from "react";
import { Send, Heart, MessageCircle } from "lucide-react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [visibleComments, setVisibleComments] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((data) => data.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="flex justify-center">
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="mb-8 border-b pb-4 w-80">
              {/* User Info */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={post.user.profile_pic}
                    alt="profilepic"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h5 className="font-semibold">{post.user.username}</h5>
                </div>
              </div>

              
              <img className="w-full rounded-md" src={post.image} alt="post" />

           
              <div className="flex items-center gap-4 my-4">
                <Heart className="w-6 h-6 cursor-pointer text-red-500" />
                <MessageCircle
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => toggleComments(post.id)}
                />
                <Send className="w-6 h-6 cursor-pointer" />
              </div>

         
              <div className="mb-1">
                <b>{post.likes} Likes</b>
              </div>
              <p className="mb-2 text-sm">{post.caption}</p>

              
              {visibleComments[post.id] && (
                <div className="ml-1 mt-2 p-2 bg-gray-100 rounded text-sm text-gray-800">
                  {post.comments && post.comments.length > 0 ? (
                    <>
                      <h6 className="font-bold mb-2">Comments:</h6>
                      {post.comments.map((c, i) => (
                        <div key={i} className="mb-1">
                          <span className="font-semibold">{c.user}: </span>
                          <span>{c.comment}</span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-gray-500 italic">No comments yet.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-500">Loading posts...</div>
      )}
    </div>
  );
}

export default Posts;
