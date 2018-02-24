CREATE TABLE [dbo].[t_plan_rule] (
    [id]                        INT            IDENTITY (1, 1) NOT NULL,
    [plan_version_id]           INT            NOT NULL,
    [ordinal_frequency_type_id] INT            NOT NULL,
    [frequency_type_id]         INT            NOT NULL,
    [days_in_week]              NVARCHAR (50)  NULL,
    [moments_in_day]            NVARCHAR (150) NULL,
    CONSTRAINT [PK_rule] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_t_plan_rule_t_plan_version] FOREIGN KEY ([plan_version_id]) REFERENCES [dbo].[t_plan_version] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
);

