export enum PlanStatus {
    ActiveWITHOUTAnyUpcomingChanges = 0,
	ActiveWITHUpcomingChanges = 1,
	ActiveWITHUpcomingStop = 2,
	//ActiveWITHChangesTakingEffectToday = 3, // Commented out until all statuses can be revisited and looked at properly
    Stopped = 4,
    UpcomingAsNew = 5,
    UpcomingAsRestarted = 6
}