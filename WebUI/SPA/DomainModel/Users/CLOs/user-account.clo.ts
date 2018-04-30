﻿import { BaseCLO } from 'SPA/Core/CLO/base.clo';


export class UserAccountCLO extends BaseCLO {
    // Fields
    public ID: number;
    public Email: string;
    public SignupDate: Date;
    public BirthDate: Date;
    public Language: string;

    // Constructor
    constructor() {
        super();
    }
}