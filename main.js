const grid = new Muuri('.grid',{
    layout:{    
        rounding: false
    }    
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');
//Agregamos los listener de los enlaces para filtrar por categoria
    const enlaces =document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) => {
     
      elemento.addEventListener('click', (evento)=>{
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            console.log(categoria);
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
      });         
    });

    //Agregamos los listner para la barra de busqueda
    
    document.querySelector('#barra-busqueda').addEventListener('input',(evento) =>{

        const busqueda = evento.target.value;
       //console.log(busqueda);
       // grid.filter((item) => console.log(item.getElement().dataset.etiquetas));
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
    });

    //agregamos listener
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento)=> {
           //console.log(descripcion);

        elemento.addEventListener('click',() =>{
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
     

            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML =descripcion;

        });
    });

// eventlistner cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click',() =>{
        overlay.classList.remove('activo');
    });


// eventlistner del overlay  

overlay.addEventListener('click',(evento) =>{
        //overlay.classList.remove('activo');
      //  console.log(evento.target.id === 'overlay');
      evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
      
    });
});