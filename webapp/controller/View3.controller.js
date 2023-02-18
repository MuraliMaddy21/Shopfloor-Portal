sap.ui.define([
			"sap/ui/core/mvc/Controller",
			"sap/m/Dialog",
			"sap/m/Button",
			"sap/ui/core/IconPool",
			"sap/ui/model/json/JSONModel"

		], function(Controller, Dialog, IconPool, Button, JSONModel, BindingMode) {
			"use strict";
			var sUrl;
			var oModel;
			var sysid;
			var Json;

			return Controller.extend("SHOPFLOOR-PORTAL-MDSHOPFLOOR-PORTAL-MD.controller.View3", {

				OnSubmit: function() {
					sUrl = "/sap/opu/odata/sap/ZSF_ODATA_MD_SRV";
					oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
					var plantid = this.getView().byId('pid').getValue();
					if (plantid === "") {
						this.getView().byId('pid').setValueState('Error');
						sap.m.MessageToast.show('Please fill Plant-Id');
						return;
					} else {
						this.getView().byId('pid').setValueState();
					}
					var mrpcontrol = this.getView().byId('mrp').getValue();
					if (mrpcontrol === "") {
						this.getView().byId('mrp').setValueState('Error');
						sap.m.MessageToast.show('Please fill MRP Controller');
						return;
					} else {
						this.getView().byId('mrp').setValueState();
					}
					var fil = this.getView().byId('fil').getValue();
					oModel.read("/ZODATA_SF_PRODUCTION_ORDER_MDSet?$filter=IProductionPlant eq '" + plantid + "' and IMrpController eq '" + mrpcontrol +
						"'&$format=json", {
							context: null,
							urlParameters: null,
							async: false,
							success: function(oData, oResponse) {
								sysid = oData.Sysid;
								var filtered = {
									"results": []
								};
								this.data = oData;
								if (fil) {
									for (var i in this.data["results"]) {
										if (this.data["results"][i]["StartDate"]) {
											if ((this.data["results"][i]["StartDate"].toString()).includes(fil.toString())) {
												filtered["results"].push(this.data["results"][i]);
											}
										}
									}

									var JModel = new JSONModel(filtered);
									this.getView().setModel(JModel, "productionorder");
								} else {
									JModel = new JSONModel(oData);
									this.getView().setModel(JModel, "productionorder");
								}

							}.bind(this),
							error: function(oData, oResponse) {
								sap.m.MessageToast.show("ERROR OCCURED!Please try again");
							}

						});
				},

				OnNext: function() {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("View3");
				},
					Onpopup2: function() {

					var oDialog2 = new sap.m.Dialog({
						title: "Search Help",
						content: new sap.m.Text({
								text: "MRP-Controller is the person responsible for running MRP Analysis!MRP-MATERIAL REQUIREMENT PLANNING"
						}),
						beginButton: new sap.m.Button({
							text: "Close",
							press: function() {
								oDialog2.close();
							}
						})
					});
					oDialog2.open();
				},

				Onpopup: function() {

					var oDialog = new sap.m.Dialog({
						title: "Search Help",
						content: new sap.m.Text({
								text: "This is Field to Filter data by Month or Year wise.Please Enter Filter Accordingly!"
						}),
						beginButton: new sap.m.Button({
							text: "Close",
							press: function() {
								oDialog.close();
							}
						})
					});
					oDialog.open();
				}
			});
				});