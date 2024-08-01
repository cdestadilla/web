document.addEventListener("DOMContentLoaded", function () {
    // Cargar los partidos
    fetch("../json/calendario.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const { partidos } = data;

            // Filtrar partidos que aún no han pasado
            const partidosFuturos = filtrarPartidosFuturos(partidos).slice(0, 124);

            // Mostrar los partidos filtrados en la página
            populatePartidos("partidos", partidosFuturos);

            // Aquí puedes guardar el JSON actualizado si es necesario
            data.partidos = partidosFuturos;
            console.log(JSON.stringify(data, null, 2)); // Mostrar en consola el JSON actualizado
        })
        .catch(error => console.error('Error loading JSON:', error));

    function populatePartidos(sectionId, partidos) {
        const section = document.getElementById(sectionId);
        section.innerHTML = '';  // Limpiar el contenido previo
        partidos.forEach(partido => {
            const partidoDiv = document.createElement("div");
            partidoDiv.classList.add("partido");

            const equipoLocalDiv = document.createElement("div");
            equipoLocalDiv.classList.add("equipo", "EqLocal");

            const localH4 = document.createElement("h4");
            localH4.textContent = "LOCAL";
            equipoLocalDiv.appendChild(localH4);

            const localImg = document.createElement("img");
            localImg.src = partido.local.imagen;
            equipoLocalDiv.appendChild(localImg);

            const localNombreH4 = document.createElement("h4");
            localNombreH4.textContent = partido.local.nombre;
            equipoLocalDiv.appendChild(localNombreH4);

            partidoDiv.appendChild(equipoLocalDiv);

            const fechaDiv = document.createElement("div");
            fechaDiv.id = "fecha";

            const fechaH3 = document.createElement("h3");
            fechaH3.textContent = partido.fecha;
            fechaDiv.appendChild(fechaH3);

            const horaH4 = document.createElement("h4");
            horaH4.textContent = partido.hora;
            fechaDiv.appendChild(horaH4);

            partidoDiv.appendChild(fechaDiv);

            const equipoVisitanteDiv = document.createElement("div");
            equipoVisitanteDiv.classList.add("equipo", "EqVisitante");

            const visitanteH4 = document.createElement("h4");
            visitanteH4.textContent = "VISITANTE";
            equipoVisitanteDiv.appendChild(visitanteH4);

            const visitanteImg = document.createElement("img");
            visitanteImg.src = partido.visitante.imagen;
            equipoVisitanteDiv.appendChild(visitanteImg);

            const visitanteNombreH4 = document.createElement("h4");
            visitanteNombreH4.textContent = partido.visitante.nombre;
            equipoVisitanteDiv.appendChild(visitanteNombreH4);

            partidoDiv.appendChild(equipoVisitanteDiv);

            section.appendChild(partidoDiv);
        });
    }

    function filtrarPartidosFuturos(partidos) {
        const now = new Date();
        return partidos.filter(partido => {
            const fechaHora = new Date(partido.fecha + 'T' + partido.hora + ':00');
            return fechaHora > now;
        });
    }
});
