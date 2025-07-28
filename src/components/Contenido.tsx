import React from 'react'

const Contenido = ({children}:any) => {
  return (
    <div className='p-[20px] lg:p-[40px]'>
        {children}
    </div>
  )
}

export default Contenido