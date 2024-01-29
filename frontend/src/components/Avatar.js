import React from 'react'

const Avatar = ({ src }) => {
    return (
    <div>
        <img 
            className='size-10 object-cover rounded-full cursor-pointer'
            src={src}
            alt='User profile'
        />
    </div>
  )
}

export default Avatar