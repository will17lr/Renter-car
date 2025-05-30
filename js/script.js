const container = document.getElementById("car-list");
const sortSelect = document.getElementById("sort-select");
const carCount = document.getElementById("car-count");

let carsData = [];

// === Fonction d'affichage des cartes ===
function renderCars(cars) {
  container.innerHTML = "";
  carCount.textContent = `${cars.length} résultat(s)`;

  if (!cars.length) {
    container.innerHTML = "<p class='text-center'>Aucun véhicule disponible.</p>";
    return;
  }

  cars.forEach(car => {
    const col = document.createElement("div");
    col.className = "car-col";

    col.innerHTML = `
      <div class="card car-horizontal">
        <div class="car-image">
          <img src="${car.cover}" alt="${car.model}">
        </div>
        <div class="car-info">
          <h5 class="car-title">${car.model} (${car.year})</h5>
          <p class="car-text">${car.power_hp}ch – ${car.transmission} – ${car.autonomy_km} km</p>
          <p class="car-price">${car.price}€ / jour</p>
          <a href="#" class="btn btn-success btn-reserve">Réserver</a>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

// === Tri dynamique ===
function sortCars(criteria) {
  const cars = [...carsData];
  switch (criteria) {
    case "price-asc":
      cars.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      cars.sort((a, b) => b.price - a.price);
      break;
    case "power-asc":
      cars.sort((a, b) => a.power_hp - b.power_hp);
      break;
    case "power-desc":
      cars.sort((a, b) => b.power_hp - a.power_hp);
      break;
  }
  renderCars(cars);
}

// === Listener du tri ===
sortSelect.addEventListener("change", (e) => {
  sortCars(e.target.value);
});

// === Chargement des données ===
fetch("http://localhost:3000/cars")
  .then(res => {
    if (!res.ok) throw new Error("Erreur serveur");
    return res.json();
  })
  .then(data => {
    carsData = data;
    renderCars(data);
  })
  .catch(error => {
    console.error("Erreur de chargement :", error);
    container.innerHTML = "<p class='text-danger text-center'>Impossible de charger les véhicules.</p>";
  });
