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
	var data;

	return Controller.extend("SHOPFLOOR-PORTAL-MDSHOPFLOOR-PORTAL-MD.controller.View2", {

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
			var fil = this.getView().byId('fil').getValue();

			oModel.read("/ZODATA_SF_PLANNED_ORDER_MDSet?$filter=IPlant eq '" + plantid + "'&$format=json", {
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
							if (this.data["results"][i]["ProdStartDate"]) {
								if ((this.data["results"][i]["ProdStartDate"].toString()).includes(fil.toString())) {
									filtered["results"].push(this.data["results"][i]);
								}
							}
						}

						var JModel = new JSONModel(filtered);
						this.getView().setModel(JModel, "plannedorder");
					} else {
						JModel = new JSONModel(oData);
						this.getView().setModel(JModel, "plannedorder");
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