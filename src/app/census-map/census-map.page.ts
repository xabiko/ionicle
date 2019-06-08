import { Component, OnInit } from '@angular/core';
import { loadModules } from 'esri-loader';


@Component({
  selector: 'app-census-map',
  templateUrl: './census-map.page.html',
  styleUrls: ['./census-map.page.scss'],
})
export class CensusMapPage implements OnInit {

  constructor() { }

  ngOnInit() {
	  // first, we use Dojo's loader to require the map class
	    loadModules(['esri/views/MapView', 'esri/WebMap'])
		 .then(([MapView, WebMap]) => {
		   // then we load a web map from an id
		   var webmap = new WebMap({
			portalItem: { // autocasts as new PortalItem()
			  id: 'f2e9b762544945f390ca4ac3671cfa72'
			}
		   });
		   // and we show that map in a container w/ id #viewDiv
		   var view = new MapView({
			map: webmap,
			container: 'viewDiv'
		   });
		 })
		 .catch(err => {
		   // handle any errors
		   console.error(err);
		 });
  }

}
