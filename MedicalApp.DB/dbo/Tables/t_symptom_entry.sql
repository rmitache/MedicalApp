CREATE TABLE [dbo].[t_symptom_entry] (
    [id]                     INT IDENTITY (1, 1) NOT NULL,
    [health_status_entry_id] INT NOT NULL,
    [symptom_type_id]        INT NOT NULL,
    [intensity_level_id]     INT NOT NULL,
    CONSTRAINT [PK_t_symptom_entry] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_t_symptom_entry_t_health_status_entry] FOREIGN KEY ([health_status_entry_id]) REFERENCES [dbo].[t_health_status_entry] ([id]) ON DELETE CASCADE,
    CONSTRAINT [FK_t_symptom_entry_t_symptom_type] FOREIGN KEY ([symptom_type_id]) REFERENCES [dbo].[t_symptom_type] ([id]) ON DELETE CASCADE
);







