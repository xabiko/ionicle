import { Component, AfterViewInit } from '@angular/core';
import { loadModules } from 'esri-loader';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-census-map',
  templateUrl: './census-map.page.html',
  styleUrls: ['./census-map.page.scss'],
})
export class CensusMapPage implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {

	   // first, we use Dojo's loader to require the map class
     loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/tasks/support/Query'])
		 .then(([Map, MapView, FeatureLayer, Query]) => {

       var template = {
         title: "Population breakdown for tract {NAME10}",
         content: makeChart
       };

       const layer = new FeatureLayer({
         // autocasts as new PortalItem()
         portalItem: {
           id: "b52c17d89e844baf806bf6b3339e537b"
         },
         // outFields: ["*"],
         opacity: 0.5,
         visible: true,
         popupTemplate: template
       });

       // then we load a web map from an id
       const map = new Map({
         basemap: "satellite",
         layers: [layer]
  		 });

       const view = new MapView({
         container: "viewDiv",
         map: map,
         zoom: 12,
         center: [-111.7910,40.7608],
         popup: {
           featureNavigationEnabled: false,
           dockEnabled: true,
           visible: false,
           dockOptions: {
             // Disables the dock button from the popup
             buttonEnabled: false,
             // Ignore the default sizes that trigger responsive docking
             breakpoint: false,
             position: "bottom-right"
           }
         },
         // defaultPopupTemplateEnabled: false
       });

       const query = new Query();
       query.returnGeometry = true;
       query.outFields = ["NAME10", "P0020002", "P0020005", "P0020006",
                          "P0020007", "P0020008", "P0020009", "P0020010",
                          "P0010011", "P0010012", "P0010013", "P0010014"];
       // query.where = "1=1";
       // query.num = 50;

       function makeChart(results){
         // Create a new canvas element, this is where the graph will be placed.
         let attribs = results.graphic.attributes;
         var canvas = document.createElement('canvas');
         canvas.id = "myChart";
         canvas.width = 400;
         canvas.height = 400;

         // Create a data object, this will include the data from the feature layer and other information like color or labels.
         var data = {
           datasets:[{
             data: [attribs.P0020002, attribs.P0020005, attribs.P0020006, attribs.P0020007, attribs.P0020008, attribs.P0020009, attribs.P0020010, attribs.P0010011, attribs.P0010012, attribs.P0010013, attribs.P0010014],
             backgroundColor: ["#9e549c", "#f789d8", "#149dcf",
			                  "#ed5050", "#ffde3e", "#a6c736", "#b7804a",
			                  "#fc9220", "#9e9e9e", "#42f4ee", "#1ff231"
			                ]
           }],
           labels: ["Hispanic or Latino", "White",
			                "Black or African American", "American Indian or Alaska Native	",
			                "Asian", "Native Hawaiian or Other Pacific Islander",
			                "Other Race", "White & Black or African American", "White & American Indian or Alaska Native",
											"White & Asian", "White & Native Hawaiian or Other Pacific Islander"
			              ]
         };

         console.log(data);
         // Create a new Chart and hook it to the canvas and then return the canvas.
         var myPieChart = new Chart(canvas.getContext('2d'),{
           type: 'doughnut',
           data: data,
           options: {
                   legend: {
                     position: "bottom"
                   },
                 }
         });

         // console.log(canvas);
         return canvas;
       }


     }).catch(err => {
       // handle any errors
       console.error(err);
     });

   }
 }
