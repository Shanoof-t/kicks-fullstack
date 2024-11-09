import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function AdminNavbar() {
  return (
    <div className=' bg-white p-3 shadow-md'>
      <div className='flex justify-end'>
        <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-5 py-3 flex items-center transition duration-300 ease-in-out'>
          LOGOUT
          <FontAwesomeIcon icon={faRightFromBracket} className='ml-2 text-lg' />
        </button>
      </div>
    </div>
  )
}

export default AdminNavbar
