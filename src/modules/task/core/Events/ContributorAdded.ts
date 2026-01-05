import type Contributor from "../../../../shared/core/objects/Contributor";
import type DateTime from "../../../../shared/core/objects/DateTime";
import TaskEvent from "./TaskEvent";

export default class ContributorAdded extends TaskEvent{
    constructor(date:DateTime, modifier: Contributor, contributor: Contributor){
        super(date, modifier, 'CONTRIBUTOR_ADDED', contributor);
    }
};
