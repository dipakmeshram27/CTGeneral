import { getDay } from "ngx-bootstrap/chronos";

export function convertStringToDate(date: string): Date {
    return new Date(date);
}

export function isTodaysDate(date: string): boolean {
    return new Date(date).getUTCFullYear() === new Date().getUTCFullYear() &&
        new Date(date).getUTCMonth() === new Date().getUTCMonth() &&
        new Date(date).getUTCDate() === new Date().getUTCDate();
}

export function getFirstDayofWeek(todaysDate: Date): Date {
    var first = todaysDate.getDate() - todaysDate.getDay(); // First day is the day of the month - the day of the week
    return new Date(todaysDate.setDate(first));
}

export function getLastDayofWeek(todaysDate: Date): Date {
    var first = todaysDate.getDate() - todaysDate.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    return new Date(todaysDate.setDate(last));
}