import React from 'react'
import { MdOutlineVideocamOff } from 'react-icons/md'
import { BiCommentX } from 'react-icons/bi'

const NoResults = ({ message, noClips, noComments }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-1 text-sm w-full h-full'>
      {noClips && <MdOutlineVideocamOff className='text-8xl' />}
      {noComments && <BiCommentX className='text-7xl' />}
      <p>{message}</p>
    </div>
  )
}

export default NoResults