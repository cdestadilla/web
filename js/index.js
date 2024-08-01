document.addEventListener("DOMContentLoaded", function () {
    fetch("json/noticias.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const { noticias } = data;
            populateNoticias("noticias", noticias);
        })
        .catch(error => console.error('Error loading JSON:', error));

    function populateNoticias(sectionId, noticias) {
        const section = document.getElementById(sectionId);
        section.innerHTML = '';  // Limpiar el contenido previo
        noticias.forEach(noticia => {
            const noticiaDiv = document.createElement("div");
            noticiaDiv.classList.add("noticia");
    
            const titleH4 = document.createElement("h4");
            titleH4.textContent = noticia.titulo;
            noticiaDiv.appendChild(titleH4);
    
            const contentDiv = document.createElement("div");
    
            const img = document.createElement("img");
            img.src = noticia.imagen;
            contentDiv.appendChild(img);
    
            const contentP = document.createElement("p");
            contentP.innerHTML = noticia.contenido;
            contentDiv.appendChild(contentP);
    
            noticiaDiv.appendChild(contentDiv);
            section.appendChild(noticiaDiv);
        });
    }
});