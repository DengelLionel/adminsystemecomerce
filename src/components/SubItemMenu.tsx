import React from 'react'
import Link from 'next/link'
const SubItemMenu = ({Titulo, Icono,ruta="/administra"}:any) => {
  return (
    <Link
    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
    href={ruta}
  >
   {Icono}

    <span className="mx-2 text-sm font-medium">{Titulo}</span>
  </Link>
  )
}

export default SubItemMenu