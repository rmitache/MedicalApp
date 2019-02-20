CREATE TABLE [dbo].[t_medicine_type] (
    [id]                         INT             IDENTITY (1, 1) NOT NULL,
    [user_id]                    INT             NOT NULL,
    [name]                       NVARCHAR (50)   NOT NULL,
    [producer_name]              NVARCHAR (50)   NULL,
    [base_unit_of_measure_id]    INT             NOT NULL,
    [is_packaged_into_units]     BIT             NOT NULL,
    [packaged_unit_dose_type_id] INT             NULL,
    [packaged_unit_dose_size]    DECIMAL (18, 4) NULL,
    CONSTRAINT [PK_t_medicine_type] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_t_medicine_type_t_user] FOREIGN KEY ([user_id]) REFERENCES [dbo].[t_user] ([id])
);

















