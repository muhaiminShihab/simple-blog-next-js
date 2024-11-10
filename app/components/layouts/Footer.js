import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-200 py-4'>
        <div className='container mx-auto px-4 lg:px-0 py-2'>
            <div className=''>
                <p>Copyright &copy; { new Date().getFullYear() } Muhaimin Shihab</p>
            </div>
        </div>
    </div>
  )
}

export default Footer