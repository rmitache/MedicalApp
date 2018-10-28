export enum AdvancedPlanStatus {
    ActiveWITHOUTAnyUpcomingChanges = 0,
	ActiveWITHUpcomingChanges = 1,
    ActiveWITHUpcomingStop = 2,
    ActiveWITHChangesTakingEffectToday = 3, 
    ActiveStartedToday = 4,
    ActiveRestartedToday = 5,

    Stopped = 6,

    UpcomingAsNew = 7,
    UpcomingAsRestarted = 8
}

