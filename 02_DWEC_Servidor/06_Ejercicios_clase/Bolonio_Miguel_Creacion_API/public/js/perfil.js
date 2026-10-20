async function obtenerDatosGitHub() {
  try {
    const respuesta = await fetch("/usuario/githubUserInfo");

    if (!respuesta.ok) {
      alert("Acceso denegado. Debes iniciar sesión.");
      window.location.href = "/login.html";
      return;
    }

    const datos = await respuesta.json();

    const contenedor = document.getElementById("perfil-github");
    contenedor.innerHTML = `
                    <h2>${datos.name || datos.login}</h2>
                    <p><strong>Repositorios públicos:</strong> ${datos.public_repos}</p>
                    <p><strong>Bio:</strong> ${datos.bio || "Sin biografía"}</p>
                    <a href="${datos.html_url}" target="_blank">Ver perfil original</a>
                `;
  } catch (error) {
    console.error("Error en la petición:", error);
  }
}

obtenerDatosGitHub();
