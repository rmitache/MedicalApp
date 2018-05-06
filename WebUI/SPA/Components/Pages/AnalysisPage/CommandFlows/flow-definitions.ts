// Components
import { InitAndStartPageFlow } from 'SPA/Components/Pages/HomePage/CommandFlows/init-and-start-page.flow';
import { RefreshScheduleFlow } from 'SPA/Components/Pages/HomePage/CommandFlows/refresh-schedule.flow';

// Define CommandFlows for RoutesPage
export const FlowDefinitions: { [flowName: string]: any } = {
    'InitAndStartPageFlow': InitAndStartPageFlow,
};

