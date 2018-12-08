import { BaseCLO } from 'SPA/Core/CLO/base.clo';


export class UserAccountCLO extends BaseCLO {
    // Fields
    public ID: number;
    public Email: string;
    public TermsAcceptedDate: Date;
    public HasSeenWelcome: boolean;

    // Constructor
    constructor() {
        super();
    }
}