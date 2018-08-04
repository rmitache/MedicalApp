USE [DEV_MedicalApp]
GO
SET IDENTITY_INSERT [dbo].[t_user] ON 
GO
INSERT [dbo].[t_user] ([id], [email], [password], [signup_date], [birth_date], [language]) VALUES (1, N'rmitache@hotmail.com', N'demo', CAST(N'2018-02-08' AS Date), CAST(N'1984-10-26' AS Date), N'en')
GO
INSERT [dbo].[t_user] ([id], [email], [password], [signup_date], [birth_date], [language]) VALUES (5, N'Test', N'hello', CAST(N'2018-08-01' AS Date), CAST(N'2018-07-31' AS Date), NULL)
GO
SET IDENTITY_INSERT [dbo].[t_user] OFF
GO
SET IDENTITY_INSERT [dbo].[t_plan] ON 
GO
INSERT [dbo].[t_plan] ([id], [user_id], [name], [date_created]) VALUES (41, 1, N'My Herbs', CAST(N'2018-03-25' AS Date))
GO
INSERT [dbo].[t_plan] ([id], [user_id], [name], [date_created]) VALUES (42, 1, N'Plan from Gdansk', CAST(N'2018-03-25' AS Date))
GO
INSERT [dbo].[t_plan] ([id], [user_id], [name], [date_created]) VALUES (43, 1, N'My supplements', CAST(N'2018-03-25' AS Date))
GO
INSERT [dbo].[t_plan] ([id], [user_id], [name], [date_created]) VALUES (48, 1, N'Sleep remedies', CAST(N'2018-04-06' AS Date))
GO
INSERT [dbo].[t_plan] ([id], [user_id], [name], [date_created]) VALUES (59, 1, N'Misc', CAST(N'2018-05-23' AS Date))
GO
INSERT [dbo].[t_plan] ([id], [user_id], [name], [date_created]) VALUES (74, 5, N'Test for Test user', CAST(N'2018-08-03' AS Date))
GO
INSERT [dbo].[t_plan] ([id], [user_id], [name], [date_created]) VALUES (76, 5, N'Test 2 for Test user', CAST(N'2018-08-04' AS Date))
GO
SET IDENTITY_INSERT [dbo].[t_plan] OFF
GO
SET IDENTITY_INSERT [dbo].[t_plan_version] ON 
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (55, 41, CAST(N'2017-11-01' AS Date), CAST(N'2018-03-27' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (57, 42, CAST(N'2017-12-20' AS Date), CAST(N'2018-03-28' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (58, 43, CAST(N'2018-01-02' AS Date), CAST(N'2018-03-30' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (60, 41, CAST(N'2018-03-28' AS Date), CAST(N'2018-04-01' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (61, 42, CAST(N'2018-03-29' AS Date), CAST(N'2018-04-01' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (62, 43, CAST(N'2018-03-31' AS Date), CAST(N'2018-03-31' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (63, 43, CAST(N'2018-04-01' AS Date), CAST(N'2018-04-01' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (69, 43, CAST(N'2018-04-02' AS Date), CAST(N'2018-04-03' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (70, 41, CAST(N'2018-04-02' AS Date), CAST(N'2018-05-23' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (71, 42, CAST(N'2018-04-02' AS Date), CAST(N'2018-04-27' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (73, 43, CAST(N'2018-04-04' AS Date), CAST(N'2018-04-08' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (74, 48, CAST(N'2018-04-06' AS Date), CAST(N'2018-04-20' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (75, 43, CAST(N'2018-04-09' AS Date), CAST(N'2018-04-16' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (76, 43, CAST(N'2018-04-17' AS Date), CAST(N'2018-04-24' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (77, 48, CAST(N'2018-04-21' AS Date), CAST(N'2018-04-27' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (78, 43, CAST(N'2018-04-25' AS Date), CAST(N'2018-04-27' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (79, 43, CAST(N'2018-04-28' AS Date), CAST(N'2018-05-05' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (80, 42, CAST(N'2018-04-28' AS Date), CAST(N'2018-05-02' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (81, 42, CAST(N'2018-05-03' AS Date), CAST(N'2018-05-03' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (82, 42, CAST(N'2018-05-04' AS Date), NULL)
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (83, 43, CAST(N'2018-05-06' AS Date), CAST(N'2018-05-07' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (84, 43, CAST(N'2018-05-08' AS Date), CAST(N'2018-05-14' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (92, 43, CAST(N'2018-05-15' AS Date), CAST(N'2018-05-23' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (97, 41, CAST(N'2018-05-24' AS Date), CAST(N'2018-05-26' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (98, 59, CAST(N'2018-05-24' AS Date), CAST(N'2018-06-09' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (99, 43, CAST(N'2018-05-24' AS Date), CAST(N'2018-05-26' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (100, 41, CAST(N'2018-05-27' AS Date), CAST(N'2018-05-31' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (101, 43, CAST(N'2018-05-27' AS Date), CAST(N'2018-05-31' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (102, 41, CAST(N'2018-06-01' AS Date), NULL)
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (103, 43, CAST(N'2018-06-01' AS Date), CAST(N'2018-06-02' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (104, 43, CAST(N'2018-06-03' AS Date), CAST(N'2018-06-10' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (105, 43, CAST(N'2018-06-11' AS Date), CAST(N'2018-06-15' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (106, 43, CAST(N'2018-06-16' AS Date), CAST(N'2018-06-18' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (107, 43, CAST(N'2018-06-19' AS Date), CAST(N'2018-06-24' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (111, 43, CAST(N'2018-06-25' AS Date), CAST(N'2018-06-25' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (112, 43, CAST(N'2018-06-26' AS Date), CAST(N'2018-06-29' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (113, 43, CAST(N'2018-06-30' AS Date), CAST(N'2018-07-20' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (119, 43, CAST(N'2018-07-21' AS Date), CAST(N'2018-07-26' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (124, 43, CAST(N'2018-07-27' AS Date), CAST(N'2018-07-29' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (126, 43, CAST(N'2018-07-30' AS Date), CAST(N'2018-07-30' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (130, 43, CAST(N'2018-07-31' AS Date), NULL)
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (132, 74, CAST(N'2018-08-01' AS Date), CAST(N'2018-08-16' AS Date))
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (133, 76, CAST(N'2018-08-01' AS Date), NULL)
GO
SET IDENTITY_INSERT [dbo].[t_plan_version] OFF
GO
SET IDENTITY_INSERT [dbo].[t_plan_rule] ON 
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (55, 55, 0, 0, N'true,true,true,true,true,true,true', N'8:00,18:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (56, 55, 0, 1, N'true,true,true,true,true,false,false', N'8:00,18:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (63, 57, 0, 0, N'true,true,true,true,true,true,true', N'7:35')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (64, 57, 0, 0, N'true,true,true,true,true,true,true', N'17:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (65, 58, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (66, 58, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (67, 58, 0, 0, N'true,true,true,true,true,true,true', N'21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (69, 57, 0, 0, N'true,true,true,true,true,true,true', N'21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (70, 58, 0, 0, N'true,true,true,true,true,true,true', N'7:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (71, 58, 0, 0, N'true,true,true,true,true,true,true', N'22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (74, 60, 0, 0, N'true,true,true,true,true,true,true', N'8:00,18:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (75, 60, 0, 1, N'true,true,true,true,true,false,false', N'8:00,18:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (78, 58, 0, 0, N'true,true,true,true,true,true,true', N'8:15,13:00,17:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (79, 61, 0, 0, N'true,true,true,true,true,true,true', N'7:35')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (80, 61, 0, 0, N'true,true,true,true,true,true,true', N'17:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (81, 58, 0, 1, N'false,false,false,false,false,true,true', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (82, 58, 0, 1, N'true,true,true,true,true,false,false', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (83, 62, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (84, 62, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (85, 62, 0, 0, N'true,true,true,true,true,true,true', N'21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (86, 62, 0, 0, N'true,true,true,true,true,true,true', N'7:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (87, 62, 0, 0, N'true,true,true,true,true,true,true', N'22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (88, 62, 0, 0, N'true,true,true,true,true,true,true', N'8:15,13:00,17:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (89, 62, 0, 1, N'false,false,false,false,false,true,true', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (90, 62, 0, 1, N'true,true,true,true,true,false,false', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (91, 63, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (92, 63, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (93, 63, 0, 0, N'true,true,true,true,true,true,true', N'21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (94, 63, 0, 0, N'true,true,true,true,true,true,true', N'7:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (95, 63, 0, 0, N'true,true,true,true,true,true,true', N'22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (96, 63, 0, 0, N'true,true,true,true,true,true,true', N'8:15,13:00,17:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (97, 63, 0, 1, N'false,false,false,false,false,true,true', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (98, 63, 0, 1, N'true,true,true,true,true,false,false', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (104, 69, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (105, 69, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (106, 69, 0, 0, N'true,true,true,true,true,true,true', N'21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (107, 69, 0, 0, N'true,true,true,true,true,true,true', N'7:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (108, 69, 0, 0, N'true,true,true,true,true,true,true', N'23:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (109, 69, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (110, 69, 0, 1, N'false,false,false,false,false,true,true', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (111, 69, 0, 1, N'true,true,true,true,true,false,false', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (112, 69, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (113, 70, 0, 0, N'true,true,true,true,true,true,true', N'8:00,18:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (114, 71, 0, 0, N'true,true,true,true,true,true,true', N'7:35')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (115, 71, 0, 0, N'true,true,true,true,true,true,true', N'17:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (116, 71, 0, 0, N'true,true,true,true,true,true,true', N'23:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (118, 73, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (119, 73, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (120, 73, 0, 0, N'true,true,true,true,true,true,true', N'21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (121, 73, 0, 0, N'true,true,true,true,true,true,true', N'7:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (122, 73, 0, 0, N'true,true,true,true,true,true,true', N'23:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (123, 73, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (124, 73, 0, 1, N'false,false,false,false,false,true,true', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (125, 73, 0, 1, N'true,true,true,true,true,false,false', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (126, 73, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (127, 74, 0, 0, N'true,true,true,true,true,true,true', N'22:15')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (128, 75, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (129, 75, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (130, 75, 0, 0, N'true,true,true,true,true,true,true', N'21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (131, 75, 0, 0, N'true,true,true,true,true,true,true', N'7:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (132, 75, 0, 0, N'true,true,true,true,true,true,true', N'23:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (133, 75, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (134, 75, 0, 1, N'false,false,false,false,false,true,true', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (135, 75, 0, 1, N'true,true,true,true,true,false,false', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (136, 75, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (137, 76, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (138, 76, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (139, 76, 0, 0, N'true,true,true,true,true,true,true', N'21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (140, 76, 0, 0, N'true,true,true,true,true,true,true', N'7:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (141, 76, 0, 0, N'true,true,true,true,true,true,true', N'23:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (142, 76, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (143, 76, 0, 1, N'false,false,false,false,false,true,true', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (144, 76, 0, 1, N'true,true,true,true,true,false,false', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (145, 76, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (146, 77, 0, 0, N'true,true,true,true,true,true,true', N'22:15')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (147, 78, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (148, 78, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (149, 78, 0, 0, N'true,true,true,true,true,true,true', N'21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (150, 78, 0, 0, N'true,true,true,true,true,true,true', N'7:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (151, 78, 0, 0, N'true,true,true,true,true,true,true', N'23:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (152, 78, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (153, 78, 0, 1, N'false,false,false,false,false,true,true', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (154, 78, 0, 1, N'true,true,true,true,true,false,false', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (155, 78, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (156, 79, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (157, 79, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (158, 79, 0, 0, N'true,true,true,true,true,true,true', N'21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (159, 79, 0, 0, N'true,true,true,true,true,true,true', N'7:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (160, 79, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (162, 79, 0, 0, N'true,true,true,true,true,true,true', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (163, 79, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (164, 80, 0, 0, N'true,true,true,true,true,true,true', N'7:35')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (165, 80, 0, 0, N'true,true,true,true,true,true,true', N'17:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (166, 81, 0, 0, N'true,true,true,true,true,true,true', N'7:35')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (167, 81, 0, 0, N'true,true,true,true,true,true,true', N'17:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (168, 82, 0, 0, N'true,true,true,true,true,true,true', N'7:35')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (169, 82, 0, 0, N'true,true,true,true,true,true,true', N'17:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (170, 83, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (171, 83, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (172, 83, 0, 0, N'true,true,true,true,true,true,true', N'21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (173, 83, 0, 0, N'true,true,true,true,true,true,true', N'7:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (174, 83, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (175, 83, 0, 0, N'true,true,true,true,true,true,true', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (176, 83, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (177, 83, 0, 0, N'true,true,true,true,true,true,true', N'22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (178, 84, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (179, 84, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (180, 84, 0, 0, N'true,true,true,true,true,true,true', N'21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (181, 84, 0, 0, N'true,true,true,true,true,true,true', N'7:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (182, 84, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (183, 84, 0, 0, N'true,true,true,true,true,true,true', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (184, 84, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (185, 84, 0, 0, N'true,true,true,true,true,true,true', N'22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (193, 92, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (194, 92, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (195, 92, 0, 0, N'true,true,true,true,true,true,true', N'21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (196, 92, 0, 0, N'true,true,true,true,true,true,true', N'7:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (197, 92, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (198, 92, 0, 0, N'true,true,true,true,true,true,true', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (199, 92, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (200, 92, 0, 0, N'true,true,true,true,true,true,true', N'22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (205, 97, 0, 0, N'true,true,true,true,true,true,true', N'8:00,18:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (206, 98, 0, 1, N'true,true,true,true,true,false,false', N'7:35,17:30,21:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (207, 99, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (208, 99, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (209, 99, 0, 0, N'true,true,true,true,true,true,true', N'21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (210, 99, 0, 0, N'true,true,true,true,true,true,true', N'7:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (211, 99, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (212, 99, 0, 0, N'true,true,true,true,true,true,true', N'10:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (213, 99, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (214, 99, 0, 0, N'true,true,true,true,true,true,true', N'22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (215, 97, 0, 1, N'true,true,true,true,true,false,false', N'8:00,18:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (216, 100, 0, 1, N'true,true,true,true,true,false,false', N'8:00,18:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (217, 101, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (218, 101, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (219, 101, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (220, 101, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (221, 102, 0, 0, N'true,true,true,true,true,true,true', N'8:00,18:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (222, 103, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (223, 103, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (224, 103, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (225, 103, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (226, 103, 0, 0, N'true,true,true,true,true,true,true', N'11:15')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (227, 104, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (228, 104, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (229, 104, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (230, 104, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (231, 104, 0, 0, N'true,true,true,true,true,true,true', N'11:15')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (232, 105, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (233, 105, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (234, 105, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (235, 105, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (237, 105, 0, 0, N'true,true,true,true,true,true,true', N'21:05')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (238, 102, 0, 1, N'true,true,true,true,true,false,false', N'8:00,18:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (239, 106, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (240, 106, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (241, 106, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (242, 106, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (243, 106, 0, 0, N'true,true,true,true,true,true,true', N'21:05')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (244, 106, 0, 0, N'true,true,true,true,true,true,true', N'11:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (245, 107, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (246, 107, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (247, 107, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (248, 107, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (249, 107, 0, 0, N'true,true,true,true,true,true,true', N'21:05')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (250, 107, 0, 0, N'true,true,true,true,true,true,true', N'11:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (251, 107, 0, 0, N'true,true,true,true,true,true,true', N'22:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (255, 111, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (256, 111, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (257, 111, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (258, 111, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (259, 111, 0, 0, N'true,true,true,true,true,true,true', N'21:05')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (260, 111, 0, 0, N'true,true,true,true,true,true,true', N'11:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (261, 111, 0, 0, N'true,true,true,true,true,true,true', N'22:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (262, 112, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (263, 112, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (264, 112, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (265, 112, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (266, 112, 0, 0, N'true,true,true,true,true,true,true', N'21:05')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (267, 112, 0, 0, N'true,true,true,true,true,true,true', N'11:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (268, 112, 0, 0, N'true,true,true,true,true,true,true', N'22:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (269, 112, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (270, 113, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (271, 113, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (272, 113, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (273, 113, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (274, 113, 0, 0, N'true,true,true,true,true,true,true', N'21:05')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (275, 113, 0, 0, N'true,true,true,true,true,true,true', N'11:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (276, 113, 0, 0, N'true,true,true,true,true,true,true', N'22:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (277, 113, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (283, 119, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (284, 119, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (285, 119, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (286, 119, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (287, 119, 0, 0, N'true,true,true,true,true,true,true', N'21:05')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (288, 119, 0, 0, N'true,true,true,true,true,true,true', N'11:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (289, 119, 0, 0, N'true,true,true,true,true,true,true', N'22:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (290, 119, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (295, 124, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (296, 124, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (297, 124, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (298, 124, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (299, 124, 0, 0, N'true,true,true,true,true,true,true', N'21:05')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (300, 124, 0, 0, N'true,true,true,true,true,true,true', N'11:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (301, 124, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (303, 126, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (304, 126, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (305, 126, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (306, 126, 0, 0, N'true,true,true,true,true,true,true', N'21:05')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (307, 126, 0, 0, N'true,true,true,true,true,true,true', N'11:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (308, 126, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (312, 130, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00,21:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (313, 130, 0, 0, N'true,true,true,true,true,true,true', N'8:15,17:45,22:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (314, 130, 0, 0, N'true,true,true,true,true,true,true', N'12:45')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (315, 130, 0, 0, N'true,true,true,true,true,true,true', N'21:05')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (316, 130, 0, 0, N'true,true,true,true,true,true,true', N'11:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (317, 130, 0, 0, N'true,true,true,true,true,true,true', N'7:30,15:00')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (319, 132, 0, 0, N'true,true,true,true,true,true,true', N'10:30')
GO
INSERT [dbo].[t_plan_rule] ([id], [plan_version_id], [ordinal_frequency_type_id], [frequency_type_id], [days_in_week], [moments_in_day]) VALUES (320, 133, 0, 0, N'true,true,true,true,true,true,true', N'15:00')
GO
SET IDENTITY_INSERT [dbo].[t_plan_rule] OFF
GO
SET IDENTITY_INSERT [dbo].[t_medicine_type] ON 
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (1, 1, N'Vitamin C Liposomal', N'Altrient', 1, 1, 1, 1000)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (2, 1, N'Total Cleanse Lymph', N'Solaray', 1, 1, 0, 750)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (3, 1, N'Liver Hepato-Protect', N'Provita', 1, 1, 0, 600)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (4, 1, N'Probiotic Barrier 10', N'NDS', 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (6, 1, N'Artemisinin SOD', N'Researched Nutritionals', 1, 1, 0, 800)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (7, 1, N'Cat''s Claw', N'Lymeherbs', 1, 1, 0, 500)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (8, 1, N'Andrographis', N'Lymeherbs', 1, 1, 0, 500)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (9, 1, N'L-Lysine', N'Great Earth', 1, 1, 0, 500)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (10, 1, N'Quercitin with Bromelain', N'Organika', 1, 1, 0, 500)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (12, 1, N'Candida Support', N'Now', 1, 1, 0, 700)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (13, 1, N'Vit D3', N'Holistic', 3, 1, 0, 50)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (14, 1, N'Fortifikat', N'Terapia', 1, 1, 0, 750)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (15, 1, N'Magnesium Citrat', N'Solaray', 1, 1, 0, 130)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (16, 1, N'Bio-selenium + Zinc', N'PharmaNord', 1, 1, 0, 350)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (17, 1, N'Transfer Factor-L', N'Researched Nutriotionals', 1, 1, 0, 260)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (18, 1, N'Serrapeptase', N'NutraMedix', 1, 1, 0, 500)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (19, 1, N'Chlorella', N'Pukka', 1, 1, 0, 500)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (20, 1, N'Japanese Knotweed', N'Lymeherbs', 1, 1, 0, 500)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (21, 1, N'Nattokinase', N'Konig Laboratorium', 1, 1, 0, 150)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (22, 1, N'Biocidin LSF', N'Bio-Botanical Research', 1, 1, 2, 94)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (23, 1, N'BIoBran MGN3 (tablets)', N'Daiwa Pharmaceutical', 1, 1, 0, 250)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (25, 1, N'BIoBran MGN3 (powder)', N'Daiwa Pharmaceuticals', 1, 1, 1, 1000)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (26, 1, N'Ashwaghanda', N'Provita', 1, 1, 0, 550)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (27, 1, N'Vitamin D3', N'Holistic', 1, 1, 0, 2000)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (28, 1, N'NEUROadapt', N'MITO care', 1, 1, 0, 550)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (29, 1, N'Flukonazole', N'Pharma', 1, 1, 0, 100)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (30, 1, N'Nystatin', N'Teva', 2, 1, 0, 500000)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (32, 1, N'Artemisinin Solo', N'Researched Nutritionals', 1, 1, 0, 250)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (33, 1, N'Lymphstream Forte', N'Konig Laboratorium', 1, 1, 0, 725)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (34, 1, N'BIG Harmony', N'Big Molecules', 1, 1, 0, 750)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (35, 1, N'Melissa Dream', N'New Nordic', 1, 1, 0, 620)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (36, 1, N'Formula Candida', N'Provita Nutrition', 1, 1, 0, 750)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (37, 1, N'Chaga', N'Provita', 1, 1, 0, 400)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (38, 1, N'Venoruton', N'GlaxoSmithKline', 1, 1, 0, 300)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (40, 1, N'Artemisinin Forte', N'Konig Laboratories', 1, 1, 0, 100)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (41, 1, N'More Mn', N'Immitec', 1, 1, 0, 700)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (42, 1, N'Varicosalm', N'Ayurmed', 1, 1, 0, 500)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (44, 1, N'Thymus+', N'Thymus+', 1, 1, 0, 300)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (46, 5, N'Default name', N'Default name', 1, 1, 0, 100)
GO
INSERT [dbo].[t_medicine_type] ([id], [user_id], [name], [producer_name], [base_unit_of_measure_id], [is_packaged_into_units], [packaged_unit_dose_type_id], [packaged_unit_dose_size]) VALUES (47, 5, N'Vitamin B6', N'Vitamin B6', 1, 1, 0, 100)
GO
SET IDENTITY_INSERT [dbo].[t_medicine_type] OFF
GO
SET IDENTITY_INSERT [dbo].[t_plan_medicine_rule_item] ON 
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (82, 55, 7, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (83, 55, 8, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (84, 56, 6, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (99, 63, 22, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (100, 64, 22, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (101, 65, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (102, 65, 2, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (103, 65, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (104, 65, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (105, 65, 19, 6, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (106, 66, 15, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (107, 66, 26, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (108, 67, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (110, 63, 28, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (114, 69, 28, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (115, 64, 30, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (116, 65, 14, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (117, 67, 17, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (118, 70, 13, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (119, 70, 16, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (120, 71, 4, 1, 1, 1, 3000)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (124, 74, 7, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (125, 74, 8, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (126, 75, 32, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (130, 78, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (131, 79, 22, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (132, 80, 22, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (133, 80, 30, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (134, 82, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (135, 81, 18, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (136, 83, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (137, 83, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (138, 83, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (139, 83, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (140, 83, 19, 6, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (141, 83, 14, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (142, 84, 15, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (143, 84, 26, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (144, 85, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (145, 85, 17, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (146, 86, 13, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (147, 86, 16, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (148, 87, 4, 1, 1, 1, 3000)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (149, 88, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (150, 89, 18, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (151, 90, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (152, 91, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (153, 91, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (154, 91, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (155, 91, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (156, 91, 19, 6, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (157, 92, 15, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (158, 92, 26, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (159, 93, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (160, 93, 17, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (161, 94, 13, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (162, 94, 16, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (163, 95, 4, 1, 1, 1, 3000)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (164, 96, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (165, 97, 18, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (166, 98, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (172, 104, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (173, 104, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (174, 104, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (175, 104, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (176, 104, 19, 6, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (177, 105, 15, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (178, 105, 26, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (179, 106, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (180, 107, 13, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (181, 107, 16, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (182, 108, 4, 1, 1, 1, 3000)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (184, 109, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (185, 110, 18, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (186, 111, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (187, 112, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (188, 113, 7, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (189, 113, 8, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (190, 113, 20, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (191, 114, 22, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (192, 115, 22, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (193, 115, 30, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (194, 116, 34, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (196, 106, 12, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (197, 107, 12, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (198, 107, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (199, 106, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (200, 118, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (201, 124, 18, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (202, 123, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (203, 122, 4, 1, 1, 1, 3000)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (204, 121, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (205, 121, 12, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (206, 121, 16, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (207, 121, 13, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (208, 125, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (209, 120, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (210, 119, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (211, 119, 26, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (212, 119, 15, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (213, 118, 19, 6, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (214, 118, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (215, 118, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (216, 118, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (217, 120, 12, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (218, 126, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (219, 127, 35, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (220, 128, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (221, 134, 18, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (222, 133, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (223, 132, 4, 1, 1, 1, 3000)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (224, 131, 13, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (225, 131, 16, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (226, 131, 12, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (227, 131, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (228, 135, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (229, 130, 12, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (230, 129, 15, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (231, 129, 26, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (232, 129, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (233, 128, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (234, 128, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (235, 128, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (236, 128, 19, 6, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (237, 130, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (238, 136, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (239, 137, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (240, 143, 18, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (241, 142, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (242, 141, 4, 1, 1, 1, 3000)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (243, 140, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (244, 140, 36, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (245, 140, 16, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (246, 140, 13, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (247, 144, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (248, 139, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (249, 138, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (250, 138, 26, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (251, 138, 15, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (252, 137, 19, 6, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (253, 137, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (254, 137, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (255, 137, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (256, 139, 36, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (257, 145, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (258, 146, 35, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (259, 146, 28, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (260, 147, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (261, 153, 18, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (262, 152, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (263, 151, 4, 1, 1, 1, 3000)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (264, 150, 37, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (265, 150, 13, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (266, 150, 16, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (267, 150, 36, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (268, 150, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (269, 154, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (270, 149, 37, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (271, 149, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (272, 148, 15, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (273, 148, 26, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (274, 148, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (275, 147, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (276, 147, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (277, 147, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (278, 147, 19, 6, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (279, 149, 36, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (280, 155, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (281, 156, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (283, 160, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (284, 159, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (285, 159, 36, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (287, 159, 13, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (289, 158, 36, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (290, 158, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (292, 157, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (293, 157, 26, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (295, 156, 19, 6, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (296, 156, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (297, 156, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (298, 156, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (299, 162, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (300, 163, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (301, 164, 22, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (302, 165, 22, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (303, 165, 30, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (304, 166, 22, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (305, 167, 22, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (306, 168, 22, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (307, 169, 22, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (308, 169, 30, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (309, 170, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (310, 170, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (311, 170, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (312, 170, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (313, 170, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (314, 171, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (315, 171, 26, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (316, 172, 36, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (317, 172, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (318, 173, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (319, 173, 36, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (320, 173, 13, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (321, 173, 16, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (322, 174, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (323, 175, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (324, 176, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (325, 177, 4, 1, 1, 1, 100)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (326, 177, 34, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (327, 178, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (328, 184, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (329, 183, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (330, 182, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (331, 181, 16, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (332, 181, 13, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (333, 181, 36, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (334, 181, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (335, 185, 4, 1, 1, 1, 100)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (336, 180, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (337, 179, 26, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (338, 179, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (339, 178, 38, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (340, 178, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (341, 178, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (342, 178, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (343, 178, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (344, 180, 36, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (345, 185, 34, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (353, 193, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (354, 199, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (355, 198, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (356, 197, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (357, 196, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (358, 196, 36, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (359, 196, 13, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (360, 196, 16, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (361, 195, 36, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (362, 195, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (363, 194, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (364, 194, 26, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (365, 193, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (366, 193, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (367, 193, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (368, 193, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (369, 200, 4, 1, 1, 1, 100)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (370, 200, 34, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (375, 205, 7, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (376, 205, 20, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (378, 206, 41, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (379, 207, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (380, 213, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (381, 212, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (382, 211, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (383, 210, 16, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (384, 210, 13, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (385, 210, 36, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (386, 214, 4, 1, 1, 1, 100)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (387, 210, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (388, 209, 36, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (389, 208, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (390, 207, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (391, 207, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (392, 207, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (393, 207, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (394, 209, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (395, 214, 34, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (396, 215, 40, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (397, 216, 40, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (398, 217, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (399, 217, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (400, 217, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (401, 217, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (402, 218, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (403, 219, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (404, 220, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (406, 221, 20, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (407, 222, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (408, 222, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (409, 222, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (410, 222, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (411, 222, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (412, 223, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (413, 224, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (414, 225, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (415, 221, 7, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (416, 226, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (417, 227, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (418, 227, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (419, 227, 3, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (420, 227, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (421, 227, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (422, 227, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (423, 228, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (424, 229, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (425, 230, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (426, 231, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (427, 232, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (428, 232, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (429, 232, 3, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (430, 232, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (431, 233, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (432, 234, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (433, 235, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (435, 237, 17, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (436, 238, 40, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (437, 239, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (438, 239, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (439, 239, 3, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (440, 239, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (441, 240, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (442, 241, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (443, 242, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (444, 243, 17, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (445, 244, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (446, 245, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (447, 245, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (448, 245, 3, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (449, 245, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (450, 245, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (451, 246, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (452, 247, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (453, 248, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (454, 249, 17, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (455, 250, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (456, 251, 4, 1, 1, 1, 100)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (457, 245, 42, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (461, 255, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (462, 255, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (463, 255, 3, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (464, 255, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (465, 255, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (466, 255, 42, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (467, 255, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (468, 256, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (469, 257, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (470, 258, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (471, 259, 17, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (472, 260, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (473, 261, 4, 1, 1, 1, 100)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (474, 262, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (475, 262, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (476, 262, 3, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (477, 262, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (478, 262, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (479, 262, 42, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (480, 262, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (481, 262, 14, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (482, 263, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (483, 264, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (484, 265, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (485, 266, 17, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (486, 267, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (487, 268, 4, 1, 1, 1, 100)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (488, 269, 37, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (489, 270, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (490, 270, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (491, 270, 3, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (492, 270, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (493, 270, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (494, 270, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (495, 270, 14, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (496, 271, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (497, 272, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (498, 273, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (499, 274, 17, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (500, 275, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (501, 276, 4, 1, 1, 1, 100)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (502, 277, 37, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (505, 283, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (506, 283, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (507, 283, 3, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (508, 283, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (509, 283, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (510, 283, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (511, 283, 14, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (512, 284, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (513, 285, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (514, 286, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (515, 287, 17, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (516, 288, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (517, 289, 4, 1, 1, 1, 100)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (518, 290, 44, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (523, 295, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (524, 295, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (525, 295, 3, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (526, 295, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (527, 295, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (528, 295, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (529, 295, 14, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (530, 296, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (531, 297, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (532, 298, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (533, 299, 17, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (534, 300, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (535, 301, 44, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (538, 303, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (539, 303, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (540, 303, 3, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (541, 303, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (542, 303, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (543, 303, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (544, 303, 14, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (545, 304, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (546, 305, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (547, 306, 17, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (548, 307, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (549, 308, 44, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (553, 312, 1, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (554, 312, 33, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (555, 312, 3, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (556, 312, 10, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (557, 312, 19, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (558, 312, 9, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (559, 313, 25, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (560, 314, 23, 4, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (561, 315, 17, 2, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (562, 316, 21, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (563, 317, 44, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (565, 319, 46, 1, 0, NULL, NULL)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_quantifier], [has_user_defined_unit_dose], [user_defined_unit_dose_type_id], [user_defined_unit_dose_size]) VALUES (566, 320, 47, 1, 0, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[t_plan_medicine_rule_item] OFF
GO
SET IDENTITY_INSERT [dbo].[t_taken_medicine_factor_record] ON 
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (2, 43, 509, 19, CAST(N'2018-07-26T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (3, 43, 527, 19, CAST(N'2018-07-27T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (4, 43, 529, 14, CAST(N'2018-07-27T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (6, 43, 525, 3, CAST(N'2018-07-27T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (7, 43, 524, 33, CAST(N'2018-07-27T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (8, 43, 526, 10, CAST(N'2018-07-27T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (9, 43, 535, 44, CAST(N'2018-07-27T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (11, 42, 306, 22, CAST(N'2018-07-27T07:35:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (13, 41, 415, 7, CAST(N'2018-07-27T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (14, 41, 406, 20, CAST(N'2018-07-27T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (15, 43, 531, 25, CAST(N'2018-07-27T08:15:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (16, 43, 534, 21, CAST(N'2018-07-27T11:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (17, 43, 532, 23, CAST(N'2018-07-27T12:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (18, 43, 527, 19, CAST(N'2018-07-27T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (19, 43, 529, 14, CAST(N'2018-07-27T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (21, 43, 525, 3, CAST(N'2018-07-27T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (22, 43, 524, 33, CAST(N'2018-07-27T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (23, 43, 526, 10, CAST(N'2018-07-27T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (24, 43, 535, 44, CAST(N'2018-07-27T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (27, 43, 531, 25, CAST(N'2018-07-27T17:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (29, 43, 527, 19, CAST(N'2018-07-27T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (30, 43, 529, 14, CAST(N'2018-07-27T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (32, 43, 525, 3, CAST(N'2018-07-27T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (33, 43, 524, 33, CAST(N'2018-07-27T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (34, 43, 526, 10, CAST(N'2018-07-27T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (37, 42, 307, 22, CAST(N'2018-07-27T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (38, 41, 406, 20, CAST(N'2018-07-27T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (39, 41, 415, 7, CAST(N'2018-07-27T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (41, 43, 531, 25, CAST(N'2018-07-27T22:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (42, 43, 527, 19, CAST(N'2018-07-28T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (43, 43, 529, 14, CAST(N'2018-07-28T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (45, 43, 525, 3, CAST(N'2018-07-28T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (46, 43, 524, 33, CAST(N'2018-07-28T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (47, 43, 526, 10, CAST(N'2018-07-28T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (48, 43, 535, 44, CAST(N'2018-07-28T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (50, 42, 306, 22, CAST(N'2018-07-28T07:35:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (51, 41, 406, 20, CAST(N'2018-07-28T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (52, 41, 415, 7, CAST(N'2018-07-28T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (53, 43, 531, 25, CAST(N'2018-07-28T08:15:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (54, 43, 534, 21, CAST(N'2018-07-28T11:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (55, 43, 532, 23, CAST(N'2018-07-28T12:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (57, 43, 535, 44, CAST(N'2018-07-28T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (58, 43, 527, 19, CAST(N'2018-07-28T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (59, 43, 529, 14, CAST(N'2018-07-28T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (61, 43, 525, 3, CAST(N'2018-07-28T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (62, 43, 524, 33, CAST(N'2018-07-28T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (63, 43, 526, 10, CAST(N'2018-07-28T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (64, 42, 307, 22, CAST(N'2018-07-28T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (66, 43, 531, 25, CAST(N'2018-07-28T17:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (67, 41, 415, 7, CAST(N'2018-07-28T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (68, 41, 406, 20, CAST(N'2018-07-28T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (92, 43, 525, 3, CAST(N'2018-07-28T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (93, 43, 527, 19, CAST(N'2018-07-28T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (94, 43, 529, 14, CAST(N'2018-07-28T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (95, 43, 524, 33, CAST(N'2018-07-28T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (96, 43, 526, 10, CAST(N'2018-07-28T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (99, 43, 531, 25, CAST(N'2018-07-28T22:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (100, 43, 527, 19, CAST(N'2018-07-29T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (101, 43, 529, 14, CAST(N'2018-07-29T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (103, 43, 525, 3, CAST(N'2018-07-29T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (104, 43, 524, 33, CAST(N'2018-07-29T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (105, 43, 526, 10, CAST(N'2018-07-29T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (106, 43, 535, 44, CAST(N'2018-07-29T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (108, 42, 306, 22, CAST(N'2018-07-29T07:35:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (109, 41, 406, 20, CAST(N'2018-07-29T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (110, 41, 415, 7, CAST(N'2018-07-29T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (111, 43, 531, 25, CAST(N'2018-07-29T08:15:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (112, 43, 534, 21, CAST(N'2018-07-29T11:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (113, 43, 532, 23, CAST(N'2018-07-29T12:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (117, 43, 527, 19, CAST(N'2018-07-29T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (118, 43, 529, 14, CAST(N'2018-07-29T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (120, 43, 525, 3, CAST(N'2018-07-29T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (121, 43, 524, 33, CAST(N'2018-07-29T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (122, 43, 526, 10, CAST(N'2018-07-29T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (123, 43, 535, 44, CAST(N'2018-07-29T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (127, 42, 307, 22, CAST(N'2018-07-29T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (129, 43, 531, 25, CAST(N'2018-07-29T17:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (130, 41, 415, 7, CAST(N'2018-07-29T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (131, 41, 406, 20, CAST(N'2018-07-29T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (150, 43, 526, 10, CAST(N'2018-07-29T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (151, 43, 524, 33, CAST(N'2018-07-29T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (152, 43, 525, 3, CAST(N'2018-07-29T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (154, 43, 529, 14, CAST(N'2018-07-29T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (155, 43, 527, 19, CAST(N'2018-07-29T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (168, 43, 533, 17, CAST(N'2018-07-28T21:05:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (170, 43, 533, 17, CAST(N'2018-07-27T21:05:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (171, 43, 533, 17, CAST(N'2018-07-29T21:05:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (172, 43, 515, 17, CAST(N'2018-07-26T21:05:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (173, 43, 515, 17, CAST(N'2018-07-25T21:05:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (204, 43, 523, 1, CAST(N'2018-07-29T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (205, 43, 530, 1, CAST(N'2018-07-29T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (206, 43, 523, 1, CAST(N'2018-07-29T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (207, 43, 542, 19, CAST(N'2018-07-30T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (208, 43, 544, 14, CAST(N'2018-07-30T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (210, 43, 540, 3, CAST(N'2018-07-30T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (211, 43, 539, 33, CAST(N'2018-07-30T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (212, 43, 541, 10, CAST(N'2018-07-30T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (213, 43, 549, 44, CAST(N'2018-07-30T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (214, 43, 538, 1, CAST(N'2018-07-30T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (215, 42, 306, 22, CAST(N'2018-07-30T07:35:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (216, 43, 545, 25, CAST(N'2018-07-30T08:15:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (217, 41, 406, 20, CAST(N'2018-07-30T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (218, 41, 415, 7, CAST(N'2018-07-30T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (219, 41, 436, 40, CAST(N'2018-07-30T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (220, 43, 548, 21, CAST(N'2018-07-30T11:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (222, 43, 546, 23, CAST(N'2018-07-30T12:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (223, 43, 542, 19, CAST(N'2018-07-30T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (224, 43, 544, 14, CAST(N'2018-07-30T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (226, 43, 540, 3, CAST(N'2018-07-30T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (227, 43, 539, 33, CAST(N'2018-07-30T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (228, 43, 541, 10, CAST(N'2018-07-30T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (229, 43, 549, 44, CAST(N'2018-07-30T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (230, 43, 538, 1, CAST(N'2018-07-30T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (231, 42, 307, 22, CAST(N'2018-07-30T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (232, 42, 308, 30, CAST(N'2018-07-30T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (233, 43, 545, 25, CAST(N'2018-07-30T17:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (234, 41, 436, 40, CAST(N'2018-07-30T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (235, 41, 415, 7, CAST(N'2018-07-30T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (236, 41, 406, 20, CAST(N'2018-07-30T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (237, 43, 547, 17, CAST(N'2018-07-30T21:05:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (238, 43, 538, 1, CAST(N'2018-07-30T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (239, 43, 541, 10, CAST(N'2018-07-30T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (240, 43, 539, 33, CAST(N'2018-07-30T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (241, 43, 540, 3, CAST(N'2018-07-30T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (243, 43, 544, 14, CAST(N'2018-07-30T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (244, 43, 542, 19, CAST(N'2018-07-30T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (245, 43, 545, 25, CAST(N'2018-07-30T22:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (247, 43, 557, 19, CAST(N'2018-07-31T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (248, 43, 555, 3, CAST(N'2018-07-31T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (249, 43, 554, 33, CAST(N'2018-07-31T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (250, 43, 556, 10, CAST(N'2018-07-31T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (251, 43, 563, 44, CAST(N'2018-07-31T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (252, 43, 553, 1, CAST(N'2018-07-31T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (253, 42, 306, 22, CAST(N'2018-07-31T07:35:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (254, 41, 436, 40, CAST(N'2018-07-31T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (255, 41, 415, 7, CAST(N'2018-07-31T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (256, 41, 406, 20, CAST(N'2018-07-31T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (257, 43, 559, 25, CAST(N'2018-07-31T08:15:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (258, 43, 562, 21, CAST(N'2018-07-31T11:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (259, 43, 560, 23, CAST(N'2018-07-31T12:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (260, 43, 557, 19, CAST(N'2018-07-31T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (262, 43, 555, 3, CAST(N'2018-07-31T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (263, 43, 554, 33, CAST(N'2018-07-31T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (264, 43, 556, 10, CAST(N'2018-07-31T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (265, 43, 563, 44, CAST(N'2018-07-31T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (266, 43, 553, 1, CAST(N'2018-07-31T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (267, 42, 307, 22, CAST(N'2018-07-31T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (268, 42, 308, 30, CAST(N'2018-07-31T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (269, 43, 559, 25, CAST(N'2018-07-31T17:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (270, 41, 406, 20, CAST(N'2018-07-31T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (271, 41, 415, 7, CAST(N'2018-07-31T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (272, 41, 436, 40, CAST(N'2018-07-31T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (273, 43, 557, 19, CAST(N'2018-07-31T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (275, 43, 555, 3, CAST(N'2018-07-31T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (276, 43, 554, 33, CAST(N'2018-07-31T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (277, 43, 556, 10, CAST(N'2018-07-31T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (278, 43, 553, 1, CAST(N'2018-07-31T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (279, 43, 561, 17, CAST(N'2018-07-31T21:05:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (280, 43, 559, 25, CAST(N'2018-07-31T22:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (281, 43, 557, 19, CAST(N'2018-08-01T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (283, 43, 555, 3, CAST(N'2018-08-01T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (285, 43, 556, 10, CAST(N'2018-08-01T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (286, 43, 563, 44, CAST(N'2018-08-01T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (287, 43, 554, 33, CAST(N'2018-08-01T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (288, 43, 553, 1, CAST(N'2018-08-01T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (289, 42, 306, 22, CAST(N'2018-08-01T07:35:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (290, 41, 436, 40, CAST(N'2018-08-01T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (291, 41, 415, 7, CAST(N'2018-08-01T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (292, 41, 406, 20, CAST(N'2018-08-01T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (293, 43, 559, 25, CAST(N'2018-08-01T08:15:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (294, 43, 562, 21, CAST(N'2018-08-01T11:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (295, 43, 560, 23, CAST(N'2018-08-01T12:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (296, 43, 557, 19, CAST(N'2018-08-01T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (298, 43, 555, 3, CAST(N'2018-08-01T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (299, 43, 554, 33, CAST(N'2018-08-01T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (300, 43, 556, 10, CAST(N'2018-08-01T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (301, 43, 563, 44, CAST(N'2018-08-01T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (302, 43, 553, 1, CAST(N'2018-08-01T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (303, 42, 308, 30, CAST(N'2018-08-01T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (304, 41, 436, 40, CAST(N'2018-08-01T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (305, 41, 415, 7, CAST(N'2018-08-01T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (306, 41, 406, 20, CAST(N'2018-08-01T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (307, 43, 558, 9, CAST(N'2018-08-01T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (308, 42, 307, 22, CAST(N'2018-08-01T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (309, 43, 558, 9, CAST(N'2018-08-01T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (310, 43, 558, 9, CAST(N'2018-08-01T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (311, 43, 557, 19, CAST(N'2018-08-01T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (312, 43, 555, 3, CAST(N'2018-08-01T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (313, 43, 554, 33, CAST(N'2018-08-01T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (314, 43, 556, 10, CAST(N'2018-08-01T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (315, 43, 553, 1, CAST(N'2018-08-01T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (316, 43, 561, 17, CAST(N'2018-08-01T21:05:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (317, 43, 559, 25, CAST(N'2018-08-01T17:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (318, 43, 559, 25, CAST(N'2018-08-01T22:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (319, 43, 557, 19, CAST(N'2018-08-02T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (320, 43, 558, 9, CAST(N'2018-08-02T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (321, 43, 555, 3, CAST(N'2018-08-02T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (322, 43, 554, 33, CAST(N'2018-08-02T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (323, 43, 556, 10, CAST(N'2018-08-02T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (324, 43, 563, 44, CAST(N'2018-08-02T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (325, 43, 553, 1, CAST(N'2018-08-02T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (326, 42, 306, 22, CAST(N'2018-08-02T07:35:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (327, 41, 415, 7, CAST(N'2018-08-02T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (328, 41, 406, 20, CAST(N'2018-08-02T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (329, 41, 436, 40, CAST(N'2018-08-02T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (330, 43, 559, 25, CAST(N'2018-08-02T08:15:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (331, 43, 560, 23, CAST(N'2018-08-02T12:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (332, 43, 562, 21, CAST(N'2018-08-02T11:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (333, 43, 553, 1, CAST(N'2018-08-02T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (334, 43, 563, 44, CAST(N'2018-08-02T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (335, 43, 556, 10, CAST(N'2018-08-02T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (336, 43, 554, 33, CAST(N'2018-08-02T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (337, 43, 555, 3, CAST(N'2018-08-02T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (338, 43, 558, 9, CAST(N'2018-08-02T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (339, 43, 557, 19, CAST(N'2018-08-02T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (340, 42, 308, 30, CAST(N'2018-08-02T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (341, 41, 406, 20, CAST(N'2018-08-02T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (342, 41, 415, 7, CAST(N'2018-08-02T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (343, 41, 436, 40, CAST(N'2018-08-02T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (344, 43, 559, 25, CAST(N'2018-08-02T17:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (345, 43, 557, 19, CAST(N'2018-08-02T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (346, 43, 561, 17, CAST(N'2018-08-02T21:05:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (347, 43, 553, 1, CAST(N'2018-08-02T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (348, 43, 556, 10, CAST(N'2018-08-02T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (349, 43, 554, 33, CAST(N'2018-08-02T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (350, 43, 555, 3, CAST(N'2018-08-02T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (351, 43, 558, 9, CAST(N'2018-08-02T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (352, 42, 307, 22, CAST(N'2018-08-02T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (353, 43, 559, 25, CAST(N'2018-08-02T22:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (354, 43, 557, 19, CAST(N'2018-08-03T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (355, 43, 558, 9, CAST(N'2018-08-03T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (356, 43, 555, 3, CAST(N'2018-08-03T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (357, 43, 554, 33, CAST(N'2018-08-03T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (358, 43, 556, 10, CAST(N'2018-08-03T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (359, 43, 563, 44, CAST(N'2018-08-03T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (360, 43, 553, 1, CAST(N'2018-08-03T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (361, 42, 306, 22, CAST(N'2018-08-03T07:35:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (362, 41, 436, 40, CAST(N'2018-08-03T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (363, 41, 415, 7, CAST(N'2018-08-03T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (364, 41, 406, 20, CAST(N'2018-08-03T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (365, 43, 559, 25, CAST(N'2018-08-03T08:15:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (366, 43, 560, 23, CAST(N'2018-08-03T12:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (367, 43, 557, 19, CAST(N'2018-08-03T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (368, 43, 558, 9, CAST(N'2018-08-03T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (369, 43, 555, 3, CAST(N'2018-08-03T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (370, 43, 554, 33, CAST(N'2018-08-03T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (371, 43, 556, 10, CAST(N'2018-08-03T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (372, 43, 563, 44, CAST(N'2018-08-03T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (373, 43, 553, 1, CAST(N'2018-08-03T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (374, 43, 562, 21, CAST(N'2018-08-03T11:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (377, 42, 307, 22, CAST(N'2018-08-03T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (378, 42, 308, 30, CAST(N'2018-08-03T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (380, 41, 436, 40, CAST(N'2018-08-03T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (381, 41, 415, 7, CAST(N'2018-08-03T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (382, 41, 406, 20, CAST(N'2018-08-03T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (383, 43, 559, 25, CAST(N'2018-08-03T17:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (384, 43, 561, 17, CAST(N'2018-08-03T21:05:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (385, 43, 553, 1, CAST(N'2018-08-03T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (386, 43, 556, 10, CAST(N'2018-08-03T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (387, 43, 554, 33, CAST(N'2018-08-03T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (388, 43, 555, 3, CAST(N'2018-08-03T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (389, 43, 558, 9, CAST(N'2018-08-03T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (390, 43, 557, 19, CAST(N'2018-08-03T21:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (391, 43, 559, 25, CAST(N'2018-08-03T22:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (392, 43, 557, 19, CAST(N'2018-08-04T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (393, 43, 558, 9, CAST(N'2018-08-04T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (394, 43, 555, 3, CAST(N'2018-08-04T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (395, 43, 554, 33, CAST(N'2018-08-04T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (396, 43, 556, 10, CAST(N'2018-08-04T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (397, 43, 563, 44, CAST(N'2018-08-04T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (398, 43, 553, 1, CAST(N'2018-08-04T07:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (399, 42, 306, 22, CAST(N'2018-08-04T07:35:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (400, 41, 415, 7, CAST(N'2018-08-04T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (401, 41, 406, 20, CAST(N'2018-08-04T08:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (402, 43, 559, 25, CAST(N'2018-08-04T08:15:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (403, 74, 565, 46, CAST(N'2018-08-04T10:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (404, 43, 562, 21, CAST(N'2018-08-04T11:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (405, 43, 560, 23, CAST(N'2018-08-04T12:45:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (406, 76, 566, 47, CAST(N'2018-08-04T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (413, 43, 557, 19, CAST(N'2018-08-04T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (414, 43, 553, 1, CAST(N'2018-08-04T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (415, 43, 563, 44, CAST(N'2018-08-04T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (416, 43, 556, 10, CAST(N'2018-08-04T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (417, 43, 554, 33, CAST(N'2018-08-04T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (418, 43, 555, 3, CAST(N'2018-08-04T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (419, 43, 558, 9, CAST(N'2018-08-04T15:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (424, 42, 307, 22, CAST(N'2018-08-04T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (425, 42, 308, 30, CAST(N'2018-08-04T17:30:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (428, 41, 406, 20, CAST(N'2018-08-04T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (429, 41, 415, 7, CAST(N'2018-08-04T18:00:00.000' AS DateTime))
GO
INSERT [dbo].[t_taken_medicine_factor_record] ([id], [plan_id], [plan_medicine_rule_item_id], [medicine_type_id], [occurrence_date_time]) VALUES (430, 43, 559, 25, CAST(N'2018-08-04T17:45:00.000' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[t_taken_medicine_factor_record] OFF
GO
SET IDENTITY_INSERT [dbo].[t_health_status_entry] ON 
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (20, 1, 1, CAST(N'2018-04-01T21:23:14.353' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (21, 1, -2, CAST(N'2018-04-02T06:36:25.870' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (22, 1, 1, CAST(N'2018-04-02T11:58:52.263' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (23, 1, 1, CAST(N'2018-04-02T14:39:51.873' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (24, 1, 3, CAST(N'2018-04-02T18:40:20.883' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (25, 1, 3, CAST(N'2018-04-02T20:04:35.853' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (26, 1, -1, CAST(N'2018-04-03T08:09:38.047' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (27, 1, -1, CAST(N'2018-04-03T15:09:51.687' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (28, 1, 2, CAST(N'2018-04-03T20:10:07.590' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (29, 1, 1, CAST(N'2018-04-03T21:01:51.913' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (30, 1, -2, CAST(N'2018-04-04T05:38:24.637' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (31, 1, 1, CAST(N'2018-04-04T22:15:56.780' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (32, 1, 2, CAST(N'2018-04-05T20:31:53.157' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (33, 1, 1, CAST(N'2018-04-05T11:31:59.873' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (34, 1, -1, CAST(N'2018-04-05T22:22:55.080' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (35, 1, 2, CAST(N'2018-04-06T22:21:00.307' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (36, 1, 1, CAST(N'2018-04-07T07:13:30.737' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (37, 1, -1, CAST(N'2018-04-07T10:02:22.380' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (38, 1, 1, CAST(N'2018-04-07T17:07:03.323' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (39, 1, 2, CAST(N'2018-04-07T19:23:07.420' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (40, 1, 1, CAST(N'2018-04-07T23:32:12.960' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (41, 1, -1, CAST(N'2018-04-07T23:54:07.630' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (42, 1, 1, CAST(N'2018-04-08T07:44:24.517' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (43, 1, 1, CAST(N'2018-04-08T22:37:12.227' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (44, 1, -1, CAST(N'2018-04-08T22:39:44.833' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (45, 1, -1, CAST(N'2018-04-09T06:16:26.897' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (46, 1, 1, CAST(N'2018-04-09T22:27:17.053' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (48, 1, 1, CAST(N'2018-04-09T21:41:25.000' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (50, 1, 2, CAST(N'2018-04-11T19:44:06.717' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (51, 1, 1, CAST(N'2018-04-12T18:30:17.167' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (52, 1, -3, CAST(N'2018-04-12T14:30:21.703' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (53, 1, 1, CAST(N'2018-04-12T23:06:05.630' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (54, 1, 1, CAST(N'2018-04-13T18:22:10.043' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (55, 1, 1, CAST(N'2018-04-13T21:43:52.707' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (56, 1, 1, CAST(N'2018-04-13T22:53:07.680' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (57, 1, 1, CAST(N'2018-04-14T11:53:40.440' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (58, 1, 2, CAST(N'2018-04-14T19:59:58.240' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (59, 1, 1, CAST(N'2018-04-15T00:51:35.950' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (60, 1, 1, CAST(N'2018-04-15T07:27:07.273' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (61, 1, -1, CAST(N'2018-04-15T09:31:30.763' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (62, 1, -1, CAST(N'2018-04-15T12:45:04.027' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (63, 1, 1, CAST(N'2018-04-15T16:07:09.727' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (64, 1, 1, CAST(N'2018-04-15T16:22:56.960' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (65, 1, -1, CAST(N'2018-04-15T19:27:18.610' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (66, 1, 1, CAST(N'2018-04-16T20:13:32.807' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (67, 1, 1, CAST(N'2018-04-16T14:19:09.593' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (68, 1, -1, CAST(N'2018-04-16T22:10:24.537' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (69, 1, -2, CAST(N'2018-04-17T15:09:28.437' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (70, 1, 1, CAST(N'2018-04-17T19:10:07.647' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (71, 1, 1, CAST(N'2018-04-17T20:01:22.957' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (72, 1, 2, CAST(N'2018-04-17T22:00:13.657' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (73, 1, -1, CAST(N'2018-04-18T15:33:36.877' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (74, 1, 2, CAST(N'2018-04-18T20:57:02.267' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (75, 1, 1, CAST(N'2018-04-19T18:32:19.503' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (76, 1, 1, CAST(N'2018-04-20T20:53:53.000' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (77, 1, -1, CAST(N'2018-04-21T07:14:07.390' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (78, 1, -1, CAST(N'2018-04-21T08:18:37.503' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (79, 1, 1, CAST(N'2018-04-21T11:21:57.330' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (80, 1, -1, CAST(N'2018-04-21T15:17:04.863' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (81, 1, 2, CAST(N'2018-04-21T19:14:24.520' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (82, 1, 2, CAST(N'2018-04-21T21:49:15.510' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (83, 1, 3, CAST(N'2018-04-21T22:56:17.407' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (84, 1, 2, CAST(N'2018-04-22T07:56:12.527' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (85, 1, 2, CAST(N'2018-04-22T11:32:05.507' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (86, 1, -1, CAST(N'2018-04-22T20:28:26.757' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (87, 1, -1, CAST(N'2018-04-23T15:23:46.163' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (88, 1, 1, CAST(N'2018-04-23T21:24:04.333' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (89, 1, 1, CAST(N'2018-04-24T07:53:19.457' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (90, 1, -1, CAST(N'2018-04-25T06:34:36.110' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (91, 1, 1, CAST(N'2018-04-25T19:00:13.773' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (92, 1, 1, CAST(N'2018-04-25T21:37:57.070' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (93, 1, 1, CAST(N'2018-04-26T18:13:56.277' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (94, 1, 1, CAST(N'2018-04-26T22:32:20.450' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (95, 1, 1, CAST(N'2018-04-27T20:12:05.353' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (96, 1, -1, CAST(N'2018-04-27T22:18:16.857' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (97, 1, 1, CAST(N'2018-04-28T07:58:53.497' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (98, 1, 1, CAST(N'2018-04-28T11:27:56.727' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (99, 1, -1, CAST(N'2018-04-28T23:06:12.440' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (100, 1, 1, CAST(N'2018-04-29T08:29:32.187' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (101, 1, 1, CAST(N'2018-04-29T18:36:17.390' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (102, 1, -1, CAST(N'2018-04-29T21:34:18.947' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (103, 1, 1, CAST(N'2018-04-30T17:14:39.180' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (104, 1, 1, CAST(N'2018-04-30T18:23:53.437' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (105, 1, -1, CAST(N'2018-04-30T20:10:53.803' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (106, 1, 1, CAST(N'2018-05-01T13:28:06.763' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (107, 1, 1, CAST(N'2018-05-01T19:10:33.993' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (108, 1, 1, CAST(N'2018-05-02T07:33:57.233' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (109, 1, 1, CAST(N'2018-05-01T15:36:10.000' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (110, 1, 2, CAST(N'2018-05-02T13:16:01.170' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (111, 1, 1, CAST(N'2018-05-03T09:03:48.250' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (112, 1, 1, CAST(N'2018-05-03T14:39:00.390' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (113, 1, 2, CAST(N'2018-05-03T23:54:46.513' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (114, 1, 1, CAST(N'2018-05-04T13:00:24.523' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (115, 1, 1, CAST(N'2018-05-05T11:29:32.857' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (116, 1, 1, CAST(N'2018-05-06T08:05:41.870' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (117, 1, 1, CAST(N'2018-05-06T13:17:32.637' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (118, 1, 2, CAST(N'2018-05-06T21:28:58.320' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (119, 1, 2, CAST(N'2018-05-07T17:34:11.977' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (120, 1, 1, CAST(N'2018-05-07T14:34:19.303' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (121, 1, -1, CAST(N'2018-05-08T05:27:32.163' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (122, 1, 1, CAST(N'2018-05-08T22:22:55.527' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (123, 1, -1, CAST(N'2018-05-09T07:21:50.527' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (124, 1, 1, CAST(N'2018-05-09T22:39:06.663' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (125, 1, 1, CAST(N'2018-05-10T10:04:14.867' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (126, 1, 1, CAST(N'2018-05-10T10:04:22.890' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (127, 1, -1, CAST(N'2018-05-10T13:01:46.317' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (128, 1, 1, CAST(N'2018-05-10T16:38:50.337' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (129, 1, 2, CAST(N'2018-05-10T19:46:36.070' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (130, 1, 1, CAST(N'2018-05-10T23:56:32.097' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (131, 1, -1, CAST(N'2018-05-11T07:52:49.177' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (132, 1, -1, CAST(N'2018-05-11T11:00:32.030' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (133, 1, -1, CAST(N'2018-05-11T19:05:45.280' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (134, 1, 1, CAST(N'2018-05-11T21:34:44.787' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (135, 1, 1, CAST(N'2018-05-12T00:04:18.727' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (136, 1, -1, CAST(N'2018-05-12T10:43:45.127' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (137, 1, 1, CAST(N'2018-05-12T19:04:46.870' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (138, 1, 1, CAST(N'2018-05-13T08:22:48.273' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (139, 1, 1, CAST(N'2018-05-13T11:41:28.057' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (140, 1, 1, CAST(N'2018-05-13T15:19:04.097' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (141, 1, 1, CAST(N'2018-05-13T19:16:30.433' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (142, 1, 1, CAST(N'2018-05-13T21:52:42.593' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (143, 1, 1, CAST(N'2018-05-14T18:49:21.880' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (144, 1, -1, CAST(N'2018-05-14T21:39:40.970' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (145, 1, 1, CAST(N'2018-05-14T23:49:08.360' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (146, 1, -2, CAST(N'2018-05-15T08:47:14.373' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (147, 1, 1, CAST(N'2018-05-15T17:54:16.943' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (148, 1, 2, CAST(N'2018-05-15T22:09:21.427' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (149, 1, 2, CAST(N'2018-05-16T07:50:40.960' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (150, 1, -1, CAST(N'2018-05-16T18:54:57.880' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (151, 1, -2, CAST(N'2018-05-17T03:43:43.083' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (152, 1, 1, CAST(N'2018-05-17T19:44:03.823' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (153, 1, 1, CAST(N'2018-05-18T07:52:26.327' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (154, 1, 1, CAST(N'2018-05-18T21:49:40.137' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (155, 1, 1, CAST(N'2018-05-19T06:57:34.403' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (156, 1, -1, CAST(N'2018-05-19T12:21:44.127' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (157, 1, -1, CAST(N'2018-05-19T19:17:48.110' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (158, 1, 1, CAST(N'2018-05-19T22:07:12.693' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (159, 1, -2, CAST(N'2018-05-20T08:40:16.417' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (160, 1, 1, CAST(N'2018-05-20T17:10:41.727' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (161, 1, -1, CAST(N'2018-05-21T07:24:02.877' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (162, 1, 1, CAST(N'2018-05-21T20:41:34.847' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (163, 1, 1, CAST(N'2018-05-22T08:11:04.960' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (164, 1, -1, CAST(N'2018-05-22T15:11:13.297' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (165, 1, -1, CAST(N'2018-05-22T20:11:34.363' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (166, 1, -1, CAST(N'2018-05-23T17:58:37.733' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (167, 1, -1, CAST(N'2018-05-24T09:11:35.793' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (168, 1, 1, CAST(N'2018-05-24T21:13:34.903' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (169, 1, 1, CAST(N'2018-05-24T23:30:15.523' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (170, 1, -1, CAST(N'2018-05-23T16:08:25.000' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (171, 1, 1, CAST(N'2018-05-25T06:12:03.183' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (172, 1, 1, CAST(N'2018-05-25T17:50:58.930' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (173, 1, 1, CAST(N'2018-05-25T23:40:43.743' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (174, 1, -1, CAST(N'2018-05-26T06:59:20.103' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (175, 1, 1, CAST(N'2018-05-26T12:02:05.060' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (176, 1, 1, CAST(N'2018-05-26T18:02:32.327' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (177, 1, 1, CAST(N'2018-05-27T08:05:56.593' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (178, 1, -2, CAST(N'2018-05-27T15:24:47.347' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (179, 1, 1, CAST(N'2018-05-28T08:37:27.240' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (180, 1, 1, CAST(N'2018-05-28T19:41:43.183' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (181, 1, -1, CAST(N'2018-05-28T21:18:40.503' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (182, 1, -1, CAST(N'2018-05-28T22:34:59.787' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (183, 1, 1, CAST(N'2018-05-29T08:00:56.863' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (184, 1, -1, CAST(N'2018-05-29T09:23:28.987' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (185, 1, -1, CAST(N'2018-05-29T17:54:47.003' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (186, 1, 1, CAST(N'2018-05-29T22:04:51.483' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (187, 1, -1, CAST(N'2018-05-30T08:55:36.623' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (188, 1, -2, CAST(N'2018-05-31T06:45:20.063' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (189, 1, 1, CAST(N'2018-05-31T12:45:52.967' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (190, 1, 2, CAST(N'2018-05-31T20:01:38.423' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (191, 1, 1, CAST(N'2018-06-01T06:25:29.113' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (192, 1, 1, CAST(N'2018-06-01T20:24:32.373' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (193, 1, 1, CAST(N'2018-06-02T07:33:40.087' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (194, 1, -1, CAST(N'2018-06-02T08:00:53.453' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (195, 1, -1, CAST(N'2018-06-02T15:32:55.810' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (196, 1, 2, CAST(N'2018-06-03T08:10:20.860' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (197, 1, 1, CAST(N'2018-06-03T13:18:06.430' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (198, 1, 1, CAST(N'2018-06-03T22:52:26.047' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (199, 1, -1, CAST(N'2018-06-04T07:36:45.707' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (200, 1, 1, CAST(N'2018-06-04T22:37:01.297' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (201, 1, -1, CAST(N'2018-06-05T06:13:15.027' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (202, 1, -1, CAST(N'2018-06-05T20:45:16.823' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (203, 1, 2, CAST(N'2018-06-06T08:33:37.583' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (204, 1, -2, CAST(N'2018-06-06T21:32:05.290' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (205, 1, -1, CAST(N'2018-06-07T06:48:50.683' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (206, 1, 1, CAST(N'2018-06-07T17:46:57.703' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (207, 1, -1, CAST(N'2018-06-07T18:37:59.457' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (208, 1, 1, CAST(N'2018-06-07T21:25:17.490' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (209, 1, 1, CAST(N'2018-06-07T23:03:13.937' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (210, 1, 1, CAST(N'2018-06-08T06:58:26.573' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (211, 1, 1, CAST(N'2018-06-08T16:03:43.413' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (212, 1, 1, CAST(N'2018-06-08T20:22:06.627' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (213, 1, -1, CAST(N'2018-06-09T07:41:03.400' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (214, 1, 1, CAST(N'2018-06-09T09:31:12.177' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (215, 1, -1, CAST(N'2018-06-09T17:15:54.810' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (216, 1, 1, CAST(N'2018-06-09T23:21:06.707' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (217, 1, 1, CAST(N'2018-06-10T19:21:45.653' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (218, 1, -1, CAST(N'2018-06-10T19:39:16.307' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (219, 1, -2, CAST(N'2018-06-10T22:17:43.257' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (220, 1, -2, CAST(N'2018-06-11T07:08:09.077' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (221, 1, 1, CAST(N'2018-06-11T16:53:10.440' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (222, 1, 1, CAST(N'2018-06-11T20:15:51.843' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (223, 1, 1, CAST(N'2018-06-12T18:42:18.660' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (224, 1, 1, CAST(N'2018-06-12T21:22:27.500' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (225, 1, 1, CAST(N'2018-06-13T08:11:44.867' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (226, 1, 1, CAST(N'2018-06-13T20:32:53.467' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (227, 1, 1, CAST(N'2018-06-14T06:55:54.860' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (228, 1, 1, CAST(N'2018-06-14T17:37:22.217' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (229, 1, 1, CAST(N'2018-06-14T22:31:40.963' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (230, 1, -1, CAST(N'2018-06-15T07:06:38.450' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (231, 1, -1, CAST(N'2018-06-15T09:22:16.410' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (232, 1, 1, CAST(N'2018-06-15T19:06:49.837' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (233, 1, 1, CAST(N'2018-06-15T23:48:12.983' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (234, 1, 1, CAST(N'2018-06-16T07:50:14.583' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (235, 1, -1, CAST(N'2018-06-16T08:54:35.027' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (236, 1, -1, CAST(N'2018-06-16T15:35:58.583' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (237, 1, -1, CAST(N'2018-06-16T18:15:09.220' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (238, 1, 1, CAST(N'2018-06-16T21:07:41.773' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (239, 1, -1, CAST(N'2018-06-17T00:01:44.047' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (240, 1, 1, CAST(N'2018-06-17T08:09:06.003' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (241, 1, 1, CAST(N'2018-06-17T10:54:43.573' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (242, 1, 2, CAST(N'2018-06-17T14:16:16.707' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (243, 1, 1, CAST(N'2018-06-17T19:56:49.717' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (244, 1, 1, CAST(N'2018-06-18T07:34:38.240' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (245, 1, -2, CAST(N'2018-06-18T08:30:50.167' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (246, 1, 1, CAST(N'2018-06-18T18:17:20.313' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (247, 1, 1, CAST(N'2018-06-18T20:57:07.997' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (248, 1, 1, CAST(N'2018-06-19T07:39:01.607' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (249, 1, 1, CAST(N'2018-06-19T10:17:41.397' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (250, 1, -1, CAST(N'2018-06-19T18:23:50.287' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (251, 1, 1, CAST(N'2018-06-19T21:45:04.470' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (252, 1, -1, CAST(N'2018-06-19T23:36:00.427' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (253, 1, -1, CAST(N'2018-06-20T07:01:15.737' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (254, 1, 1, CAST(N'2018-06-20T16:57:43.527' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (255, 1, -1, CAST(N'2018-06-20T21:12:41.963' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (256, 1, -1, CAST(N'2018-06-21T07:07:37.727' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (257, 1, 1, CAST(N'2018-06-21T10:38:52.647' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (258, 1, 1, CAST(N'2018-06-21T11:22:01.410' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (259, 1, -1, CAST(N'2018-06-21T15:26:08.177' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (260, 1, -2, CAST(N'2018-06-21T15:49:37.587' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (261, 1, -1, CAST(N'2018-06-21T20:29:18.123' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (262, 1, -2, CAST(N'2018-06-21T23:03:14.907' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (263, 1, -2, CAST(N'2018-06-22T07:33:38.593' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (264, 1, 1, CAST(N'2018-06-22T17:03:31.053' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (265, 1, -2, CAST(N'2018-06-22T17:33:28.820' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (266, 1, -1, CAST(N'2018-06-22T22:22:55.453' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (267, 1, -1, CAST(N'2018-06-23T06:18:03.267' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (268, 1, 1, CAST(N'2018-06-23T15:58:24.437' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (269, 1, 1, CAST(N'2018-06-23T20:22:20.213' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (270, 1, -2, CAST(N'2018-06-23T21:06:25.087' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (271, 1, -1, CAST(N'2018-06-23T23:26:44.200' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (272, 1, -1, CAST(N'2018-06-24T06:53:18.830' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (273, 1, -1, CAST(N'2018-06-24T14:48:53.457' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (274, 1, 1, CAST(N'2018-06-24T17:07:37.320' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (275, 1, -2, CAST(N'2018-06-24T20:05:59.007' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (276, 1, -1, CAST(N'2018-06-24T21:17:36.570' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (277, 1, 1, CAST(N'2018-06-25T05:21:51.147' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (278, 1, -1, CAST(N'2018-06-25T17:22:15.790' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (279, 1, 1, CAST(N'2018-06-25T20:54:26.673' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (280, 1, -1, CAST(N'2018-06-26T07:40:15.743' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (281, 1, 1, CAST(N'2018-06-26T14:58:07.857' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (282, 1, 1, CAST(N'2018-06-26T17:34:17.997' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (283, 1, -1, CAST(N'2018-06-26T20:54:58.543' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (284, 1, -1, CAST(N'2018-06-26T23:34:38.867' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (285, 1, -1, CAST(N'2018-06-27T08:01:33.717' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (286, 1, 1, CAST(N'2018-06-27T08:49:19.653' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (287, 1, 1, CAST(N'2018-06-27T13:24:17.420' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (288, 1, 1, CAST(N'2018-06-27T16:09:10.557' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (289, 1, -1, CAST(N'2018-06-27T19:35:02.387' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (290, 1, 1, CAST(N'2018-06-27T22:23:00.113' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (291, 1, 2, CAST(N'2018-06-28T07:46:03.510' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (292, 1, -2, CAST(N'2018-06-28T18:09:31.537' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (293, 1, -1, CAST(N'2018-06-28T21:05:23.767' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (294, 1, -2, CAST(N'2018-06-28T22:09:54.550' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (295, 1, -1, CAST(N'2018-06-29T10:06:29.030' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (296, 1, 1, CAST(N'2018-06-29T11:52:12.627' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (297, 1, 1, CAST(N'2018-06-29T15:27:18.350' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (298, 1, -1, CAST(N'2018-06-29T17:49:17.560' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (299, 1, 1, CAST(N'2018-06-30T07:19:54.730' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (300, 1, 1, CAST(N'2018-06-30T08:14:22.147' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (301, 1, -1, CAST(N'2018-06-30T11:34:57.167' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (302, 1, -2, CAST(N'2018-06-30T02:35:09.770' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (303, 1, 1, CAST(N'2018-06-30T15:17:20.887' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (304, 1, -1, CAST(N'2018-06-30T18:04:03.307' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (305, 1, -1, CAST(N'2018-06-30T19:02:51.580' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (306, 1, 1, CAST(N'2018-06-30T22:42:40.723' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (307, 1, -2, CAST(N'2018-07-01T08:33:13.593' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (308, 1, 1, CAST(N'2018-07-01T13:02:42.280' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (309, 1, 1, CAST(N'2018-07-01T18:12:11.227' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (310, 1, 1, CAST(N'2018-07-01T22:51:28.410' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (311, 1, 1, CAST(N'2018-07-02T06:41:28.057' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (312, 1, -1, CAST(N'2018-07-02T13:05:11.687' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (313, 1, 1, CAST(N'2018-07-02T17:56:48.717' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (314, 1, 1, CAST(N'2018-07-02T21:48:42.993' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (315, 1, 1, CAST(N'2018-07-02T23:25:29.500' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (316, 1, -1, CAST(N'2018-07-03T06:42:09.477' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (317, 1, 1, CAST(N'2018-07-03T11:57:08.967' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (318, 1, -1, CAST(N'2018-07-03T15:02:27.267' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (319, 1, 1, CAST(N'2018-07-03T16:00:11.840' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (320, 1, 1, CAST(N'2018-07-03T20:58:40.767' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (321, 1, -1, CAST(N'2018-07-04T06:21:59.477' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (322, 1, -1, CAST(N'2018-07-04T09:52:04.670' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (323, 1, 1, CAST(N'2018-07-04T11:07:44.107' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (324, 1, -1, CAST(N'2018-07-05T07:55:09.787' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (325, 1, -1, CAST(N'2018-07-05T10:03:58.190' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (326, 1, -1, CAST(N'2018-07-05T11:48:55.747' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (327, 1, -1, CAST(N'2018-07-05T18:09:21.890' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (328, 1, 1, CAST(N'2018-07-05T19:35:53.150' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (329, 1, -1, CAST(N'2018-07-05T22:07:17.977' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (330, 1, 1, CAST(N'2018-07-06T08:17:54.053' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (331, 1, 1, CAST(N'2018-07-06T16:19:00.793' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (332, 1, 1, CAST(N'2018-07-06T18:52:52.150' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (333, 1, -1, CAST(N'2018-07-06T21:03:24.583' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (334, 1, 1, CAST(N'2018-07-07T07:53:06.127' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (335, 1, -1, CAST(N'2018-07-07T09:13:53.990' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (336, 1, 1, CAST(N'2018-07-07T13:36:22.800' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (337, 1, 1, CAST(N'2018-07-07T16:44:11.520' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (338, 1, 1, CAST(N'2018-07-07T20:24:45.837' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (339, 1, 1, CAST(N'2018-07-07T20:39:25.267' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (340, 1, 1, CAST(N'2018-07-07T23:08:11.000' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (341, 1, 1, CAST(N'2018-07-08T09:02:08.280' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (342, 1, -1, CAST(N'2018-07-08T10:36:56.807' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (343, 1, -1, CAST(N'2018-07-08T12:58:15.743' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (344, 1, 1, CAST(N'2018-07-08T21:50:07.613' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (345, 1, 1, CAST(N'2018-07-09T09:00:43.483' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (346, 1, -1, CAST(N'2018-07-09T09:58:24.643' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (347, 1, 1, CAST(N'2018-07-09T11:44:51.483' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (348, 1, 1, CAST(N'2018-07-09T14:18:38.287' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (349, 1, 1, CAST(N'2018-07-09T16:06:02.070' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (350, 1, 1, CAST(N'2018-07-09T20:23:51.300' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (351, 1, -1, CAST(N'2018-07-10T07:10:40.777' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (352, 1, -1, CAST(N'2018-07-10T13:39:47.583' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (353, 1, 1, CAST(N'2018-07-10T17:02:51.950' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (354, 1, 1, CAST(N'2018-07-10T18:29:48.323' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (355, 1, -1, CAST(N'2018-07-11T06:59:18.983' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (356, 1, 1, CAST(N'2018-07-11T07:49:35.023' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (357, 1, 1, CAST(N'2018-07-11T10:27:26.383' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (358, 1, 1, CAST(N'2018-07-11T14:00:16.263' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (359, 1, 1, CAST(N'2018-07-11T18:35:40.707' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (360, 1, 1, CAST(N'2018-07-11T23:17:59.900' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (361, 1, 1, CAST(N'2018-07-12T08:10:18.953' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (362, 1, 1, CAST(N'2018-07-12T12:01:55.477' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (363, 1, 1, CAST(N'2018-07-12T14:50:04.350' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (364, 1, 1, CAST(N'2018-07-12T17:44:52.190' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (365, 1, -1, CAST(N'2018-07-12T23:59:22.743' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (366, 1, -1, CAST(N'2018-07-13T08:06:02.743' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (367, 1, -1, CAST(N'2018-07-13T09:34:31.143' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (368, 1, 1, CAST(N'2018-07-13T14:14:33.447' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (369, 1, 1, CAST(N'2018-07-13T15:43:04.480' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (370, 1, -1, CAST(N'2018-07-13T17:24:54.770' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (371, 1, -1, CAST(N'2018-07-13T17:34:28.793' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (372, 1, 1, CAST(N'2018-07-13T20:28:31.903' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (373, 1, 1, CAST(N'2018-07-13T23:00:15.000' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (374, 1, 1, CAST(N'2018-07-14T08:44:27.687' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (375, 1, 1, CAST(N'2018-07-14T09:45:44.880' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (376, 1, -1, CAST(N'2018-07-14T10:31:04.307' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (377, 1, -2, CAST(N'2018-07-14T11:01:26.737' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (378, 1, 1, CAST(N'2018-07-14T19:36:32.307' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (379, 1, 1, CAST(N'2018-07-15T07:46:25.667' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (380, 1, -1, CAST(N'2018-07-15T09:03:35.720' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (381, 1, 1, CAST(N'2018-07-15T11:26:11.610' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (382, 1, 1, CAST(N'2018-07-15T14:11:41.027' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (383, 1, -1, CAST(N'2018-07-15T17:53:14.893' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (384, 1, -1, CAST(N'2018-07-15T18:32:17.673' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (385, 1, 1, CAST(N'2018-07-15T22:27:11.137' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (386, 1, -1, CAST(N'2018-07-16T00:05:20.257' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (387, 1, 1, CAST(N'2018-07-16T08:34:27.717' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (388, 1, 1, CAST(N'2018-07-16T12:17:17.310' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (389, 1, -2, CAST(N'2018-07-16T17:59:16.543' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (390, 1, -1, CAST(N'2018-07-16T18:45:10.577' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (391, 1, 1, CAST(N'2018-07-16T21:48:21.237' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (392, 1, -2, CAST(N'2018-07-16T23:19:29.343' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (393, 1, -2, CAST(N'2018-07-16T23:46:06.317' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (394, 1, -1, CAST(N'2018-07-17T08:54:19.170' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (395, 1, -1, CAST(N'2018-07-17T09:54:11.563' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (396, 1, 1, CAST(N'2018-07-17T11:30:51.877' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (397, 1, 1, CAST(N'2018-07-17T16:27:26.117' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (398, 1, -1, CAST(N'2018-07-17T21:30:05.590' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (399, 1, -1, CAST(N'2018-07-18T06:33:13.190' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (400, 1, 1, CAST(N'2018-07-18T11:19:03.793' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (401, 1, 1, CAST(N'2018-07-18T12:25:15.533' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (402, 1, 1, CAST(N'2018-07-18T16:31:10.097' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (403, 1, 1, CAST(N'2018-07-18T20:02:12.247' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (404, 1, -1, CAST(N'2018-07-18T20:51:36.857' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (405, 1, -1, CAST(N'2018-07-18T23:32:45.940' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (406, 1, -1, CAST(N'2018-07-19T08:14:06.220' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (407, 1, -1, CAST(N'2018-07-19T09:41:30.667' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (408, 1, 1, CAST(N'2018-07-19T17:31:03.983' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (409, 1, 1, CAST(N'2018-07-19T21:37:18.837' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (410, 1, 1, CAST(N'2018-07-20T07:54:54.203' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (411, 1, -1, CAST(N'2018-07-20T08:54:07.530' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (412, 1, 1, CAST(N'2018-07-20T11:49:19.397' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (413, 1, -1, CAST(N'2018-07-20T13:44:03.060' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (414, 1, 1, CAST(N'2018-07-20T17:44:34.220' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (415, 1, -1, CAST(N'2018-07-20T19:17:54.487' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (416, 1, 1, CAST(N'2018-07-20T23:29:01.013' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (417, 1, 1, CAST(N'2018-07-21T08:39:04.017' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (418, 1, -1, CAST(N'2018-07-21T17:55:54.757' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (419, 1, -1, CAST(N'2018-07-21T19:50:33.983' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (420, 1, 1, CAST(N'2018-07-21T20:42:25.483' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (421, 1, -1, CAST(N'2018-07-21T23:24:37.487' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (422, 1, 1, CAST(N'2018-07-22T08:38:49.350' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (423, 1, -1, CAST(N'2018-07-22T11:06:05.387' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (424, 1, -2, CAST(N'2018-07-22T14:29:42.637' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (425, 1, -1, CAST(N'2018-07-22T15:38:13.843' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (426, 1, 1, CAST(N'2018-07-22T16:34:24.393' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (427, 1, -1, CAST(N'2018-07-22T19:02:15.360' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (428, 1, -2, CAST(N'2018-07-22T20:13:08.147' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (429, 1, 1, CAST(N'2018-07-22T22:48:02.953' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (430, 1, 1, CAST(N'2018-07-23T08:56:13.427' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (431, 1, -1, CAST(N'2018-07-23T09:59:33.637' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (432, 1, 1, CAST(N'2018-07-23T20:12:08.057' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (433, 1, 1, CAST(N'2018-07-23T22:51:56.783' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (434, 1, -1, CAST(N'2018-07-24T08:22:11.487' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (435, 1, -1, CAST(N'2018-07-24T09:40:26.203' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (436, 1, 1, CAST(N'2018-07-24T14:24:48.193' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (437, 1, -1, CAST(N'2018-07-24T17:05:25.977' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (438, 1, 1, CAST(N'2018-07-24T18:58:32.183' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (439, 1, -2, CAST(N'2018-07-24T21:25:52.157' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (440, 1, 1, CAST(N'2018-07-24T23:47:02.407' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (441, 1, 1, CAST(N'2018-07-25T07:05:42.580' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (442, 1, -1, CAST(N'2018-07-25T10:03:50.827' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (443, 1, 1, CAST(N'2018-07-25T12:18:10.977' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (444, 1, -2, CAST(N'2018-07-25T17:09:15.213' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (445, 1, -1, CAST(N'2018-07-25T18:13:31.317' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (446, 1, -2, CAST(N'2018-07-25T18:29:12.907' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (447, 1, -2, CAST(N'2018-07-25T18:54:10.703' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (448, 1, -1, CAST(N'2018-07-25T20:31:50.257' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (449, 1, 1, CAST(N'2018-07-26T08:48:08.760' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (450, 1, 1, CAST(N'2018-07-26T13:02:39.343' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (451, 1, -1, CAST(N'2018-07-26T14:51:11.567' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (452, 1, 1, CAST(N'2018-07-26T20:18:12.570' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (453, 1, -2, CAST(N'2018-07-26T21:18:46.533' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (454, 1, 1, CAST(N'2018-07-27T00:09:16.110' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (455, 1, 1, CAST(N'2018-07-27T07:55:05.183' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (456, 1, -2, CAST(N'2018-07-27T10:27:37.943' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (457, 1, 1, CAST(N'2018-07-27T13:50:39.187' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (458, 1, 1, CAST(N'2018-07-27T18:00:03.383' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (459, 1, 1, CAST(N'2018-07-27T20:47:26.057' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (460, 1, 1, CAST(N'2018-07-28T08:47:53.847' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (461, 1, 1, CAST(N'2018-07-28T13:00:35.203' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (462, 1, -1, CAST(N'2018-07-28T15:48:45.847' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (463, 1, -1, CAST(N'2018-07-28T20:34:55.183' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (464, 1, 1, CAST(N'2018-07-28T23:56:24.290' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (465, 1, 1, CAST(N'2018-07-29T07:40:14.620' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (466, 1, 1, CAST(N'2018-07-29T10:25:35.477' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (467, 1, 1, CAST(N'2018-07-29T11:45:37.157' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (468, 1, -1, CAST(N'2018-07-29T14:11:26.217' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (469, 1, 1, CAST(N'2018-07-29T18:13:07.573' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (470, 1, -1, CAST(N'2018-07-29T18:29:42.677' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (471, 1, 1, CAST(N'2018-07-29T21:00:26.670' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (472, 1, -1, CAST(N'2018-07-30T00:06:42.213' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (473, 1, 1, CAST(N'2018-07-30T08:26:50.123' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (474, 1, 1, CAST(N'2018-07-30T11:26:25.557' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (475, 1, -1, CAST(N'2018-07-30T14:48:49.617' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (476, 1, 1, CAST(N'2018-07-30T16:52:40.613' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (477, 1, 1, CAST(N'2018-07-30T17:45:18.070' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (478, 1, -1, CAST(N'2018-07-30T20:01:41.823' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (479, 1, 1, CAST(N'2018-07-30T23:50:40.560' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (480, 1, 1, CAST(N'2018-07-31T09:06:12.987' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (481, 1, -2, CAST(N'2018-07-31T11:32:19.840' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (482, 1, 1, CAST(N'2018-07-31T14:27:59.867' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (483, 1, 1, CAST(N'2018-07-31T16:58:51.433' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (484, 1, 1, CAST(N'2018-07-31T22:21:24.803' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (485, 1, 1, CAST(N'2018-08-01T07:31:04.953' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (486, 1, 1, CAST(N'2018-08-01T10:17:36.607' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (487, 1, 1, CAST(N'2018-08-01T11:40:30.363' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (488, 1, 1, CAST(N'2018-08-01T16:43:45.183' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (489, 1, -1, CAST(N'2018-08-01T18:35:22.877' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (490, 1, -1, CAST(N'2018-08-01T22:32:08.960' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (491, 1, -1, CAST(N'2018-08-02T07:56:29.833' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (492, 1, 1, CAST(N'2018-08-02T14:32:20.327' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (493, 1, -1, CAST(N'2018-08-02T17:08:48.693' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (494, 1, 1, CAST(N'2018-08-02T19:58:37.247' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (495, 1, 1, CAST(N'2018-08-02T22:24:31.577' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (496, 1, 1, CAST(N'2018-08-03T07:27:59.200' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (497, 1, -1, CAST(N'2018-08-03T08:37:18.537' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (498, 1, 1, CAST(N'2018-08-03T14:30:46.103' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (499, 1, 1, CAST(N'2018-08-03T18:13:05.817' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (502, 1, 1, CAST(N'2018-08-03T22:27:37.737' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (503, 5, 1, CAST(N'2018-08-03T22:39:58.617' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (505, 1, -2, CAST(N'2018-08-04T07:48:55.017' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (508, 1, -1, CAST(N'2018-08-04T09:59:42.273' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (509, 5, -1, CAST(N'2018-08-04T10:17:05.313' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (511, 1, -1, CAST(N'2018-08-04T10:44:30.247' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (512, 1, -1, CAST(N'2018-08-04T11:12:46.880' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (515, 5, 2, CAST(N'2018-08-04T12:27:40.837' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (528, 1, 1, CAST(N'2018-08-04T14:54:46.983' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (535, 1, 2, CAST(N'2018-08-04T17:07:12.567' AS DateTime))
GO
INSERT [dbo].[t_health_status_entry] ([id], [user_id], [health_level_id], [occurrence_date_time]) VALUES (539, 1, 1, CAST(N'2018-08-04T18:41:50.647' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[t_health_status_entry] OFF
GO
SET IDENTITY_INSERT [dbo].[t_symptom_type] ON 
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (1, N'Fever', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (2, N'Headache', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (3, N'Stomach cramp', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (4, N'Excessive sweating', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (5, N'Chills', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (6, N'Sore throat', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (7, N'Nausea', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (8, N'Tooth ache', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (9, N'Congested nose', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (10, N'Brain fog', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (11, N'Muscle pain ', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (12, N'Underarm pain ', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (13, N'Itching', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (14, N'Fatigue', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (15, N'Flatulence', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (16, N'Upset stomach', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (17, N'Dizziness', NULL)
GO
INSERT [dbo].[t_symptom_type] ([id], [name], [description]) VALUES (18, N'Rash', NULL)
GO
SET IDENTITY_INSERT [dbo].[t_symptom_type] OFF
GO
SET IDENTITY_INSERT [dbo].[t_symptom_entry] ON 
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (3, 20, 1, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (4, 38, 1, 0)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (5, 39, 1, 0)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (6, 41, 2, 0)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (7, 43, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (8, 45, 7, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (9, 46, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (10, 52, 12, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (11, 52, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (12, 52, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (13, 54, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (14, 61, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (15, 62, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (16, 64, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (17, 65, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (18, 65, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (19, 67, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (20, 68, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (21, 68, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (22, 69, 15, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (23, 69, 16, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (24, 70, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (25, 71, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (26, 71, 12, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (27, 73, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (28, 73, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (29, 73, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (30, 75, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (31, 77, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (32, 78, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (33, 80, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (34, 86, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (35, 86, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (36, 87, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (37, 87, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (38, 88, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (39, 90, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (40, 91, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (41, 91, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (42, 96, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (43, 96, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (44, 96, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (45, 97, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (46, 98, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (47, 99, 8, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (48, 99, 15, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (49, 99, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (50, 101, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (51, 102, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (52, 102, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (53, 102, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (54, 103, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (55, 105, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (56, 107, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (57, 109, 18, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (58, 110, 18, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (59, 111, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (60, 112, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (61, 114, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (62, 115, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (63, 120, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (64, 121, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (65, 121, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (66, 122, 15, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (67, 122, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (68, 123, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (69, 126, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (70, 127, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (71, 128, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (72, 130, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (73, 131, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (74, 132, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (75, 132, 4, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (76, 132, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (77, 133, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (78, 133, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (79, 136, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (80, 136, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (81, 137, 15, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (82, 138, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (83, 139, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (84, 142, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (85, 143, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (86, 145, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (87, 146, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (88, 146, 3, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (89, 146, 7, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (90, 146, 9, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (91, 146, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (92, 147, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (93, 150, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (94, 151, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (95, 152, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (96, 153, 7, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (97, 153, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (98, 155, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (99, 156, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (100, 158, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (101, 159, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (102, 159, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (103, 159, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (104, 159, 7, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (105, 160, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (106, 161, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (107, 161, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (108, 161, 7, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (109, 164, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (110, 164, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (111, 165, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (112, 167, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (113, 167, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (114, 167, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (115, 168, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (116, 170, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (117, 170, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (118, 171, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (119, 174, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (120, 175, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (121, 178, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (122, 178, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (123, 178, 14, 3)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (124, 178, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (125, 181, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (126, 182, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (127, 182, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (128, 184, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (129, 184, 16, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (130, 187, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (131, 187, 16, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (132, 188, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (133, 188, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (134, 188, 16, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (135, 189, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (136, 191, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (137, 194, 15, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (138, 195, 3, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (139, 195, 15, 3)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (140, 198, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (141, 201, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (142, 201, 15, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (143, 202, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (144, 202, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (145, 202, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (146, 204, 2, 3)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (147, 204, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (148, 205, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (149, 207, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (150, 207, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (151, 209, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (152, 212, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (153, 212, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (154, 213, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (155, 215, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (156, 215, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (157, 218, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (158, 219, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (159, 219, 8, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (160, 220, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (161, 220, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (162, 223, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (163, 225, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (164, 225, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (165, 227, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (166, 228, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (167, 229, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (168, 230, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (169, 231, 16, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (170, 235, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (171, 237, 12, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (172, 237, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (173, 239, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (174, 241, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (175, 243, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (176, 244, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (177, 244, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (178, 245, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (179, 245, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (180, 248, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (181, 249, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (182, 252, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (183, 253, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (184, 254, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (185, 255, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (186, 256, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (187, 257, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (188, 259, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (189, 259, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (190, 260, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (191, 260, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (192, 261, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (193, 261, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (194, 263, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (195, 263, 16, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (196, 263, 8, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (197, 264, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (198, 267, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (199, 270, 8, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (200, 271, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (201, 272, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (202, 273, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (203, 273, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (204, 273, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (205, 273, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (206, 275, 8, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (207, 275, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (208, 276, 12, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (209, 277, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (210, 278, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (211, 278, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (212, 279, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (213, 280, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (214, 281, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (215, 282, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (216, 283, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (217, 283, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (218, 284, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (219, 285, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (220, 285, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (221, 287, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (222, 288, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (223, 289, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (224, 292, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (225, 292, 12, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (226, 292, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (227, 293, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (228, 294, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (229, 295, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (230, 296, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (231, 297, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (232, 298, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (233, 299, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (234, 300, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (235, 301, 4, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (236, 301, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (237, 302, 4, 3)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (238, 303, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (239, 304, 4, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (240, 305, 4, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (241, 307, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (242, 307, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (243, 311, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (244, 312, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (245, 314, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (246, 315, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (247, 316, 7, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (248, 316, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (249, 318, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (250, 318, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (251, 319, 12, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (252, 320, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (253, 321, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (254, 322, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (255, 322, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (256, 323, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (257, 324, 12, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (258, 324, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (259, 324, 4, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (260, 325, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (261, 326, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (262, 327, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (263, 328, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (264, 329, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (265, 331, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (266, 331, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (267, 332, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (268, 333, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (269, 334, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (270, 335, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (271, 338, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (272, 339, 15, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (273, 341, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (274, 342, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (275, 342, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (276, 342, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (277, 343, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (278, 343, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (279, 344, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (280, 345, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (281, 346, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (282, 348, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (283, 351, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (284, 352, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (285, 352, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (286, 352, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (287, 353, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (288, 355, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (289, 356, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (290, 357, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (291, 358, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (292, 361, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (293, 363, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (294, 364, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (295, 365, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (296, 366, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (297, 367, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (298, 367, 16, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (299, 367, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (300, 368, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (301, 370, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (302, 370, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (303, 371, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (304, 371, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (305, 372, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (306, 375, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (307, 375, 12, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (308, 376, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (309, 376, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (310, 376, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (311, 377, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (312, 377, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (313, 378, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (314, 379, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (315, 380, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (316, 383, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (317, 384, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (318, 385, 15, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (319, 386, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (320, 386, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (321, 387, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (322, 388, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (323, 388, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (324, 389, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (325, 389, 15, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (326, 389, 12, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (327, 389, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (328, 390, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (329, 390, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (330, 392, 11, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (331, 393, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (332, 394, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (333, 395, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (334, 395, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (335, 396, 4, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (336, 397, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (337, 398, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (338, 399, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (339, 401, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (340, 402, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (341, 403, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (342, 404, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (343, 404, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (344, 405, 3, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (345, 406, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (346, 406, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (347, 406, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (348, 406, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (349, 407, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (350, 407, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (351, 408, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (352, 410, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (353, 411, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (354, 411, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (355, 412, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (356, 415, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (357, 415, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (358, 415, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (359, 416, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (360, 417, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (361, 418, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (362, 418, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (363, 419, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (364, 421, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (365, 421, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (366, 423, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (367, 423, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (368, 423, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (369, 424, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (370, 424, 2, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (371, 424, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (372, 424, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (373, 425, 4, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (374, 426, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (375, 427, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (376, 427, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (377, 427, 14, 3)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (378, 428, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (379, 428, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (380, 428, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (381, 428, 2, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (382, 430, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (383, 431, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (384, 432, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (385, 432, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (386, 434, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (387, 434, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (388, 435, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (389, 435, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (390, 436, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (391, 437, 15, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (392, 437, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (393, 438, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (394, 438, 2, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (395, 439, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (396, 439, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (397, 439, 12, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (398, 439, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (399, 440, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (400, 440, 15, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (401, 441, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (402, 442, 4, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (403, 442, 12, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (404, 443, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (405, 444, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (406, 444, 12, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (407, 444, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (408, 446, 2, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (409, 446, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (410, 446, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (411, 448, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (412, 449, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (413, 451, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (414, 452, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (415, 453, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (416, 453, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (417, 455, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (418, 456, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (419, 456, 7, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (420, 457, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (421, 459, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (422, 460, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (423, 460, 6, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (424, 462, 12, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (425, 462, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (426, 463, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (427, 463, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (428, 464, 15, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (429, 465, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (430, 466, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (431, 466, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (432, 468, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (433, 468, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (434, 469, 15, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (435, 470, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (436, 471, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (437, 472, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (438, 472, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (439, 473, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (440, 475, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (441, 476, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (442, 478, 11, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (443, 480, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (444, 481, 14, 3)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (445, 483, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (446, 483, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (447, 484, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (448, 485, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (449, 486, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (450, 487, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (451, 488, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (452, 489, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (453, 489, 12, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (454, 490, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (455, 491, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (456, 492, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (457, 492, 13, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (458, 493, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (459, 497, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (460, 499, 14, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (461, 502, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (462, 505, 16, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (463, 505, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (464, 508, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (465, 508, 7, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (466, 508, 14, 2)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (467, 509, 9, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (470, 515, 9, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (471, 515, 8, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (472, 515, 4, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (489, 528, 10, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (490, 528, 17, 1)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (491, 528, 14, 3)
GO
INSERT [dbo].[t_symptom_entry] ([id], [health_status_entry_id], [symptom_type_id], [intensity_level_id]) VALUES (492, 528, 2, 1)
GO
SET IDENTITY_INSERT [dbo].[t_symptom_entry] OFF
GO
SET IDENTITY_INSERT [dbo].[t_medicine_type_supply_entry] ON 
GO
INSERT [dbo].[t_medicine_type_supply_entry] ([id], [medicine_type_id], [supply_quantity], [entry_date_time]) VALUES (40, 30, 64, CAST(N'2018-07-30T11:30:08.267' AS DateTime))
GO
INSERT [dbo].[t_medicine_type_supply_entry] ([id], [medicine_type_id], [supply_quantity], [entry_date_time]) VALUES (42, 47, 10, CAST(N'2018-08-04T12:46:59.830' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[t_medicine_type_supply_entry] OFF
GO
