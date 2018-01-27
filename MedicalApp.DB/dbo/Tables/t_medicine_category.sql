CREATE TABLE [dbo].[t_medicine_category] (
    [id]          INT            IDENTITY (1, 1) NOT NULL,
    [name]        NVARCHAR (50)  NULL,
    [description] NVARCHAR (500) NULL,
    CONSTRAINT [PK_t_medicine_category] PRIMARY KEY CLUSTERED ([id] ASC)
);

