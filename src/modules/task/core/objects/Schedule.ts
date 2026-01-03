import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import ValidateDateIso from "../helpers/ValidateDateIso.helper";

export default class Schedule{
    private schedule!:string;

    constructor(schedule:string){
        schedule = schedule.trim();
        
        if(!ValidateDateIso(schedule)) throw new InvalidParameters('date', schedule);

        const validDate = new Date(schedule);
        const now = new Date();

        if(validDate.getTime() < Date.now())throw new InvalidParameters('date', schedule);

        this.schedule = schedule;
    }

    public getSchedule(): string{
        return this.schedule;
    }
};
