import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Suggestions from './Suggestions'
function App()
{
    return(
      <div className="flex h-screen text-xl">
        <div className="w-1/6"><Sidebar/></div>
        <div className="w-1/2 "><Feed/></div>
        <div className="flex-[0.3]"><Suggestions/></div>
      </div>
    )
}
export default App