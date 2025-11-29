

export function getCities (item) {
    return fetch(`https://students.netoservices.ru/fe-diplom/routes/cities?name=${item}`)
        .then(response => response.json())
        .then(function(data){
            return data
        })
        
}

export function getRoutes (url) {
  return  fetch( `https://students.netoservices.ru/fe-diplom/routes?${url}` )
    .then( response => response.json()
        .then( data => { return  data })
    );
}

export function getLast () {
   return fetch( 'https://students.netoservices.ru/fe-diplom/routes/last' )
    .then( response => response.json()) 
    .then( data => {return data})
}

export function getSeats (id) {
    return fetch( `https://students.netoservices.ru/fe-diplom/routes/${id}/seats` )
    .then( response => response.json())
    .then( data => {return data});
}

export function getSubcribe (email) {
    return fetch( `https://students.netoservices.ru/fe-diplom/subscribe?email=${email}`, {
        method: 'POST',
        body: ''
    } )
    .then( response => response.json())
    .then( data => { return data });
}


export function sendOrder (order) {
    return fetch( 'https://students.netoservices.ru/fe-diplom/order', {
        method: 'POST',
        body: order
      })
        .then( response => response.json())
        .then( data => { return data} );
}