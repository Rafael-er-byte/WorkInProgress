import InvalidParameters from "../errors/InvalidParameters";
import isStringANumber from "../helpers/ValidateNumber.helper";
import Text from "./Text";
import ValueObject from "./ValueObject";

export default class DateTime extends ValueObject{
    private date!:Date;

    private constructor(date:Date){
        super();
        this.date = date;
    }

    static now(): DateTime{
        return new DateTime(new Date());
    }

    static create(date:string): DateTime{
        if(!this.validateDate(date))throw new InvalidParameters("Invalid date");
        return new DateTime(new Date(date));
    }

    static validateDate(originalDate:string):boolean{
        const textDate = new Text(originalDate);
        const date = textDate.getText();

        const [dateStr, timeStr] = date.split('T');
        if(!dateStr || !timeStr)return false;

        const [yearStr, monthStr, dayStr] = dateStr.split('-');
        if(!yearStr || !monthStr || !dayStr)return false;

        let [hourStr, minuteStr, secondsStr] = timeStr.split(':');
        if(!hourStr || !minuteStr || !secondsStr || !secondsStr.includes('Z'))return false;

        secondsStr = secondsStr.substring(0, secondsStr.length - 1);

        if(!isStringANumber(yearStr) || !isStringANumber(monthStr) 
            || !isStringANumber(dayStr) || !isStringANumber(hourStr) 
            || !isStringANumber(minuteStr) || !isStringANumber(secondsStr)) return false;

        const year = Number(yearStr);
        const month = Number(monthStr);
        const day = Number(dayStr);
        const hour = Number(hourStr);
        const minute = Number(minuteStr);
        const seconds = Number(secondsStr);

        if(month < 0 || month > 12)return false;

        const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

        if(!isLeapYear && (day < 0 || day > 365))return false;
        else if(isLeapYear && (day < 0 || day > 366))return false;

        if(!isLeapYear && month === 2 && (day > 28 || day < 0))return false;
        else if(isLeapYear && month === 2 && (day > 29 || day < 0))return false;

        if(month % 2 !== 0 && day > 31)return false;
        else if(month % 2 === 0 && day > 30)return false;

        if(hour > 24 || hour < 0)return false;
        if(minute > 60 || minute < 0)return false;
        if(seconds > 60 || minute < 0)return false;

        return true;
    }

    static isAfter(futureDate:DateTime, now:DateTime): boolean{
        if(futureDate.getValue() > now.getValue())return true;
        return false;
    }

    public getDate(): Date{
        return this.date;
    }

    public getValue():number{
        return this.date.getTime();
    }
};
