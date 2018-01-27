CREATE TABLE [dbo].[tj_medicine_type_to_medicine_category] (
    [id]                   INT IDENTITY (1, 1) NOT NULL,
    [medicine_category_id] INT NOT NULL,
    [medicine_type_id]     INT NOT NULL,
    CONSTRAINT [PK_tj_medicine_type_to_medicine_category] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_tj_medicine_type_to_medicine_category_t_medicine_category] FOREIGN KEY ([medicine_category_id]) REFERENCES [dbo].[t_medicine_category] ([id]) ON DELETE CASCADE,
    CONSTRAINT [FK_tj_medicine_type_to_medicine_category_t_medicine_type] FOREIGN KEY ([medicine_type_id]) REFERENCES [dbo].[t_medicine_type] ([id]) ON DELETE CASCADE
);

