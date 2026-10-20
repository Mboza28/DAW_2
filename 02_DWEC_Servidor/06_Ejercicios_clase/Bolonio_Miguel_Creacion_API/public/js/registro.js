const formRegistro = document.getElementById("formulario-registro");
const mensajeEstado = document.getElementById("mensaje-estado");

formRegistro.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const correo = document.getElementById("correo").value;
  const pass = document.getElementById("pass").value;

  try {
    const respuesta = await fetch("/inicio/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, pass }),
    });

    if (respuesta.ok) {
      
      mensajeEstado.innerText = "Registro exitoso! Redirigiendo al login...";

      setTimeout(() => {
        window.location.href = "/login.html";
      }, 2000);
    } else {
      const errorJson = await respuesta.json();
      mensajeEstado.style.color = "red";
      mensajeEstado.innerText =
        errorJson.error || "Error al registrar el usuario";
    }
  } catch (error) {
    console.error("Fallo de conexión:", error);
    mensajeEstado.style.color = "red";
    mensajeEstado.innerText = "Error de conexión con el servidor.";
  }
});
