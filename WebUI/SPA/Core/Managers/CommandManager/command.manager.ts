import { Injectable } from '@angular/core';
import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { CommandFlow, CommandFlowAsyncFunction } from './Classes/command-flow';
import { ExecutionEngine } from './Classes/execution-engine';

@Injectable()
export class CommandManager {
    // Fields
    private readonly pendingCommandFlowQueue: DataStructures.ObservableList<CommandFlow> = new DataStructures.ObservableList<CommandFlow>();
    private readonly componentInstanceRegistrations: { [componentClassName: string]: Object } = {};
    private flowNamesToAsyncFunctions: { [flowName: string]: CommandFlowAsyncFunction } = null;
    private applicationStateInstance: any = null;

    // Private methods
    private tryToStartNextFlowInQueue() {
        if (this.pendingCommandFlowQueue.Length() > 0) {
            let nextFlow = this.pendingCommandFlowQueue.GetAt(0);

            if (!this.executionEngine.IsBusy) {
                this.pendingCommandFlowQueue.Remove(nextFlow);

                this.executionEngine.StartNewFlow(nextFlow);
            }
        }
    }

    // Constructor 
    constructor(
        private readonly executionEngine: ExecutionEngine
    ) {

        this.pendingCommandFlowQueue.ItemAdded.subscribe((addedItem) => {
            this.onCommandFlowAddedToQueue(addedItem);
        });
        this.executionEngine.FlowExecutionFinished.subscribe((finishedFlow) => {
            this.onCommandFlowExecutionFinished(finishedFlow);
        });
    }

    // Public methods 
    public Initialize(applicationStateInstance: any, flowNamesToAsyncFunctions: { [flowTypeName: string]: CommandFlowAsyncFunction }) {
        if (this.applicationStateInstance !== null || this.flowNamesToAsyncFunctions !== null) {
            throw new Error('Can only be initialized with variables once');
        }
        this.applicationStateInstance = applicationStateInstance;


        this.flowNamesToAsyncFunctions = flowNamesToAsyncFunctions;
    }
    public RegisterComponentInstance(componentReference: Object) {
        this.componentInstanceRegistrations[componentReference.constructor.name] = componentReference;
    }
    public InvokeCommandFlow(flowTypeName: string, extraParams?: Object[]) {
        const asyncFuncForFlow = this.flowNamesToAsyncFunctions[flowTypeName];
        const newCommandFlow = new CommandFlow(
            flowTypeName,
            asyncFuncForFlow,
            this.componentInstanceRegistrations,
            this.applicationStateInstance,
            extraParams
        );

        this.pendingCommandFlowQueue.Add(newCommandFlow);
    }

    // Event handlers
    private onCommandFlowAddedToQueue(addedFlow: CommandFlow) {
        this.tryToStartNextFlowInQueue();
    }
    private onCommandFlowExecutionFinished(finishedFlow: CommandFlow) {
        this.tryToStartNextFlowInQueue();
    }
}