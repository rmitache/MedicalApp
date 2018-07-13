CREATE TABLE [dbo].[t_medicine_factor_record] (
    [id]                   INT      IDENTITY (1, 1) NOT NULL,
    [user_id]              INT      NOT NULL,
    [medicine_type_id]     INT      NOT NULL,
    [occurrence_date_time] DATETIME NOT NULL,
    [unit_dose_type_id]    INT      NOT NULL,
    [unit_dose_quantifier] INT      NOT NULL,
    [unit_dose_size]       INT      NULL,
    [unit_dose_uom_id]     INT      NULL,
    CONSTRAINT [PK_t_medicine_factor_record] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_t_medicine_factor_record_t_medicine_type] FOREIGN KEY ([medicine_type_id]) REFERENCES [dbo].[t_medicine_type] ([id]),
    CONSTRAINT [FK_t_medicine_factor_record_t_user] FOREIGN KEY ([user_id]) REFERENCES [dbo].[t_user] ([id]) ON DELETE CASCADE
);





