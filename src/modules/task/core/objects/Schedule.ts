import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import validateNumber from "../helpers/ValidateNumber.helper";

export default class Schedule{
    private schedule!:string;

    constructor(schedule:string){
        const [date, time] = schedule.split('T');
        if(!date || !time)throw new InvalidParameters('date', schedule);

        const [year, month, day] = date.split('-');
        if(!year || !month || !day)throw new InvalidParameters('date', schedule);

        let [hour, minute, seconds] = time.split(':');
        if(!hour || !minute || !seconds || !seconds.includes('Z'))throw new InvalidParameters('date', schedule);

        seconds = seconds.substring(0, seconds.length - 1);

        if(!validateNumber(year) || !validateNumber(month) 
            || !validateNumber(day) || !validateNumber(hour) 
            || !validateNumber(minute) || !validateNumber(seconds)) throw new InvalidParameters('date', schedule);

        this.schedule = schedule;
    }

    public getSchedule(): string{
        return this.schedule;
    }
};
