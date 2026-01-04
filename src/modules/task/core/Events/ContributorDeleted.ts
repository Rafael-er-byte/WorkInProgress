import type Contributor from "../../../../shared/core/objects/Contributor";
import TaskEvent from "./TaskEvent";

export default class ContributorDeleted extends TaskEvent{
    constructor(modifier: Contributor, contributor: Contributor){
        super(modifier, 'CONTRIBUTOR_DELETED', contributor);
    }
};
