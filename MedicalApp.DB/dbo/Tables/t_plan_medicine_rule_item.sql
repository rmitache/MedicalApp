﻿CREATE TABLE [dbo].[t_plan_medicine_rule_item] (
    [id]                       INT IDENTITY (1, 1) NOT NULL,
    [plan_rule_id]             INT NOT NULL,
    [medicine_type_id]         INT NOT NULL,
    [unit_dose_type_id]        INT NOT NULL,
    [unit_dose_quantifier]     INT NOT NULL,
    [unit_dose_size]           INT NULL,
    [unit_dose_uom_id]         INT NULL,
    [instruction_id]           INT NULL,
    [administration_method_id] INT NULL,
    CONSTRAINT [PK_t_plan_medicine_rule_item] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_t_plan_medicine_rule_item_t_medicine_type] FOREIGN KEY ([medicine_type_id]) REFERENCES [dbo].[t_medicine_type] ([id]),
    CONSTRAINT [FK_t_plan_medicine_rule_item_t_plan_rule] FOREIGN KEY ([plan_rule_id]) REFERENCES [dbo].[t_plan_rule] ([id]) ON DELETE CASCADE
);
