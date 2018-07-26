CREATE TABLE [dbo].[t_medicine_type_supply_entry] (
    [id]               INT      IDENTITY (1, 1) NOT NULL,
    [medicine_type_id] INT      NOT NULL,
    [supply_quantity]  INT      NOT NULL,
    [entry_date_time]  DATETIME NOT NULL,
    CONSTRAINT [PK_medicine_type_supply_entry] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_t_medicine_type_supply_entry_t_medicine_type] FOREIGN KEY ([medicine_type_id]) REFERENCES [dbo].[t_medicine_type] ([id]) ON DELETE CASCADE
);



