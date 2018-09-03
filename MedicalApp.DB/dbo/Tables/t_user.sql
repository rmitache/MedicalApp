CREATE TABLE [dbo].[t_user] (
    [id]              INT           IDENTITY (1, 1) NOT NULL,
    [email]           NVARCHAR (50) NOT NULL,
    [password]        NVARCHAR (50) NOT NULL,
    [signup_date]     DATE          NULL,
    [birth_date]      DATE          NULL,
    [language]        NVARCHAR (50) NULL,
    [last_login_date] DATETIME      NULL,
    CONSTRAINT [PK_T_User] PRIMARY KEY CLUSTERED ([id] ASC)
);






GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_t_user]
    ON [dbo].[t_user]([email] ASC);

