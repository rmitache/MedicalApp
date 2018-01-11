import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CommandFlow, CommandFlowStatuses } from './command-flow';

@Injectable()
export class ExecutionEngine {

    // Fields
    private currentCommandFlow: CommandFlow = null;

    // Properties
    public get IsBusy() {
        return (this.currentCommandFlow !== null) && (this.currentCommandFlow.Status === CommandFlowStatuses.InProgress);
    }

    // Private methods
    private commandFinished() {
        if (this.currentCommandFlow.Status !== CommandFlowStatuses.Finished) {
            this.currentCommandFlow.Status = CommandFlowStatuses.Finished;
            this.FlowExecutionFinished.emit(this.currentCommandFlow);
        }
    }

    // Constructors
    public constructor(
    ) { }

    // Public methods
    public StartNewFlow(commandFlow: CommandFlow) {
        if (this.IsBusy) {
            throw new Error('Cannot start a new Flow until the current one has finished');
        }
        if (commandFlow.Status === CommandFlowStatuses.Finished || commandFlow.Status === CommandFlowStatuses.InProgress) {
            throw new Error('Cannot start a Flow which has Finished or is already In Progress');
        }


        // Start the execution of the Commands inside the Flow
        this.currentCommandFlow = commandFlow;
        this.currentCommandFlow.Status = CommandFlowStatuses.InProgress;
        let flowExecutionPromise = this.currentCommandFlow.Execute();

        // When it finishes, change its Status to Finished and emit an Event
        flowExecutionPromise
            .then(() => this.commandFinished());


    }


    // Events
    public FlowExecutionFinished: EventEmitter<any> = new EventEmitter<any>();

}