// enlace: https://69deafb5d6de26e11928224d.mockapi.io/productos

// lo qe yo digo de hacer es realizar un fetch a esa url y mostrar los productos en consola, luego mostrarlo en el html, cada producto con su nombre y precio




// okey eso lo hice con el tab lo dejo por las dudas 

fetch('https://69deafb5d6de26e11928224d.mockapi.io/productos')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Mostrar los productos en consola
  });   