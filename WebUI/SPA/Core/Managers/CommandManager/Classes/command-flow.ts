
export class CommandFlow {
    // Fields
    private readonly commandFlowLogic: CommandFlowAsyncFunction = null;
    private readonly componentInstanceDictionary: { [componentClassName: string]: Object } = null;
    private readonly applicationStateRef: Object = null;
    private readonly extraParameters: Object[] = null;
    private status: CommandFlowStatuses = CommandFlowStatuses.Pending;

    // Properties
    public get Status() {
        return this.status;
    }
    public set Status(newStatus: CommandFlowStatuses) {
        if (this.status === CommandFlowStatuses.Finished) {
            throw new Error('Once a Flow is in status Finished, it cannot be set to Pending or InProgress again');
        }
        if (this.status === CommandFlowStatuses.InProgress && newStatus === CommandFlowStatuses.Pending) {
            throw new Error('Once a Flow has been started, it cannot be set to Pending again');
        }

        this.status = newStatus;
    }
    public get Name() {
        return this.flowName;
    }


    // Constructor
    constructor(
        private readonly flowName: string,
        flowLogic: CommandFlowAsyncFunction,
        componentInstanceDictionary: { [componentClassName: string]: Object },
        applicationStateRef: Object,
        extraParameters?: Object[]
    ) {
        this.commandFlowLogic = flowLogic;
        this.componentInstanceDictionary = componentInstanceDictionary;
        this.applicationStateRef = applicationStateRef;
        this.extraParameters = extraParameters;
    }

    // Public methods
    public Execute(): Promise<Object> {
        return this.commandFlowLogic(
            this.componentInstanceDictionary,
            this.applicationStateRef,
            this.extraParameters
        );
    }
}

export type CommandFlowAsyncFunction = (
    componentInstanceDictionary: { [componentClassName: string]: Object },
    applicationStateRef: Object,
    extraParameters?: Object[],
) => Promise<Object>;

export enum CommandFlowStatuses {
    Pending = 0,
    InProgress,
    Finished
}