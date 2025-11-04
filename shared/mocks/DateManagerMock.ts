import type DateManager from "../../modules/shared/contracts/DateManager";

export function createDateManagerMock(): jest.Mocked<DateManager>{
    let dateManagerMock: jest.Mocked<DateManager>;

    return dateManagerMock = {
        generate: jest.fn().mockReturnValue('validDate'),
        validate: jest.fn().mockImplementation((word) => {
            if(word.includes('validDate'))return true;
            else return false;
        })
    }
}
