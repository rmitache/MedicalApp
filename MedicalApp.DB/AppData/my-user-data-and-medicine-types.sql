USE [DEV_MedicalApp]
GO
SET IDENTITY_INSERT [dbo].[t_user] ON 
GO
INSERT [dbo].[t_user] ([id], [email], [password], [signup_date], [birth_date], [language]) VALUES (1, N'rmitache@hotmail.com', N'demo', CAST(N'2018-02-08' AS Date), CAST(N'1984-10-26' AS Date), N'en')
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
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (70, 41, CAST(N'2018-04-02' AS Date), NULL)
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
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (83, 43, CAST(N'2018-05-06' AS Date), NULL)
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
SET IDENTITY_INSERT [dbo].[t_plan_rule] OFF
GO
SET IDENTITY_INSERT [dbo].[t_medicine_type] ON 
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (1, N'Vitamin C Liposomal', N'Vit. C', N'Altrient', 0, 1, 1000, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (2, N'Total Cleanse Lymph', N'Lmph. Cleanse', N'Solaray', 0, 0, 750, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (3, N'Liver Hepato-Protect', N'Hepato Prot.', N'Provita', 0, 0, 600, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (4, N'Probiotic Barrier 10', N'Barrier10', N'NDS', 1, NULL, NULL, NULL)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (6, N'Artemisinin SOD', N'Artem. SOD', N'Researched Nutritionals', 0, 0, 800, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (7, N'Cat''s Claw', N'C.claw', N'Lymeherbs', 0, 0, 500, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (8, N'Andrographis', N'Andrographis', N'Lymeherbs', 0, 0, 500, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (9, N'L-Lysine', N'Lysine', N'Great Earth', 0, 0, 2000, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (10, N'Quercitin with Bromelain', N'Quercitin', N'Organika', 0, 0, 500, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (11, N'Liver Hepato-Protect', N'Liver HP', N'Provita', 0, 0, 800, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (12, N'Candida Support', N'Candida Supp.', N'Now', 0, 0, 700, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (13, N'Vit D3', N'Vit D3', N'Holistic', 0, 0, 50, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (14, N'Fortifikat', N'Fortifikat', N'Terapia', 0, 0, 750, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (15, N'Magnesium Citrat', N'Magn.', N'Solaray', 0, 0, 130, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (16, N'Bio-selenium + Zinc', N'Selenium', N'PharmaNord', 0, 0, 350, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (17, N'Transfer Factor-L', N'T. Factor L', N'Researched Nutriotionals', 0, 0, 260, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (18, N'Serrapeptase', N'Serrapep.', N'NutraMedix', 0, 0, 500, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (19, N'Chlorella', N'Chlorella', N'Pukka', 0, 0, 500, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (20, N'Japanese Knotweed', N'Jap. Knot.', N'Lymeherbs', 0, 0, 500, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (21, N'Nattokinase', N'Nattok.', N'Konig Laboratorium', 0, 0, 150, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (22, N'Biocidin LSF', N'Biocidin', N'Bio-Botanical Research', 0, 2, 94, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (23, N'BIoBran MGN3 (tablets)', N'MGN3', N'Daiwa Pharmaceutical', 0, 0, 250, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (25, N'BIoBran MGN3 (powder)', N'MGN3', N'Daiwa Pharmaceuticals', 0, 1, 1000, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (26, N'Ashwaghanda', N'Ashwg.', N'Provita', 0, 0, 550, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (27, N'Vitamin D3', N'Vit D3', N'Holistic', 0, 0, 2000, 2)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (28, N'NEUROadapt', N'N.adapt.', N'MITO care', 0, 0, 550, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (29, N'Flukonazole', N'Fklnz', N'Pharma', 0, 0, 100, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (30, N'Nystatin', N'Nstn.', N'Teva', 0, 0, 500000, 3)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (32, N'Artemisinin Solo', N'Artem. Solo', N'Researched Nutritionals', 0, 0, 250, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (33, N'Lymphstream Forte', N'Lymphst. F.', N'Konig Laboratorium', 0, 0, 725, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (34, N'BIG Harmony', N'BIG', N'Big Molecules', 0, 0, 750, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (35, N'Melissa Dream', N'Melissa', N'New Nordic', 0, 0, 620, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (36, N'Formula Candida', N'F Candida', N'Provita Nutrition', 0, 0, 750, 1)
GO
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (37, N'Chaga', N'Chaga', N'Provita', 0, 0, 400, 1)
GO
SET IDENTITY_INSERT [dbo].[t_medicine_type] OFF
GO
SET IDENTITY_INSERT [dbo].[t_plan_medicine_rule_item] ON 
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (82, 55, 7, 0, 2, 500, 1, 1, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (83, 55, 8, 0, 2, 500, 1, 1, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (84, 56, 6, 0, 1, 800, 1, 1, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (99, 63, 22, 2, 1, 94, 1, 2, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (100, 64, 22, 2, 2, 94, 1, 2, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (101, 65, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (102, 65, 2, 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (103, 65, 10, 0, 1, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (104, 65, 3, 0, 2, 600, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (105, 65, 19, 0, 6, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (106, 66, 15, 0, 2, 130, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (107, 66, 26, 0, 2, 550, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (108, 67, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (110, 63, 28, 0, 2, 550, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (114, 69, 28, 0, 2, 550, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (115, 64, 30, 0, 2, 500000, 3, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (116, 65, 14, 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (117, 67, 17, 0, 1, 260, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (118, 70, 13, 0, 2, 50, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (119, 70, 16, 0, 1, 350, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (120, 71, 4, 3, 1, 3000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (124, 74, 7, 0, 2, 500, 1, 1, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (125, 74, 8, 0, 2, 500, 1, 1, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (126, 75, 32, 0, 2, 250, 1, 1, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (130, 78, 25, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (131, 79, 22, 2, 1, 94, 1, 2, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (132, 80, 22, 2, 2, 94, 1, 2, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (133, 80, 30, 0, 2, 500000, 3, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (134, 82, 21, 0, 1, 150, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (135, 81, 18, 0, 2, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (136, 83, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (137, 83, 33, 0, 1, 725, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (138, 83, 10, 0, 1, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (139, 83, 3, 0, 2, 600, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (140, 83, 19, 0, 6, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (141, 83, 14, 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (142, 84, 15, 0, 2, 130, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (143, 84, 26, 0, 2, 550, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (144, 85, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (145, 85, 17, 0, 1, 260, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (146, 86, 13, 0, 2, 50, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (147, 86, 16, 0, 1, 350, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (148, 87, 4, 3, 1, 3000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (149, 88, 25, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (150, 89, 18, 0, 2, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (151, 90, 21, 0, 1, 150, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (152, 91, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (153, 91, 33, 0, 1, 725, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (154, 91, 10, 0, 1, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (155, 91, 3, 0, 2, 600, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (156, 91, 19, 0, 6, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (157, 92, 15, 0, 2, 130, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (158, 92, 26, 0, 2, 550, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (159, 93, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (160, 93, 17, 0, 1, 260, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (161, 94, 13, 0, 2, 50, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (162, 94, 16, 0, 1, 350, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (163, 95, 4, 3, 1, 3000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (164, 96, 25, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (165, 97, 18, 0, 2, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (166, 98, 21, 0, 1, 150, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (172, 104, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (173, 104, 33, 0, 1, 725, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (174, 104, 10, 0, 1, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (175, 104, 3, 0, 2, 600, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (176, 104, 19, 0, 6, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (177, 105, 15, 0, 2, 130, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (178, 105, 26, 0, 2, 550, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (179, 106, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (180, 107, 13, 0, 2, 50, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (181, 107, 16, 0, 1, 350, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (182, 108, 4, 3, 1, 3000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (184, 109, 25, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (185, 110, 18, 0, 2, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (186, 111, 21, 0, 1, 150, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (187, 112, 23, 0, 4, 250, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (188, 113, 7, 0, 2, 500, 1, 1, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (189, 113, 8, 0, 2, 500, 1, 1, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (190, 113, 20, 0, 2, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (191, 114, 22, 2, 1, 94, 1, 2, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (192, 115, 22, 2, 2, 94, 1, 2, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (193, 115, 30, 0, 2, 500000, 3, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (194, 116, 34, 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (196, 106, 12, 0, 1, 700, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (197, 107, 12, 0, 1, 700, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (198, 107, 9, 0, 1, 2000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (199, 106, 9, 0, 1, 2000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (200, 118, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (201, 124, 18, 0, 2, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (202, 123, 25, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (203, 122, 4, 3, 1, 3000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (204, 121, 9, 0, 1, 2000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (205, 121, 12, 0, 1, 700, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (206, 121, 16, 0, 1, 350, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (207, 121, 13, 0, 2, 50, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (208, 125, 21, 0, 1, 150, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (209, 120, 9, 0, 1, 2000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (210, 119, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (211, 119, 26, 0, 2, 550, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (212, 119, 15, 0, 2, 130, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (213, 118, 19, 0, 6, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (214, 118, 3, 0, 2, 600, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (215, 118, 10, 0, 1, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (216, 118, 33, 0, 1, 725, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (217, 120, 12, 0, 1, 700, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (218, 126, 23, 0, 4, 250, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (219, 127, 35, 0, 2, 620, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (220, 128, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (221, 134, 18, 0, 2, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (222, 133, 25, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (223, 132, 4, 3, 1, 3000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (224, 131, 13, 0, 4, 50, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (225, 131, 16, 0, 1, 350, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (226, 131, 12, 0, 1, 700, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (227, 131, 9, 0, 1, 2000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (228, 135, 21, 0, 1, 150, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (229, 130, 12, 0, 1, 700, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (230, 129, 15, 0, 2, 130, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (231, 129, 26, 0, 2, 550, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (232, 129, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (233, 128, 33, 0, 1, 725, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (234, 128, 10, 0, 1, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (235, 128, 3, 0, 2, 600, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (236, 128, 19, 0, 6, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (237, 130, 9, 0, 1, 2000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (238, 136, 23, 0, 4, 250, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (239, 137, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (240, 143, 18, 0, 2, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (241, 142, 25, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (242, 141, 4, 3, 1, 3000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (243, 140, 9, 0, 1, 2000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (244, 140, 36, 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (245, 140, 16, 0, 1, 350, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (246, 140, 13, 0, 4, 50, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (247, 144, 21, 0, 1, 150, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (248, 139, 9, 0, 1, 2000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (249, 138, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (250, 138, 26, 0, 2, 550, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (251, 138, 15, 0, 2, 130, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (252, 137, 19, 0, 6, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (253, 137, 3, 0, 2, 600, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (254, 137, 10, 0, 1, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (255, 137, 33, 0, 1, 725, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (256, 139, 36, 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (257, 145, 23, 0, 4, 250, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (258, 146, 35, 0, 2, 620, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (259, 146, 28, 0, 2, 550, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (260, 147, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (261, 153, 18, 0, 2, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (262, 152, 25, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (263, 151, 4, 3, 1, 3000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (264, 150, 37, 0, 1, 400, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (265, 150, 13, 0, 4, 50, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (266, 150, 16, 0, 1, 350, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (267, 150, 36, 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (268, 150, 9, 0, 1, 2000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (269, 154, 21, 0, 1, 150, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (270, 149, 37, 0, 1, 400, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (271, 149, 9, 0, 1, 2000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (272, 148, 15, 0, 2, 130, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (273, 148, 26, 0, 2, 550, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (274, 148, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (275, 147, 33, 0, 1, 725, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (276, 147, 10, 0, 1, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (277, 147, 3, 0, 2, 600, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (278, 147, 19, 0, 6, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (279, 149, 36, 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (280, 155, 23, 0, 4, 250, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (281, 156, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (283, 160, 25, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (284, 159, 9, 0, 1, 2000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (285, 159, 36, 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (287, 159, 13, 0, 4, 50, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (289, 158, 36, 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (290, 158, 9, 0, 1, 2000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (292, 157, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (293, 157, 26, 0, 2, 550, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (295, 156, 19, 0, 6, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (296, 156, 3, 0, 2, 600, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (297, 156, 10, 0, 1, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (298, 156, 33, 0, 1, 725, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (299, 162, 21, 0, 1, 150, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (300, 163, 23, 0, 4, 250, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (301, 164, 22, 2, 1, 94, 1, 2, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (302, 165, 22, 2, 2, 94, 1, 2, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (303, 165, 30, 0, 2, 500000, 3, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (304, 166, 22, 2, 1, 94, 1, 2, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (305, 167, 22, 2, 2, 94, 1, 2, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (306, 168, 22, 2, 1, 94, 1, 2, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (307, 169, 22, 2, 2, 94, 1, 2, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (308, 169, 30, 0, 2, 500000, 3, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (309, 170, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (310, 170, 19, 0, 4, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (311, 170, 3, 0, 2, 600, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (312, 170, 10, 0, 1, 500, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (313, 170, 33, 0, 1, 725, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (314, 171, 1, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (315, 171, 26, 0, 2, 550, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (316, 172, 36, 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (317, 172, 9, 0, 1, 2000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (318, 173, 9, 0, 1, 2000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (319, 173, 36, 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (320, 173, 13, 0, 4, 50, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (321, 173, 16, 0, 1, 350, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (322, 174, 25, 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (323, 175, 21, 0, 1, 150, 1, 0, 0)
GO
INSERT [dbo].[t_plan_medicine_rule_item] ([id], [plan_rule_id], [medicine_type_id], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (324, 176, 23, 0, 4, 250, 1, 0, 0)
GO
SET IDENTITY_INSERT [dbo].[t_plan_medicine_rule_item] OFF
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
SET IDENTITY_INSERT [dbo].[t_health_status_entry] OFF
GO
SET IDENTITY_INSERT [dbo].[t_medicine_factor_record] ON 
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (25, 1, 3, CAST(N'2018-02-09T23:14:26.440' AS DateTime), 0, 1, 600, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (26, 1, 3, CAST(N'2018-02-10T22:39:07.923' AS DateTime), 0, 2, 600, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (27, 1, 1, CAST(N'2018-02-12T06:45:32.000' AS DateTime), 1, 2, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (28, 1, 3, CAST(N'2018-02-15T00:50:16.000' AS DateTime), 0, 1, 600, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (29, 1, 4, CAST(N'2018-02-13T18:28:35.677' AS DateTime), 3, 1, 100, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (30, 1, 4, CAST(N'2018-02-15T22:05:58.750' AS DateTime), 3, 1, 100, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (31, 1, 1, CAST(N'2018-02-16T11:23:26.727' AS DateTime), 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (32, 1, 2, CAST(N'2018-02-16T11:23:26.727' AS DateTime), 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (33, 1, 4, CAST(N'2018-02-16T11:23:26.727' AS DateTime), 3, 1, 100, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (34, 1, 4, CAST(N'2018-02-16T21:38:28.530' AS DateTime), 3, 1, 100, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (35, 1, 1, CAST(N'2018-02-16T21:38:28.530' AS DateTime), 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (36, 1, 3, CAST(N'2018-02-16T21:38:28.530' AS DateTime), 0, 2, 600, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (37, 1, 2, CAST(N'2018-02-18T09:16:45.007' AS DateTime), 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (38, 1, 3, CAST(N'2018-02-18T09:16:45.007' AS DateTime), 0, 1, 600, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (39, 1, 1, CAST(N'2018-02-18T09:16:45.007' AS DateTime), 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (40, 1, 2, CAST(N'2018-02-18T09:48:53.150' AS DateTime), 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (41, 1, 2, CAST(N'2018-02-18T13:33:52.820' AS DateTime), 0, 1, 750, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (42, 1, 4, CAST(N'2018-02-18T20:54:28.280' AS DateTime), 3, 3, 100, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (43, 1, 4, CAST(N'2018-02-18T21:22:35.063' AS DateTime), 3, 1, 100, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (44, 1, 3, CAST(N'2018-02-18T21:22:35.063' AS DateTime), 0, 1, 600, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (45, 1, 4, CAST(N'2018-02-18T21:22:35.063' AS DateTime), 3, 1, 100, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (46, 1, 1, CAST(N'2018-03-04T15:52:37.563' AS DateTime), 1, 1, 1000, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (47, 1, 4, CAST(N'2018-03-04T19:25:57.720' AS DateTime), 3, 1, 100, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (48, 1, 3, CAST(N'2018-03-04T19:25:57.720' AS DateTime), 0, 2, 600, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (49, 1, 3, CAST(N'2018-03-09T18:06:19.293' AS DateTime), 0, 3, 600, 1, 1, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (50, 1, 23, CAST(N'2018-03-30T23:32:09.590' AS DateTime), 0, 4, 250, 1, 1, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (51, 1, 23, CAST(N'2018-03-31T23:05:31.943' AS DateTime), 0, 4, 250, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (52, 1, 23, CAST(N'2018-04-01T23:30:57.027' AS DateTime), 0, 1, 250, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (53, 1, 23, CAST(N'2018-04-01T23:30:01.493' AS DateTime), 0, 3, 250, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (54, 1, 35, CAST(N'2018-04-04T22:16:07.803' AS DateTime), 0, 2, 620, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (55, 1, 35, CAST(N'2018-04-05T22:15:58.637' AS DateTime), 0, 2, 620, 1, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (56, 1, 30, CAST(N'2018-05-06T13:16:44.820' AS DateTime), 0, 2, 500000, 3, 0, 0)
GO
INSERT [dbo].[t_medicine_factor_record] ([id], [user_id], [medicine_type_id], [occurrence_date_time], [unit_dose_type_id], [unit_dose_quantifier], [unit_dose_size], [unit_dose_uom_id], [instruction_id], [administration_method_id]) VALUES (57, 1, 30, CAST(N'2018-05-05T13:17:08.000' AS DateTime), 0, 2, 500000, 3, 0, 0)
GO
SET IDENTITY_INSERT [dbo].[t_medicine_factor_record] OFF
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
SET IDENTITY_INSERT [dbo].[t_symptom_entry] OFF
GO
