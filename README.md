# apiintigration


// start dummy json handle and then use pagination 

 1 fetch - in get , post , put , patch , delete 

     1 in fetch we use  res.json() why we use this  - fetch() doesn't actually return the data; it returns a "Response" object, which is like a sealed envelope.
      Pro-Tip: If the server was sending a profile picture instead of data, you would use res.blob() instead of res.json().


     2  achive paggination we need to limt the and key 
       fetch('https://dummyjson.com/RESOURCE/?limit=10&skip=5&select=key1,key2,key3');
   

     3 if we need to delay the resoponse then  
        fetch('https://dummyjson.com/RESOURCE/?delay=1000'); (seconde 1000 )
  
     4 authorizes users  
         fetch('https://dummyjson.com/auth/RESOURCE', {
         method: 'GET', /* or POST/PUT/PATCH/DELETE */
          headers: {
               'Authorization': 'Bearer /* YOUR_ACCESS_TOKEN_HERE */', 
            'Content-Type': 'application/json'
          }, 
       })
         .then(res => res.json())
        .then(console.log);
 

   conver to json to strify need to add in json not in fetch 
       

 
