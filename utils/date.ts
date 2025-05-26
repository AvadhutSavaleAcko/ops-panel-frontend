// This is used to set pped to 23:59:59:999 format as we are considering the date till 23:59 hrs
// Asserting policyExpiredTimeStatus as const so that its readonly and cannot be changed
export const policyExpiredTimeStatus = [23, 59, 59, 999] as const;

export enum DateFormats {
  FULL_DATE = "EEEE, MMMM d, yyyy",
  ISO_DATE = "yyyy-MM-dd"
}
