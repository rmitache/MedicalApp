export enum DateRangeMode {
    SingleDay,
    TenDays,
    SingleMonth,
	ThreeMonths
}
export enum LoginResultStatus {
    Success = 0,
    Failure_CredentialsWrongOrUserNotFound = 1,
    Failure_TermsNotAccepted = 2 
}