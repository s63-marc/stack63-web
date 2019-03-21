import "./scss/index.scss"

export default class App {
	constructor() {
		this.initalized = false;
	}

	init() {
		if (this.initialized) {
			this.destroy();
		}

		this.go();

		this.initialized = true;
	}


	destroy() {
		// assign to `null` elements that are creted by this initially

		// unset initialized value to true
		this.initialized = false;
	}

	go() {

		return document.addEventListener("DOMContentLoaded", function () {
			console.log("Stack63 website, now running.")
		})

	}
}
