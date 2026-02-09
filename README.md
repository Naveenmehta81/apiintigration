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

total page

[...Array(totalpage)] Creates a new array with a length equal to your total pages (e.g., if totalpage is 10, it makes an array with 10 empty slots). 
The ... spreads them into a real array.
.map((_, i) => ( Loops through that array. The _ means "we don't care about the value," and i is the index (starts at 0).
key={i} Gives React a unique ID for each button so it can track changes efficiently.
onClick={() => setCurrentPage(i + 1)} Since i starts at 0, we add 1 to set the state to the correct page number (1, 2, 3...).
className={...} A Template Literal. It checks if the current page matches the button index. If yes, it paints it Orange; if no, it stays White.
{i + 1} This is the label the user sees inside the button (1, 2, 3...).
