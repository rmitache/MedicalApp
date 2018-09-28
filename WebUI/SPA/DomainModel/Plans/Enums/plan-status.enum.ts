export enum PlanStatus {
    ActiveWITHOUTAnyUpcomingChanges = 0,
	ActiveWITHUpcomingChanges = 1,
    ActiveWITHUpcomingStop = 2,

    ActiveWITHChangesTakingEffectToday = 3, 
    ActiveStartedToday = 4,

    Stopped = 5,
    UpcomingAsNew = 6,
    UpcomingAsRestarted = 7
}