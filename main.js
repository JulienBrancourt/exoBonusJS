
import { Ticket } from "./classe/ticket.js";

let parking = JSON.parse(localStorage.getItem("parkingJson")) || [];

let immatriculation = document.querySelector(".immatriculation");
let create = document.querySelector(".create");
let pay = document.querySelector(".pay");
let info = document.querySelector(".info");

info.innerHTML = "Bienvenue !";

create.addEventListener("click", () => {
	// Rechargez les données à partir du localStorage
	let parking = JSON.parse(localStorage.getItem("parkingJson")) || [];

	let monTicket = new Ticket(immatriculation.value, new Date());

	// Vérifiez si le véhicule existe avec findLast
	let vehiculeExiste = parking.findLast(
		(v) => v.immatriculation === monTicket.immatriculation
	);

	// Affichez l'objet trouvé et sa date de sortie
	console.log("Véhicule trouvé :", vehiculeExiste);
	if (vehiculeExiste) {
		console.log(
			"Date de sortie du véhicule trouvé :",
			vehiculeExiste.dateSortie
		);
	}

	// Si le véhicule n'existe pas ou qu'il est déjà sorti (dateSortie est définie)
	if (!vehiculeExiste || vehiculeExiste.dateSortie !== null) {
		parking.push(monTicket);
		document.querySelector(".immatriculation").value = "";
		info.innerHTML = `Veuillez prendre votre ticket pour le véhicule ${monTicket.immatriculation}`;
		info.classList.add("good");
		reset("good");

		// Mettez à jour le localStorage
		localStorage.setItem("parkingJson", JSON.stringify(parking));
		afficherTableauParking();
	} else {
		info.innerHTML = "Votre véhicule est déjà dans le parking";
		info.classList.add("bad");
		reset("bad");
		afficherTableauParking();
	}
});





pay.addEventListener("click", () => {
	let monImmatriculation = immatriculation.value;
	console.log(monImmatriculation);

	let parkingJson = localStorage.getItem("parkingJson");
	let parkingParse = JSON.parse(parkingJson) || [];

	let vehiculeTrouve = parkingParse.findLast(
		(v) => v.immatriculation === monImmatriculation
	);

	let indexVehicule = parkingParse.findLastIndex(
		(v) => v.immatriculation === monImmatriculation
	);

	if (vehiculeTrouve) {
		if (vehiculeTrouve.dateSortie == null) {
			
			let dateActuelle = new Date();
			vehiculeTrouve.date = new Date(vehiculeTrouve.date);
			let duree = (dateActuelle - vehiculeTrouve.date) / 1000 / 60;

			let prix = tarif(duree).toFixed(2);
			info.innerHTML = `Le prix à payer pour le véhicule ${vehiculeTrouve.immatriculation} est de ${prix} €`;
			info.classList.add("toPay");
			reset("toPay");

			parkingParse[indexVehicule].dateSortie = dateActuelle;

			localStorage.setItem("parkingJson", JSON.stringify(parkingParse));
			afficherTableauParking();
		} else {
			info.innerHTML = "Le véhicule a déjà payé.";
			info.classList.add("bad");
			reset("bad");
			afficherTableauParking();
		}
	} else {
		info.innerHTML = `Le véhicule ${monImmatriculation} n'est pas dans le parking !`;
		info.classList.add("bad");
		reset("bad");
		afficherTableauParking();
	}
});



const tarif = (duree) => {
	if (duree <= 15) {
		return 0.8;
	} else if (duree <= 30) {
		return 1.3;
	} else if (duree <= 45) {
		return 1.7;
	} else {
		return 6;
	}
};

const reset = (classe) => {
	setTimeout(() => {
		info.innerHTML = "";
		info.classList.remove(classe);
		document.querySelector(".immatriculation").value = "";
	}, 5000);
};

function afficherTableauParking() {
	let parking = JSON.parse(localStorage.getItem("parkingJson")) || [];
	let tableBody = document.querySelector("#parkingTable tbody");

	tableBody.innerHTML = "";

	parking.forEach((ticket) => {
		let row = document.createElement("tr");

		let cellImmatriculation = document.createElement("td");
		cellImmatriculation.textContent = ticket.immatriculation;
		row.appendChild(cellImmatriculation);

		let cellDateEntree = document.createElement("td");
		cellDateEntree.textContent = new Date(ticket.date).toLocaleString();
		row.appendChild(cellDateEntree);

		let cellDateSortie = document.createElement("td");
		cellDateSortie.textContent = ticket.dateSortie
			? new Date(ticket.dateSortie).toLocaleString()
			: "Dans le parking";
		row.appendChild(cellDateSortie);

		tableBody.appendChild(row);
	});
}

afficherTableauParking();








