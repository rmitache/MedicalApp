﻿// Angular and 3rd party stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BlockUIModule } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { InplaceModule } from 'primeng/primeng';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SelectButtonModule } from 'primeng/selectbutton';

// Project modules
import { KeysPipe, EnumKeysPipe } from 'SPA/Components/Shared/Pipes/keys.pipe';

// Components
import { NavigationPanelComponent } from 'SPA/Components/Shared/NavigationPanel/navigation-panel.component';
import { HeaderBarComponent } from './HeaderBar/header-bar.component';
import { FilterListPanelComponent } from 'SPA/Components/Shared/FilterListPanel/filter-list-panel.component';
import { SplitButtonComponent } from 'SPA/Components/Shared/SplitButton/split-button.component';
import { TabsComponent } from 'SPA/Components/Shared/Tabs/tabs.component';
import { TabsModule } from 'SPA/Components/Shared/Tabs/tabs.module';
import { HeaderBarModule } from 'SPA/Components/Shared/HeaderBar/header-bar.module';
import { NoDataPanelModule } from 'SPA/Components/Shared/NoDataPanel/no-data-panel.module';
import { TooltipsModule } from './Tooltips/tooltips.module';
import { AcceptTermsDialogServiceModule } from './Popups/AcceptTermsDialog/accept-terms-dialog-service.module';
import { UserAccountEditorDialogServiceModule } from './Popups/UserAccountEditorDialog/user-account-editor-dialog-service.module';
import { AddHealthStatusDialogService } from './Popups/AddHealthStatusDialog/add-health-status-dialog.service';
import { AddHealthStatusDialogServiceModule } from './Popups/AddHealthStatusDialog/add-health-status-dialog-service.module';
import { AddSupplyDialogServiceModule } from './Popups/AddSupplyDialog/add-supply-dialog-service.module';
import { StopPlanDialogServiceModule } from './Popups/StopPlanDialog/stop-plan-dialog-service.module';
import { PlanEditorDialogService } from './Popups/PlanEditorDialog/plan-editor-dialog.service';
import { PlanEditorDialogServiceModule } from './Popups/PlanEditorDialog/plan-editor-dialog-service.module';
import { PipesModule } from './Pipes/pipes.module';
import { MedicineTypeEditorDialogServiceModule } from './Popups/MedicineTypeEditorDialog/medicine-type-editor-dialog-service.module';
import { AddSymptomTypeDialogServiceModule } from './Popups/AddSymptomTypeDialog/add-symptom-type-dialog-service.module';
import { HelpDialogServiceModule } from './Popups/HelpDialog/help-dialog-service.module';
import { ExportDataDialogServiceModule } from './Popups/ExportDataDialog/export-data-dialog-service.module';
import { CustomSidebarModule } from './CustomSideBar/custom-sidebar';
import { TimeLineModule } from './Timeline/timeline.module';
import { CustomCheckboxComponent } from './CustomCheckbox/custom-checkbox.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        KeyFilterModule,
        SelectButtonModule,

        CalendarModule,
        AutoCompleteModule,
        BlockUIModule,
        ProgressSpinnerModule,
        SplitButtonModule,
        ChipsModule,
        ChartModule,
		TabsModule,
		ButtonModule,
		CheckboxModule,
		RadioButtonModule,
		InputTextModule,
		TooltipModule,
		InplaceModule,
		HeaderBarModule,
        NoDataPanelModule,
        TooltipsModule,
        PipesModule,
        CustomSidebarModule,
        TimeLineModule,

        AcceptTermsDialogServiceModule,
        UserAccountEditorDialogServiceModule,
        AddHealthStatusDialogServiceModule,
        AddSupplyDialogServiceModule,
        StopPlanDialogServiceModule,
        PlanEditorDialogServiceModule,
        MedicineTypeEditorDialogServiceModule,
        AddSymptomTypeDialogServiceModule,
        HelpDialogServiceModule,
        ExportDataDialogServiceModule,
    ],
    declarations: [
        SplitButtonComponent,
        NavigationPanelComponent,
        FilterListPanelComponent
    ],
    exports: [
        SplitButtonComponent,
        SplitButtonModule,
        ChipsModule,
        ChartModule,
        CalendarModule,
        BlockUIModule,
        NavigationPanelComponent,

        ProgressSpinnerModule,
        HeaderBarComponent,
        FilterListPanelComponent,
		TabsModule,
		ButtonModule,
		CheckboxModule,
		RadioButtonModule,
		InputTextModule,
		TooltipModule,
		InplaceModule,
		HeaderBarModule,
        NoDataPanelModule,
        TooltipsModule,
        PipesModule,
        CustomSidebarModule,
        TimeLineModule,
        KeyFilterModule,
        SelectButtonModule,

        AcceptTermsDialogServiceModule,
        UserAccountEditorDialogServiceModule,
        AddHealthStatusDialogServiceModule,
        AddSupplyDialogServiceModule,
        StopPlanDialogServiceModule,
        PlanEditorDialogServiceModule,
        MedicineTypeEditorDialogServiceModule,
        AddSymptomTypeDialogServiceModule,
        HelpDialogServiceModule,
        ExportDataDialogServiceModule
    ]
})
export class SharedModule { }