// import React from 'react'

// eslint-disable-next-line react/prop-types
const Square = ({value,onClick}) => {
  return (
    <div onClick={onClick} className='border-solid border-[1px] border-black h-24 w-24 flex items-center justify-center'>
      <h5 className={value==="X" ?"text-blue-800 font-bold text-xl":"text-rose-950 font-bold text-xl"}>{value}</h5>
    </div>
  )
}

export default Square
