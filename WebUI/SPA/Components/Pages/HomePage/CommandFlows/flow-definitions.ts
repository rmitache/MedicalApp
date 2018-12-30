// Components
import { InitAndStartPageFlow } from 'SPA/Components/Pages/HomePage/CommandFlows/init-and-start-page.flow';
import { RefreshScheduleAndMedicineTypesOverviewFlow } from 'SPA/Components/Pages/HomePage/CommandFlows/refresh-schedule-and-medicine-types-overview.flow';
import { ToggleTakenForMedicineFactorRecordFlow } from 'SPA/Components/Pages/HomePage/CommandFlows/toggle-taken-for-medicine-factor-record.flow';
import { RefreshScheduleFlow } from 'SPA/Components/Pages/HomePage/CommandFlows/refresh-schedule.flow';
import { RefreshRemindersFlow } from './refresh-reminders.flow';
import { RefreshHealthGraphFlow } from './refresh-health-graph.flow';
import { RefreshPlansOverviewFlow } from './refresh-plans-overview.flow';

// Define CommandFlows for RoutesPage
export const FlowDefinitions: { [flowName: string]: any } = {
    'InitAndStartPageFlow': InitAndStartPageFlow,
    'RefreshScheduleAndMedicineTypesOverviewFlow': RefreshScheduleAndMedicineTypesOverviewFlow,
    'ToggleTakenForMedicineFactorRecordFlow': ToggleTakenForMedicineFactorRecordFlow,
    'RefreshScheduleFlow': RefreshScheduleFlow,
    'RefreshRemindersFlow': RefreshRemindersFlow,
    'RefreshHealthGraphFlow': RefreshHealthGraphFlow,
    'RefreshPlansOverviewFlow': RefreshPlansOverviewFlow
};

