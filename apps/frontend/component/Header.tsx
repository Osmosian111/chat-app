import React from 'react'

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-black p-3">
      <h2 className='text-2xl'>My Chats</h2>
      <div>
        <button className='bg-blue-500 p-2 pl-2.5 pr-2.5 border-white-2 rounded-md'>Logout</button>
      </div>
    </div>
  )
}

export default Header