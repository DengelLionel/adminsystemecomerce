import React from 'react'

const UsuarioImagen = () => {
  return (
    <a href="#" className="flex items-center gap-x-2">
    <img
      className="object-cover rounded-full h-7 w-7"
      src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&h=634&q=80"
      alt="avatar"
    />
    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
      John Doe
    </span>
  </a>
  )
}

export default UsuarioImagen