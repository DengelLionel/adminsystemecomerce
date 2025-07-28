import React from 'react'

const ContenidoAdminIzquierda = ({children}:any) => {
  return (
    <div className='bg-white rounded-[20px] w-full md:w-[600px] h-auto p-[20px]'>
      {children}
    </div>
  )
}

export default ContenidoAdminIzquierda