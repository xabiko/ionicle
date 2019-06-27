import { Component, AfterViewInit } from '@angular/core';
import { loadModules } from 'esri-loader';
import { Chart } from 'chart.js';
// import { PopoverController } from '@ionic/angular';
// import { MapchartComponent } from '../mapchart/mapchart.component'

@Component({
  selector: 'app-census-map',
  templateUrl: './census-map.page.html',
  styleUrls: ['./census-map.page.scss'],
})
export class CensusMapPage implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {

	   // first, we use Dojo's loader to require the map class
	   loadModules(['esri/views/MapView', 'esri/WebMap', 'esri/widgets/LayerList', 'esri/PopupTemplate'])
		 .then(([MapView, WebMap, LayerList]) => {

		   // then we load a web map from an id
       const map = new WebMap({
         portalItem: { // autocasts as new PortalItem()
  			      id: 'fc4545a75c79404f92daa3e7f26f7ae9'
  			 }
  		 });
			 // and we show that map in a container w/ id #viewDiv
			 const view = new MapView({
  		     map: map,
  				 container: 'viewDiv',
  				 popup: {  dockEnabled: true,
                     dockOptions: {
                       buttonEnabled: false,
                       breakpoint: false
                     }}
			 });

        var template = {
          // NAME and COUNTY are fields in the service containing the Census Tract (NAME) and county of the feature
          title: "Census Tract {NAME10}",
        };

		 //   	 // helper function for returning a layer instance
		 //      // based on a given layer title
		 //      function findLayerByTitle(title) {
		 //        return view.map.allLayers.find(function(layer) {
			// 				if (layer.title === title)
			// 				return layer.title === title;
		 //        });
		 //      }
			// 		// helper function for formatting number labels with commas
		 //      function numberWithCommas(value) {
		 //        value = value || 0;
		 //        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		 //      }
     //
		 //      // When the view loads, set up UI elements
		 //      let layerList, predominanceLayer;
			// 		let chart, totalCount;
     //
		 //      view.when(function() {
		 //        predominanceLayer = findLayerByTitle(
		 //          "2010 Salt Lake City Census Tracts");
		 //        predominanceLayer.outFields = ["*"];
     //
		 //     		// Listen to the click event on the map view.
			// 			view.on("click", function(event) {
			// 				view.hitTest(event).then(function(response) {
			// 			    // check if a feature is returned from the hurricanesLayer
			// 			    // do something with the result graphic
			// 			    const graphic = response.results.filter(function(result) {
			// 			      return result.graphic.layer === predominanceLayer;
			// 			    })[0].graphic;
     //
			// 					const newData = (({ P0020002, P0020005, P0020006, P0020007, P0020008, P0020009, P0020010, P0010011, P0010012, P0010013, P0010014 }) => ({ P0020002, P0020005, P0020006, P0020007, P0020008, P0020009, P0020010, P0010011, P0010012, P0010013, P0010014 }))(graphic.attributes);
     //
			// 					totalCount = graphic.attributes.POP100;
			// 					const title = numberWithCommas(totalCount) + " people total";
     //
			// 					// console.log(response.results);
     //
			// 					if (!chart) {
			// 	          // get the canvas element created in the LayerList
			// 	          // and use it to render the chart
			// 	          const canvasElement = layerList.operationalItems.find(function(
			// 	            item) {
			// 	            return predominanceLayer.title === item.title;
			// 	          }).panel.content[1];
     //
			// 	          chart = new Chart(canvasElement.getContext("2d"), {
			// 	            type: "doughnut",
			// 	            data: {
			// 	              labels: ["Hispanic or Latino", "White",
			// 	                "Black or African American", "American Indian or Alaska Native	",
			// 	                "Asian", "Native Hawaiian or Other Pacific Islander",
			// 	                "Other Race", "White & Black or African American", "White & American Indian or Alaska Native",
			// 									"White & Asian", "White & Native Hawaiian or Other Pacific Islander"
			// 	              ],
			// 	              datasets: [{
			// 	                label: "Population by educational attainment",
			// 	                backgroundColor: ["#9e549c", "#f789d8", "#149dcf",
			// 	                  "#ed5050", "#ffde3e", "#a6c736", "#b7804a",
			// 	                  "#fc9220", "#9e9e9e", "#42f4ee", "#1ff231"
			// 	                ],
			// 	                borderColor: "rgb(255, 255, 255)",
			// 	                borderWidth: 1,
			// 	                data: Object.values(newData)
			// 	              }]
			// 	            },
			// 	            options: {
			// 	              responsive: true,
			// 	              cutoutPercentage: 35,
			// 	              // Not an ArcGIS legend instance. This legend
			// 	              // is constructed for the pie chart, not the
			// 	              // features in the view, though the colors match
			// 	              // the colors of the features displayed in the map view
			// 	              legend: {
			// 	                position: "bottom"
			// 	              },
			// 	              title: {
			// 	                display: true,
			// 	                text: title
			// 	              },
			// 	              tooltips: {
			// 	                // define custom callback to format data values with commas and %
			// 	                callbacks: {
			// 	                  label: function(tooltipItem, data) {
			// 	                    const dataIndex = tooltipItem.index;
			// 	                    const value = data.datasets[0].data[dataIndex];
			// 	                    const percentage = totalCount > 0 ? Math.round((
			// 	                      value / totalCount) * 100) : 0;
			// 	                    return numberWithCommas(value) + " (" +
			// 	                      percentage + "%)";
			// 	                  }
			// 	                }
			// 	              }
			// 	            }
			// 	          });
			// 	        } else {
			// 	          chart.options.title.text = title;
			// 	          chart.data.datasets[0].data = Object.values(newData);
			// 	          chart.update();
			// 	        }
			// 					// console.log(chart);
	  	// 				});
			// 			});
     //
		 //        // Add a LayerList instance to the view with
		 //        // custom text and a canvas element in the list item panel
		 //        // for rendering a chart to display query results
     //
		 //        layerList = new LayerList({
		 //          view: view,
		 //          container: document.createElement("div"),
		 //          listItemCreatedFunction: function(event) {
		 //            const item = event.item;
     //
		 //            // add the pie chart to the Predominance layer list item panel
		 //            if (item.title === predominanceLayer.title) {
			// 						// item.title = "Population Pie Chart";
		 //              item.panel = {
		 //                content: [
		 //                  [
		 //                    "<b>Population Breakdown:</b><p>Composition of races and ethnicities of the different Salt Lake City census tracts.</p>"
		 //                  ].join(""),
		 //                  document.createElement("canvas"),
		 //                ],
		 //                className: "esri-icon-pie-chart",
		 //                open: item.visible
		 //              };
		 //            }
		 //          }
		 //        });
     //        console.log(layerList);
		 //        layerList.container.style = "height: 100%";
		 //        let panelDiv = document.getElementById("panel");
		 //        panelDiv.appendChild(layerList.container);
		 //      });
		 // })
		 // .catch(err => {
		 //   // handle any errors
		 //   console.error(err);
		 });
  }

}
