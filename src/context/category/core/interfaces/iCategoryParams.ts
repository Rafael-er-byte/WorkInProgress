import type idProject from "../../../project/core/objects/IdProject";

export default interface iCategoryParams{
    id: string;
    idProject: idProject;
    name: string;
    color: string;
    createdAt: Date;
};
