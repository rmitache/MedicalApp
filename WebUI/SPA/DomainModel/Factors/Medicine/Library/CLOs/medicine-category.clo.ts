import { BaseCLO } from 'SPA/Core/CLO/base.clo';


export class MedicineCategoryCLO extends BaseCLO {
    // Fields
    public ID: number;
    public Name: string;
    public Description: Date;
    public ChildCategories: MedicineCategoryCLO[];

    // Constructor
    constructor() {
        super();
    }
}