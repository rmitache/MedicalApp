CREATE TABLE [dbo].[t_taken_medicine_factor_record] (
    [id]                        INT      IDENTITY (1, 1) NOT NULL,
    [plan_id]                   INT      NULL,
    [medicine_factor_record_id] INT      NULL,
    [medicine_type_id]          INT      NOT NULL,
    [occurrence_date_time]      DATETIME NOT NULL,
    CONSTRAINT [PK_t_taken_medicine_factor_record] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_t_taken_medicine_factor_record_t_medicine_factor_record] FOREIGN KEY ([medicine_factor_record_id]) REFERENCES [dbo].[t_medicine_factor_record] ([id]),
    CONSTRAINT [FK_t_taken_medicine_factor_record_t_medicine_type] FOREIGN KEY ([medicine_type_id]) REFERENCES [dbo].[t_medicine_type] ([id]) ON DELETE CASCADE,
    CONSTRAINT [FK_t_taken_medicine_factor_record_t_plan] FOREIGN KEY ([plan_id]) REFERENCES [dbo].[t_plan] ([id])
);



