const form = document.getElementById("formulario-login");

form.addEventListener("submit", async (evento) => {

  evento.preventDefault();

  const correo = document.getElementById("correo").value;
  const pass = document.getElementById("pass").value;

  try {
    const respuesta = await fetch("/inicio/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, pass }),
    });

    if (respuesta.ok) {
      window.location.href = "/perfil.html"; 
    } else {
      const errorJson = await respuesta.json();
      document.getElementById("mensaje-error").innerText =
        errorJson.error || "Error al iniciar sesión";
    }
  } catch (error) {
    console.error("Fallo de conexión:", error);
  }
});
