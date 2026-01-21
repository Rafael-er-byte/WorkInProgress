import type IDManager from "../../context/contracts/utils/IDManager";

export function createIdManagerMock():jest.Mocked<IDManager>{
    let idManagerMock: jest.Mocked<IDManager>; 

   return idManagerMock = {
        generateId: jest.fn().mockReturnValue('mock123'),
        validateId: jest.fn().mockImplementation((word) => {
            if(!word) return false;
            if(word.includes('mock'))return true;
            else return false;
        })
    }
}
