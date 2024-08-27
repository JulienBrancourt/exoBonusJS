import { Vehicule } from "./classe/vehicule.js";
import { Ticket } from "./classe/ticket.js";

// let parking = []

// const kangoo = new Vehicule("Renault", "Kangoo", "240000", "2003");

// const twingo = new Vehicule("Renault", "Twingo", "240000", "2003");

let immatriculation = document.querySelector(".immatriculation");
let create = document.querySelector(".create");
let pay = document.querySelector(".pay");
let info = document.querySelector(".info");

info.innerHTML = "Bienvenue !"

create.addEventListener("click", () => {
	let monTicket = new Ticket(immatriculation.value, new Date());
	let parking = JSON.parse(localStorage.getItem("parkingJson")) || [];

	let vehiculeExiste = parking.find(
		(v) => v.immatriculation === monTicket.immatriculation
	);

	if (vehiculeExiste) {
		info.innerHTML = "Votre véhicule est déjà dans le parking";
		info.classList.add("bad");
		reset("bad");
	} else {
		parking.push(monTicket);
		document.querySelector(".immatriculation").value = "";
		info.innerHTML = `Veuillez prendre votre ticket pour le véhicule ${monTicket.immatriculation}`;
		info.classList.add("good");
		reset("good");

		let parkingJson = JSON.stringify(parking);
		localStorage.setItem("parkingJson", parkingJson);
	}
});


pay.addEventListener("click", () => {
	let monImmatriculation = immatriculation.value;
	console.log(monImmatriculation);

	let parkingJson = localStorage.getItem("parkingJson")
	let parkingParse = JSON.parse(parkingJson) || [];

	let vehiculeTrouve = parkingParse.find(
		(v) => v.immatriculation === monImmatriculation
	);
    let indexVehicule = parkingParse.findIndex(
			(v) => v.immatriculation === monImmatriculation
		);

	if (vehiculeTrouve) {
		let dateActuelle = new Date();
		vehiculeTrouve.date = new Date(vehiculeTrouve.date);
		let duree = (dateActuelle - vehiculeTrouve.date) / 1000 / 60;
		console.log("Durée en minutes : " + duree);

		let prix = tarif(duree).toFixed(2);
		info.innerHTML = `Le prix à payer pour le véhicule ${vehiculeTrouve.immatriculation} est de ${prix} €`;
		info.classList.add("toPay");
        reset("toPay");
		parkingParse.splice(indexVehicule, 1)
		localStorage.setItem("parkingJson", JSON.stringify(parkingParse))
	} else {
		info.innerHTML = `Le véhicule ${monImmatriculation} n'existe pas !`;
		info.classList.add("bad");
		reset("bad");
	}
});

const tarif = (duree) => {
	console.log("Durée dans tarif : " + duree);

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




