sap.ui.define([
	"sap/ui/core/mvc/Controller"
	
], function(Controller) {
	"use strict";
	var sUrl;
	var oModel;
    var sysid;

	return Controller.extend("SHOPFLOOR-PORTAL-MDSHOPFLOOR-PORTAL-MD.controller.View1", {
		
		OnSubmit:function()
         {
		 sUrl = "/sap/opu/odata/sap/ZSF_ODATA_MD_SRV";
		 oModel= new sap.ui.model.odata.ODataModel(sUrl,true);
		 var username = this.getView().byId('userid').getValue();
		 if(username === "")
		 {
		 	this.getView().byId('userid').setValueState('Error');
		 	sap.m.MessageToast.show('Please fill userid');
		 	return;
		 }
		 else
		 {
		 	this.getView().byId('userid').setValueState();
		 }
		  var password = this.getView().byId('password').getValue();
		 if(password === "")
		 {
		 	this.getView().byId('password').setValueState('Error');
		 	sap.m.MessageToast.show('Please fill Password');
		 	return;
		 }
		 else
		 {
		 	this.getView().byId('password').setValueState();
		 }
		 oModel.read("/ZODATA_SF_LOGIN_MDSet(IUserid='"+username+"',IPassword='"+password+"')?$format=json",{
		 	context:null,
		 	urlParameters:null,
		 	async:false,
		 	success:function(oData,oResponse)
		 	{
		 		sysid=oData.Sysid;
		        var result=oData.EStatus;
		        if(result==="Success")
		        {
		        sap.m.MessageToast.show("Login Success!Moving to Dashboard");	
		        this.OnNext();
		        }
		        else
		        {
		         sap.m.MessageToast.show("Incorrect Credentials");		
		        }
		        
		 		
		 	}.bind(this),
		 	error:function(oData,oResponse)
		 	{
		 		sap.m.MessageToast.show("ERROR OCCURED!Please try again");
		 	}
		 	
		 	});
		 },
		 
        OnNext:function()
        {
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		    oRouter.navTo("View2");
        }
        
	
	});
});