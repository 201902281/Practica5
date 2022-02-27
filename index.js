
const pantallaInicio = () => {
    $("#info").addClass("esconder");
    $("#inicio").removeClass("esconder");
}


let entradas = [];
const getAllEntries = async () => {
    pantallaInicio();
    let request = await fetch("https://inshortsapi.vercel.app/news?category=" + $( "#categoria-escogida option:selected" ).attr("id"));
    if( request.status == 200){
        let datos = await request.json();
        entradas = datos.data; 
        $("#noticias-disponibles").empty();
        for(let i=0;i<entradas.length/2;i++){
            añadirBoton(i);
        }
    }
}

getAllEntries();


const mostrarInfo = () => {
    $("#inicio").addClass("esconder");
    $("#info").removeClass("esconder");
}

const showEntrada = (key) => {

    const entrada = entradas[key];
    $("#info-imagen").attr("src",entrada.imageUrl);
    $("#info-link").attr("href",entrada.readMoreUrl);
    $("#info-titulo").html(entrada.title);
    $("#info-comentario").html(entrada.content);
    $("#info-fecha").html(entrada.date);
    $("#info-autor").html(entrada.author);
    mostrarInfo();
}

const añadirBoton = (numero) => {
    const nuevoElemento = `<button id="${numero}" class="list-group-item list-group-item-action botones-de-info">${entradas[numero].title}</button>`;
    $("#noticias-disponibles").append(nuevoElemento);

    $("#" + numero).on("click", () =>{
        showEntrada(numero);
    })
}

