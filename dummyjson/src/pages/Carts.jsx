import React, { useEffect, useState } from 'react'

const Carts = () => {
     cosnt[cartsdata ,setCartsdata] = useState([]);
     
     

     useEffect(() =>{
          
            fetch(`'https://dummyjson.com/carts`)
            .then(res => res.json())
            .then((data) =>{
                  setCartsdata(data.Carts)
            })
            .catch((err) => console.log("error fetching " , err))
            
     }, []) ; 



  return (
    <div>
         <h1>Carts data </h1>    
           
           
          
    </div>
  )
}

export default Carts
 