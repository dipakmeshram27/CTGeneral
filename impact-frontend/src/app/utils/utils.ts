export function convertStringToDate(date: string): Date {
    return new Date(date);
}

export function isTodaysDate(date: string): boolean {
    return new Date(date).getUTCFullYear() === new Date().getUTCFullYear() &&
    new Date(date).getUTCMonth() === new Date().getUTCMonth() &&
    new Date(date).getUTCDate() === new Date().getUTCDate();
}