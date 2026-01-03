import Schedule from "../objects/Schedule";

describe('Schedule tests', () => {
    let schedule: Schedule;

    it('Should create a valid instance of schedule', () => {
        schedule = new Schedule('2026-01-02T18:30:45Z');
        expect(schedule).toBeInstanceOf(Schedule);
    });

});
