CREATE TABLE [dbo].[t_plan_medicine_rule_item] (
    [id]                             INT             IDENTITY (1, 1) NOT NULL,
    [plan_rule_id]                   INT             NOT NULL,
    [medicine_type_id]               INT             NOT NULL,
    [unit_dose_quantifier]           INT             NOT NULL,
    [has_user_defined_unit_dose]     BIT             NULL,
    [user_defined_unit_dose_type_id] INT             NULL,
    [user_defined_unit_dose_size]    DECIMAL (18, 4) NULL,
    CONSTRAINT [PK_t_plan_medicine_rule_item] PRIMARY KEY CLUSTERED ([id] ASC)
);













