import type Contributor from "../objects/Contributor";
import TaskEvent from "./TaskEvent";

export default class ContributorAdded extends TaskEvent{
    constructor(modifier: Contributor, contributor: Contributor){
        super(modifier, 'CONTRIBUTOR_ADDED', contributor);
    }
};
