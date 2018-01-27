CREATE TABLE [dbo].[t_medicine_type] (
    [id]                            INT           IDENTITY (1, 1) NOT NULL,
    [name]                          NVARCHAR (50) NOT NULL,
    [short_name]                    NVARCHAR (50) NULL,
    [producer_name]                 NVARCHAR (50) NULL,
    [form_id]                       INT           NULL,
    [piece_size]                    INT           NULL,
    [piece_size_unit_of_measure_id] INT           NULL,
    CONSTRAINT [PK_t_medicine_type] PRIMARY KEY CLUSTERED ([id] ASC)
);



