// Components
import { InitAndStartPageFlow } from 'SPA/Components/Pages/HomePage/CommandFlows/init-and-start-page.flow';
import { RefreshScheduleAndMedicineTypesOverviewFlow } from 'SPA/Components/Pages/HomePage/CommandFlows/refresh-schedule-and-medicine-types-overview.flow';

// Define CommandFlows for RoutesPage
export const FlowDefinitions: { [flowName: string]: any } = {
    'InitAndStartPageFlow': InitAndStartPageFlow,
    'RefreshScheduleAndMedicineTypesOverviewFlow': RefreshScheduleAndMedicineTypesOverviewFlow
};

