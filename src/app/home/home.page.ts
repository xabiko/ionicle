import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

	constructor(){}

	private deferredPrompt;
	private btnAdd;

	ngOnInit() {

		this.btnAdd = document.getElementById("A2HS");
		window.addEventListener('beforeinstallprompt', (e) => {
		  // Prevent Chrome 67 and earlier from automatically showing the prompt
		  e.preventDefault();
		  // Stash the event so it can be triggered later.
		  this.deferredPrompt = e;
		  this.btnAdd.style.display = 'block';
		});
	}

	handleClick() {
		this.btnAdd.style.display = 'none';
		// Show the prompt
		this.deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		this.deferredPrompt.userChoice
		  .then((choiceResult) => {
		    if (choiceResult.outcome === 'accepted') {
		      console.log('User accepted the A2HS prompt');
		    } else {
		      console.log('User dismissed the A2HS prompt');
		    }
		    this.deferredPrompt = null;
		  });
	}
}
