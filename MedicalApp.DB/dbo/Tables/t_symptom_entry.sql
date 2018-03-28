CREATE TABLE [dbo].[t_symptom_entry] (
    [id]                   INT      NOT NULL,
    [user_id]              INT      NOT NULL,
    [symptom_type_id]      INT      NOT NULL,
    [intensity_level_id]   INT      NOT NULL,
    [occurrence_date_time] DATETIME NOT NULL,
    CONSTRAINT [PK_t_symptom_entry] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_t_symptom_entry_t_symptom_type] FOREIGN KEY ([symptom_type_id]) REFERENCES [dbo].[t_symptom_type] ([id]) ON DELETE CASCADE,
    CONSTRAINT [FK_t_symptom_entry_t_user] FOREIGN KEY ([user_id]) REFERENCES [dbo].[t_user] ([id]) ON DELETE CASCADE
);

