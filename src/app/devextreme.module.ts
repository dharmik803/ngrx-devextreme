import { NgModule } from "@angular/core";
import { DxButtonModule, DxDataGridModule, DxDrawerModule, DxFileUploaderModule, DxFormModule, DxListModule, DxPopupModule, DxRadioGroupModule, DxResponsiveBoxModule, DxSelectBoxModule, DxTemplateModule, DxToolbarModule } from "devextreme-angular";


@NgModule({
    exports : [
        DxResponsiveBoxModule,
        DxFileUploaderModule,
        DxDataGridModule,
        DxButtonModule,
        DxFormModule,
        DxSelectBoxModule,
        DxDrawerModule,
        DxTemplateModule,
        DxListModule,
        DxToolbarModule,
        DxRadioGroupModule,
        DxPopupModule
    ]
})

export class DevExtremeModule {}