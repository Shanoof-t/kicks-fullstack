import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! The page you're looking for doesn't exist.</p>
      <Link 
        to={"/"}
        className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
        Go Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
