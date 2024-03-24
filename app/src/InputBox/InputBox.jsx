import React from 'react'

function InputBox({setNewMessage,handelSubmit}) {
  return (
    <div className='flex items-center mt-4 px-10 gap-2'>
        <input onChange={(e)=>setNewMessage(e.target.value)} type="text" placeholder='Send a chat ...' className='focus:outline-none rounded-xl p-3 w-full border' />
        <div className='flex gap-4'>
        <i onClick={()=>handelSubmit()} class="cursor-pointer text-[20px] text-gray-500 fa-solid fa-paper-plane"></i>
        <i class="cursor-pointer text-[20px] text-gray-500 fa-solid fa-circle-plus"></i>
        </div>
    </div>
  )
}

export default InputBox