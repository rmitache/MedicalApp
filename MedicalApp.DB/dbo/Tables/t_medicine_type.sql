CREATE TABLE [dbo].[t_medicine_type] (
    [id]                         INT           IDENTITY (1, 1) NOT NULL,
    [name]                       NVARCHAR (50) NOT NULL,
    [short_name]                 NVARCHAR (50) NULL,
    [producer_name]              NVARCHAR (50) NULL,
    [base_form_id]               INT           NOT NULL,
    [packaged_unit_dose_type_id] INT           NULL,
    [packaged_unit_dose_size]    INT           NULL,
    [packaged_unit_dose_uom_id]  INT           NULL,
    CONSTRAINT [PK_t_medicine_type] PRIMARY KEY CLUSTERED ([id] ASC)
);





