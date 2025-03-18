// Inicialización general cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
    // Cambio automático de imágenes del banner
    const banner = document.querySelector(".banner");
    const images = [
      "img/banner.jpg",
      "img/banner2.jpg",
      "img/banner3.jpg"
    ];
    let index = 0;
    setInterval(() => {
      index = (index + 1) % images.length;
      banner.style.backgroundImage = `url('${images[index]}')`;
    }, 8000); // cada 8 segundos
  
    // Inicializar FullCalendar
    let selectedDate = '';
    const calendarEl = document.getElementById('calendario');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      validRange: function (nowDate) {
        return { start: nowDate };
      },
      dateClick: function (info) {
        selectedDate = info.dateStr;
        document.getElementById('formulario-horario').style.display = 'block';
        document.getElementById('formulario-datos').style.display = 'none';
        document.getElementById('hora-seleccionada').value = '';
  
        const horariosManana = document.getElementById('horarios-manana');
        const horariosTarde = document.getElementById('horarios-tarde');
        horariosManana.innerHTML = '';
        horariosTarde.innerHTML = '';
  
        const horasManana = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
        const horasTarde = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
  
        function crearBotones(horas, contenedor) {
          horas.forEach(hora => {
            const btn = document.createElement('button');
            btn.className = 'btn-hora';
            btn.textContent = hora;
            btn.addEventListener('click', () => {
              document.getElementById('hora-seleccionada').value = hora;
              document.querySelectorAll('.btn-hora').forEach(b => b.classList.remove('seleccionado'));
              btn.classList.add('seleccionado');
              document.getElementById('formulario-datos').style.display = 'block';
            });
            contenedor.appendChild(btn);
          });
        }
  
        crearBotones(horasManana, horariosManana);
        crearBotones(horasTarde, horariosTarde);
      }
    });
  
    calendar.render();
  
    // Confirmar reserva
    // js/script.js
document.getElementById("confirmarReserva").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const hora = document.getElementById("hora-seleccionada").value;
  
    if (!selectedDate) {
        Swal.fire({
          icon: 'warning',
          title: 'Fecha no seleccionada',
          text: 'Por favor, elige una fecha en el calendario.'
        });
        return;
      }
      
      if (!hora) {
        Swal.fire({
          icon: 'warning',
          title: 'Hora no seleccionada',
          text: 'Selecciona una hora para tu cita.'
        });
        return;
      }
      
      if (!nombre || !correo || !telefono) {
        Swal.fire({
          icon: 'warning',
          title: 'Datos incompletos',
          text: 'Completa tu nombre, correo y teléfono.'
        });
        return;
      }
      
  
    const templateParams = {
      nombre,
      correo,
      telefono,
      fecha: selectedDate,
      hora
    };
  
    emailjs.send("smtp_wallpari", "template_shu14w8", templateParams)
    .then(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Reserva enviada!',
          text: 'Te contactaremos pronto para confirmar tu cita.',
          confirmButtonText: 'Aceptar'
        });

            // Limpiar formulario
            document.getElementById("nombre").value = "";
            document.getElementById("correo").value = "";
            document.getElementById("telefono").value = "";
            document.getElementById("hora-seleccionada").value = "";
            document.getElementById("formulario-datos").style.display = "none";
            document.getElementById("formulario-horario").style.display = "none";
            selectedDate = '';

      })
      
      .catch((error) => {
        alert("Error al enviar: " + JSON.stringify(error));
      });
  });
  
  });
  