export class Ticket {
	constructor(immatriculation, date, dateSortie = null) {
		this.immatriculation = immatriculation;
		this.date = date;
		this.dateSortie = dateSortie;
	}
}
