CREATE TABLE [dbo].[t_taken_medicine_factor_record] (
    [id]                         INT      IDENTITY (1, 1) NOT NULL,
    [plan_id]                    INT      NOT NULL,
    [plan_medicine_rule_item_id] INT      NOT NULL,
    [medicine_type_id]           INT      NOT NULL,
    [occurrence_date_time]       DATETIME NOT NULL,
    [actual_taken_date_time]     DATETIME NOT NULL,
    CONSTRAINT [PK_t_taken_medicine_factor_record] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_t_taken_medicine_factor_record_t_medicine_type] FOREIGN KEY ([medicine_type_id]) REFERENCES [dbo].[t_medicine_type] ([id]),
    CONSTRAINT [FK_t_taken_medicine_factor_record_t_plan] FOREIGN KEY ([plan_id]) REFERENCES [dbo].[t_plan] ([id]),
    CONSTRAINT [FK_t_taken_medicine_factor_record_t_plan_medicine_rule_item] FOREIGN KEY ([plan_medicine_rule_item_id]) REFERENCES [dbo].[t_plan_medicine_rule_item] ([id])
);

















