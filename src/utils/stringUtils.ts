/**
 * Converts a date string in "yyyy-MM-dd" format to an ISO string
 * @param dateString - Date string in "yyyy-MM-dd" format
 * @returns ISO string representation of the date with time set to midnight
 */
export const convertDateToISOString = (dateString: string) => {
  const dateArray = dateString.split('-').map(Number);
  return new Date(
    dateArray[0]!,
    (dateArray[1]! - 1)!,
    dateArray[2]!,
    0,
    0,
    0
  ).toISOString();
};
