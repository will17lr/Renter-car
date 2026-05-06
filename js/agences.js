document.addEventListener("DOMContentLoaded", () => {
  fetch("./data/db.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Impossible de charger data/db.json");
      }
      return response.json();
    })
    .then(data => {
      const agences = data.agences;
      const container = document.getElementById("agences-container");

      if (!agences.length) {
        container.innerHTML = `<p class="text-center text-muted">Aucune agence disponible pour le moment.</p>`;
        return;
      }

      agences.forEach(agence => {
        const card = document.createElement("div");
        card.className = "col-md-4 agence-fade-in";

        card.innerHTML = `
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title">${agence.name}</h5>
              <p class="card-text mb-1">
                <strong>Adresse :</strong><br>${agence.address}<br>${agence.zipcode} ${agence.town}
              </p>
              <p class="card-text mb-1">
                <strong>Téléphone :</strong><br><a href="tel:${agence.phone}" class="text-decoration-none">📞 ${agence.phone}</a>
              </p>
              <p class="card-text">
                <strong>Email :</strong><br><a href="mailto:${agence.email}" class="text-decoration-none">✉️ ${agence.email}</a>
              </p>
            </div>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Erreur chargement agences :", error);
      document.getElementById("agences-container").innerHTML = `
        <p class="text-danger text-center">Impossible de charger les agences.</p>
      `;
    });
});