import React, { useEffect, useState } from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import { ArrowLeftCircle,ArrowRightCircle } from "lucide-react";
// Import all assets eagerly
const images = import.meta.glob("/src/assets/*", { eager: true, import: "default" });

function ViewStory() {
  const { id,tot } = useParams();
  const [story, setStory] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3000/story/${id}`)
      .then((res) => res.json())
      .then((data) => setStory(data))
      .catch((err) => console.error("Error:", err));
  }, [id]);
  if(id>tot || id<=0){
    navigate("/");
  }
  if (!story) return <div>Loading...</div>;

  const storyImage = images["/" + story.image];
  //const profilePic = images["/" + story.user.profile_pic];

  return (
    <div className="flex items-center justify-center h-screen">
      <div key={story.id} className="text-center">
        {/* <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
            <img src={profilePic} alt="profile" className="w-full h-full object-cover" />
          </div>
          <h5 className="text-lg font-semibold">{story.user.username}</h5>
        </div> */}
  <div className="relative w-fit mx-auto mb-4">
  <Link
    to={`http://localhost:5173/story/${Number(id)-1}/${tot}`}
    className="absolute left-0 -translate-x-full top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
  >
    <ArrowLeftCircle className="w-8 h-8" />
  </Link>
  <h5 className="text-lg font-semibold">{story.user.username}</h5>
  <img src={storyImage} alt="story" className="w-64 h-auto rounded-md" />
  <Link
    to={`http://localhost:5173/story/${Number(id)+1}/${tot}`}
    className="absolute right-0 translate-x-full top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
  >
    <ArrowRightCircle className="w-8 h-8" />
  </Link>
</div>


       {/* <p className="text-gray-700">{story.content}</p> */}
      </div>
    </div>
  );
}

export default ViewStory;
