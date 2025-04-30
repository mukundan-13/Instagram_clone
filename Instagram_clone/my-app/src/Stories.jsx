import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Stories()
{

    const[stories,setStories]=useState([]);
    const navigate=useNavigate();
    let tot=0;
    useEffect(()=>{
        fetch('http://localhost:3000/story'). 
        then(data=>data.json()). 
        then(data=>setStories(data)). 
        catch(err=>console.log(err))
    },[]);
    return (
        
        <div className="h-32 flex">
            <div className="hidden">
            {tot=stories.length}
            </div>
            
            {  stories.length>0 ?(
                stories.map((story)=>(
                    <div key={story.id} onClick={()=>{navigate(`/story/${story.id}/${tot}`)}}>
                       <div className="w-[60px] h-[60px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 rounded-full p-[2px] flex items-center justify-center">
  <div className="bg-white rounded-full w-full h-full flex items-center justify-center cursor-pointer">
    <img
      src={story.user.profile_pic}
      alt=""
      className="w-[50px] h-[50px] rounded-full object-cover"
    />
  </div>
</div>

                        <p className="w-[120px] truncate">{story.user.username}</p>
                    </div>
                ))
            ):(
                <p>Loading</p>
            )}
        </div>
    )
}
export default Stories;