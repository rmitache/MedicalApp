export enum PlanStatus {
    ActiveWITHOUTAnyUpcomingChanges = 0,
	ActiveWITHUpcomingChanges = 1,
	ActiveWITHUpcomingStop = 2,
    Stopped = 3,
    UpcomingAsNew = 4,
    UpcomingAsRestarted = 5
}