// Flows
import { InitAndStartPageFlow } from 'SPA/Components/Pages/AnalysisPage/CommandFlows/init-and-start-page.flow';
import { ChangeHighlightDateRangeFlow } from 'SPA/Components/Pages/AnalysisPage/CommandFlows/change-highlight-date-range.flow';

// Define CommandFlows for RoutesPage
export const FlowDefinitions: { [flowName: string]: any } = {
    'InitAndStartPageFlow': InitAndStartPageFlow,
    'ChangeHighlightDateRangeFlow': ChangeHighlightDateRangeFlow
};

