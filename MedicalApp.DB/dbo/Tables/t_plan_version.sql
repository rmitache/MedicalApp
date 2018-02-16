CREATE TABLE [dbo].[t_plan_version] (
    [id]         INT  IDENTITY (1, 1) NOT NULL,
    [plan_id]    INT  NOT NULL,
    [start_date] DATE NOT NULL,
    [end_date]   DATE NULL,
    CONSTRAINT [PK_t_plan_version] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_t_plan_version_t_plan] FOREIGN KEY ([plan_id]) REFERENCES [dbo].[t_plan] ([id]) ON DELETE CASCADE
);

