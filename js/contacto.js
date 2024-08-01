document.addEventListener("DOMContentLoaded", function () {
    (function(){
        emailjs.init("G6PDY4Wz4MY_KHKwy"); // Reemplaza con tu User ID de EmailJS
    })();
    
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Recoge los valores del formulario
        let nombre = document.getElementById('nombre').value;
        let email = document.getElementById('email').value;
        let asunto = document.getElementById('asunto').value;
        let mensaje = document.getElementById('mensaje').value;

        // Envía el correo usando EmailJS
        emailjs.send('service_511aj8m', 'template_y60h2ds', {
            from_name: nombre,
            from_email: email,
            subject: asunto,
            message: mensaje
        })
        .then(function(response) {
            alert('Correo enviado con éxito!');
            window.location.reload();
        }, function(error) {
            alert('Error al enviar el correo...');
        });
    });
        // Coordenadas de la ubicación que deseas mostrar
        let location = [42.056350, 0.238097];

        // Crear el mapa
        let map = L.map('map').setView(location, 18); // 13 es el nivel de zoom inicial

        // Añadir una capa de mapa base de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Añadir un marcador en la ubicación especificada
        L.marker(location).addTo(map)
            .bindPopup('Puerta de entrada')
            .openPopup();
});