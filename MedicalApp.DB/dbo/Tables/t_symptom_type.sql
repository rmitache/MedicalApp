CREATE TABLE [dbo].[t_symptom_type] (
    [id]          INT            IDENTITY (1, 1) NOT NULL,
    [name]        NVARCHAR (150) NOT NULL,
    [description] NVARCHAR (250) NULL,
    CONSTRAINT [PK_t_symptom_type] PRIMARY KEY CLUSTERED ([id] ASC)
);



