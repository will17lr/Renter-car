console.log("script.js chargé");

const container = document.getElementById("car-list");
const sortSelect = document.getElementById("sort-select");
const carCount = document.getElementById("car-count");

const dateDepart = document.getElementById("dateDepart");
const dateRetour = document.getElementById("dateRetour");

let carsData = [];

// === Format de date compatible avec input type="date" ===
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// === Initialisation automatique des dates ===
function initDateFields() {
  console.log("dateDepart :", dateDepart);
  console.log("dateRetour :", dateRetour);

  if (!dateDepart || !dateRetour) {
    console.error("Erreur : les champs dateDepart ou dateRetour sont introuvables.");
    return;
  }

  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(today.getDate() + 1);

  const todayFormatted = formatDate(today);
  const tomorrowFormatted = formatDate(tomorrow);

  dateDepart.min = todayFormatted;
  dateRetour.min = tomorrowFormatted;

  if (!dateDepart.value) {
    dateDepart.value = todayFormatted;
  }

  if (!dateRetour.value) {
    dateRetour.value = tomorrowFormatted;
  }

  dateDepart.addEventListener("change", () => {
    const selectedDepartDate = new Date(dateDepart.value);
    const minReturnDate = new Date(selectedDepartDate);

    minReturnDate.setDate(selectedDepartDate.getDate() + 1);

    const minReturnFormatted = formatDate(minReturnDate);

    dateRetour.min = minReturnFormatted;

    if (!dateRetour.value || dateRetour.value <= dateDepart.value) {
      dateRetour.value = minReturnFormatted;
    }
  });
}

// === Fonction d'affichage des cartes ===
function renderCars(cars) {
  if (!container || !carCount) {
    console.error("Erreur : car-list ou car-count introuvable.");
    return;
  }

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
          <a href="contact.html" class="btn btn-success btn-reserve">Réserver</a>
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

    default:
      break;
  }

  renderCars(cars);
}

// === Initialisation de la page ===
initDateFields();

// === Listener du tri ===
if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    sortCars(e.target.value);
  });
} else {
  console.error("Erreur : sort-select introuvable.");
}

// === Chargement des données ===
fetch("./data/db.json")
  .then(res => {
    if (!res.ok) {
      throw new Error("Impossible de charger data/db.json");
    }

    return res.json();
  })
  .then(data => {
    carsData = data.cars || [];
    renderCars(carsData);
  })
  .catch(error => {
    console.error("Erreur de chargement des véhicules :", error);

    if (container) {
      container.innerHTML = "<p class='text-danger text-center'>Impossible de charger les véhicules.</p>";
    }
  });