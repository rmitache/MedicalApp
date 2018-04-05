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
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (71, 42, CAST(N'2018-04-02' AS Date), NULL)
GO
INSERT [dbo].[t_plan_version] ([id], [plan_id], [start_date], [end_date]) VALUES (73, 43, CAST(N'2018-04-04' AS Date), NULL)
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
SET IDENTITY_INSERT [dbo].[t_medicine_factor_record] OFF
GO
