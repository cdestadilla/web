document.addEventListener("DOMContentLoaded", function () {
    fetch("../json/jugadores.json")
        .then(response => response.json())
        .then(data => {
            const { porteros, defensas, centrocampistas, delanteros } = data.jugadores;
            populateSection("porteros", porteros);
            populateSection("defensas", defensas);
            populateSection("centrocampistas", centrocampistas);
            populateSection("delanteros", delanteros);
        })
        .catch(error => console.error('Error loading JSON:', error));

    function populateSection(sectionId, players) {
        const section = document.getElementById(sectionId);
        players.forEach(player => {
            const playerDiv = document.createElement("div");
            playerDiv.classList.add("jugador");

            const img = document.createElement("img");
            img.src = player.imagen;
            playerDiv.appendChild(img);

            const nameP = document.createElement("p");
            nameP.textContent = `Nombre: ${player.nombre}`;
            playerDiv.appendChild(nameP);

            if (player.dorsal !== undefined) {
                const dorsalP = document.createElement("p");
                dorsalP.textContent = `Dorsal: ${player.dorsal}`;
                playerDiv.appendChild(dorsalP);
            }

            if (player.edad !== undefined) {
                const edadP = document.createElement("p");
                edadP.textContent = `Edad: ${player.edad} años`;
                playerDiv.appendChild(edadP);
            }

            if (player.altura !== undefined) {
                const alturaP = document.createElement("p");
                alturaP.textContent = `Altura: ${player.altura}`;
                playerDiv.appendChild(alturaP);
            }

            if (player.peso !== undefined) {
                const pesoP = document.createElement("p");
                pesoP.textContent = `Peso: ${player.peso}`;
                playerDiv.appendChild(pesoP);
            }

            if (player.capitan) {
                const capitanP = document.createElement("p");
                capitanP.innerHTML = "<strong>Capitán</strong>";
                playerDiv.appendChild(capitanP);
            }

            section.appendChild(playerDiv);
        });
    }
});
