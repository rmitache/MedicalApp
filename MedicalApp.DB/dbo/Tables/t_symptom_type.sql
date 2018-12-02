CREATE TABLE [dbo].[t_symptom_type] (
    [id]      INT            IDENTITY (1, 1) NOT NULL,
    [user_id] INT            NULL,
    [name]    NVARCHAR (150) NOT NULL,
    CONSTRAINT [PK_t_symptom_type] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_t_symptom_type_t_user] FOREIGN KEY ([user_id]) REFERENCES [dbo].[t_user] ([id])
);





