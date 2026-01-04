import validateStrNumber from "./ValidateNumber.helper";

export default function ValidateDateStrIso(schedule:string):boolean{
        const [dateStr, timeStr] = schedule.split('T');
        if(!dateStr || !timeStr)return false;

        const [yearStr, monthStr, dayStr] = dateStr.split('-');
        if(!yearStr || !monthStr || !dayStr)return false;

        let [hourStr, minuteStr, secondsStr] = timeStr.split(':');
        if(!hourStr || !minuteStr || !secondsStr || !secondsStr.includes('Z'))return false;

        secondsStr = secondsStr.substring(0, secondsStr.length - 1);

        if(!validateStrNumber(yearStr) || !validateStrNumber(monthStr) 
            || !validateStrNumber(dayStr) || !validateStrNumber(hourStr) 
            || !validateStrNumber(minuteStr) || !validateStrNumber(secondsStr)) return false;

        const now = new Date();

        const year = Number(yearStr);
        const month = Number(monthStr);
        const day = Number(dayStr);
        const hour = Number(hourStr);
        const minute = Number(minuteStr);
        const seconds = Number(secondsStr);

        if(year < now.getFullYear())return false;
        if(month < now.getMonth() || month < 0 || month > 12)return false;

        const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

        if(!isLeapYear && (day < now.getDate() || day < 0 || day > 365))return false;
        else if(isLeapYear && (day < now.getDate() || day < 0 || day > 366))return false;

        if(!isLeapYear && month === 2 && (day > 28 || day < 0))return false;
        else if(isLeapYear && month === 2 && (day > 29 || day < 0))return false;

        if(month % 2 !== 0 && day > 31)return false;
        else if(month % 2 === 0 && day > 30)return false;

        if(hour > 24 || hour < 0)return false;
        if(minute > 60 || minute < 0)return false;
        if(seconds > 60 || minute < 0)return false;

        return true;
}
