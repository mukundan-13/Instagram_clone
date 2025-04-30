import React from "react";
import { useNavigate } from "react-router-dom";
import {Home,Search,Compass,Film,MessageCircle,Heart,PlusSquare,User,Hash,MoreHorizontal} from 'lucide-react';
function Sidebar()
{
    const navigate=useNavigate();
    return(
        <div className="m-3 fixed">
        <div className="flex flex-col gap-4">
            <img src="src/assets/logo (2).png" alt="" className="w-[150px]"/>
            <div className="flex items-center gap-2"><Home className="w-5 h-5"/>Home</div>
            <div className="flex items-center gap-2"><Search className="w-5 h-5"/> Search</div>
            <div className="flex items-center gap-2"><Compass className="w-5 h-5"/>Explore</div>
            <div className="flex items-center gap-2"><Film className="w-5 h-5"/>Reels</div>
            <div className="flex items-center gap-2" onClick={()=>{navigate('/messages')}}><MessageCircle className="w-5 h-5 cursor-pointer"/>Messages</div>
            <div className="flex items-center gap-2"><Heart className="w-5 h-5"/>Notifications</div>
            <div className="flex items-center gap-2"><PlusSquare className="w-5 h-5"/>Create</div>
            <div className="flex items-center gap-2" onClick={()=>{navigate('/profile')}}><User className="w-5 h-5 cursor-pointer"/>Profile</div>
        </div>
        <div className="fixed bottom-6 w-full flex flex-col gap-4">
            <div className="flex items-center gap-2"><Hash className="w-5 h-5"/>Threads</div>
            <div className="flex items-center gap-2"><MoreHorizontal className="w-5 h-5"/>More</div>
        </div>
        </div>
    )
}
export default Sidebar