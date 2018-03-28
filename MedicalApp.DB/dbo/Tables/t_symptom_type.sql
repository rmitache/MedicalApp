CREATE TABLE [dbo].[t_symptom_type] (
    [id]          INT            NOT NULL,
    [name]        NVARCHAR (50)  NOT NULL,
    [description] NVARCHAR (250) NULL,
    CONSTRAINT [PK_t_symptom_type] PRIMARY KEY CLUSTERED ([id] ASC)
);

