﻿CREATE TABLE [dbo].[t_health_status_entry] (
    [id]                   INT      IDENTITY (1, 1) NOT NULL,
    [user_id]              INT      NOT NULL,
    [health_level_id]      INT      NOT NULL,
    [occurrence_date_time] DATETIME NOT NULL,
    CONSTRAINT [PK_t_general_health_entry] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_t_general_health_entry_t_user] FOREIGN KEY ([user_id]) REFERENCES [dbo].[t_user] ([id])
);





