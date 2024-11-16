import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-100 py-4'>
        <div className='container mx-auto px-4 lg:px-0 py-2'>
            <div className=''>
                <p>Copyright &copy;{ new Date().getFullYear() } {  process.env.NEXT_PUBLIC_APP_NAME }.</p>
            </div>
        </div>
    </div>
  )
}

export default Footer