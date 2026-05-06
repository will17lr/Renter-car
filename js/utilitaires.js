document.addEventListener("DOMContentLoaded", () => {
  fetch("./data/db.json")
    .then(res => {
      if (!res.ok) {
        throw new Error("Impossible de charger data/db.json");
      }
      return res.json();
    })
    .then(data => {
      const utilitaires = data.utilitaires;
      const container = document.getElementById("utilitaires-container");

      if (!utilitaires.length) {
        container.innerHTML = `<p class="text-center">Aucun utilitaire disponible actuellement.</p>`;
        return;
      }

      utilitaires.forEach(utilitaire => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
          <div class="card shadow-sm h-100">
            <img src="${utilitaire.cover}" class="card-img-top" alt="${utilitaire.model}">
            <div class="card-body">
              <h5 class="card-title">${utilitaire.model} (${utilitaire.year})</h5>
              <p class="card-text">${utilitaire.power_hp}ch – ${utilitaire.transmission} – ${utilitaire.autonomy_km} km</p>
              <p class="card-text text-primary fw-bold">${utilitaire.price}€ / jour</p>
              <a href="contact.html" class="btn btn-success">Réserver</a>
            </div>
          </div>
        `;

        container.appendChild(col);
      });
    })
    .catch(err => {
      console.error("Erreur chargement utilitaires :", err);
      document.getElementById("utilitaires-container").innerHTML = `<p class="text-danger text-center">Impossible de charger les utilitaires.</p>`;
    });
});