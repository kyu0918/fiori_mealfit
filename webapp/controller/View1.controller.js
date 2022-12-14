sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/odata/v2/ODataModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Fragment, ODataModel) {
    "use strict";

    return Controller.extend("sync.zdcppr4010.controller.View1", {
      onInit: function () {
        var sUrl = "/sap/opu/odata/sap/ZDCPPGW_PLAN_SRV/";
        var oModel = new ODataModel(sUrl, { useBatch: false });

        var oView = this.getView();
        oView.setModel(oModel);

        this.oRouter = this.getOwnerComponent().getRouter();
      },

      onRowPress: function() {
        var sPath = oEvent.getParameter("rowContext").getPath();
        this._sPath = sPath;

        var oSelectedRow = oTable.getBinding("rows").getModel().getProperty(sPath);
        var sCreateKey = oModel.createKey('/planHSet',{
            Porderid: oSelectedRow.Porderid
        });

        // var aFilter=[];
        // aFilter.push(
        //     new Filter('Porderid',"EQ", oSelectedRow.Porderid)
        // )

        // oModel.read(sCreateKey, {
        //     filters:aFilter,
        //     success: function(data) { 
        //         var aplanISet = data;
        //         oItemTable.setModel( new JSONModel(aplanISet) , 'planISet' );
        //         oItemTable
        //             .getBinding('rows')
        //             .filter(
        //                 aFilter
        //             )
        //     }.bind(this),
        //     error: function() {

        //     }
        // })

        var productPath = oEvent.getSource().getBindingContext("products").getPath(),
				product = productPath.split("/").slice(-1).pop(),
				oNextUIState;



      },

      onBeforeExport: function (oEvt) {
        var mExcelSettings = oEvt.getParameter("exportSettings");

        // Disable Worker as Mockserver is used in Demokit sample
        mExcelSettings.worker = false;
      },

      onPaste: function (oEvent) {
        var oResult = oEvent.getParameter("result");
        MessageToast.show("Paste result:" + JSON.stringify(oResult), {
          width: "75vw",
        });
      },
    });
  }
);