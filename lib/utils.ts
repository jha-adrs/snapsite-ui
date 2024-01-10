import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function duration(date: Date) {
  //Returns data in the format of 5s, 5m, 5h, 5d, 5w, 5mo, 5y

  const now = moment();
  const inputDate = moment(date);
  const diff = now.diff(inputDate);

  const duration = moment.duration(diff);

  if (duration.years() > 0) {
    return duration.years() + 'y';
  } else if (duration.months() > 0) {
    return duration.months() + 'mo';
  } else if (duration.weeks() > 0) {
    return duration.weeks() + 'w';
  } else if (duration.days() > 0) {
    return duration.days() + 'd';
  } else if (duration.hours() > 0) {
    return duration.hours() + 'h';
  } else if (duration.minutes() > 0) {
    return duration.minutes() + 'm';
  } else {
    return duration.seconds() + 's';
  }

}