CREATE TABLE [dbo].[t_plan] (
    [id]           INT           IDENTITY (1, 1) NOT NULL,
    [user_id]      INT           NOT NULL,
    [name]         NVARCHAR (50) NULL,
    [date_created] DATE          NOT NULL,
    CONSTRAINT [PK_t_plan] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_t_plan_t_user] FOREIGN KEY ([user_id]) REFERENCES [dbo].[t_user] ([id]) ON DELETE CASCADE
);

