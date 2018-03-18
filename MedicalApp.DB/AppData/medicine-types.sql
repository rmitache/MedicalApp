USE [DEV_MedicalApp]
GO
/****** Object:  Table [dbo].[t_medicine_type]    Script Date: 18-03-2018 17:53:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_medicine_type](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[short_name] [nvarchar](50) NULL,
	[producer_name] [nvarchar](50) NULL,
	[base_form_id] [int] NOT NULL,
	[packaged_unit_dose_type_id] [int] NULL,
	[packaged_unit_dose_size] [int] NULL,
	[packaged_unit_dose_uom_id] [int] NULL,
 CONSTRAINT [PK_t_medicine_type] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[t_medicine_type] ON 

INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (1, N'Vitamin C Liposomal', N'Vit. C', N'Altrient', 0, 1, 1000, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (2, N'Total Cleanse Lymph', N'Lmph. Cleanse', N'Solaray', 0, 0, 750, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (3, N'Liver Hepato-Protect', N'Hepato Prot.', N'Provita', 0, 0, 600, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (4, N'Probiotic Barrier 10', N'Barrier10', N'NDS', 1, NULL, NULL, NULL)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (6, N'Artemisinin', N'Artem.', N'Research Nutritionals', 0, 0, 800, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (7, N'Cat''s Claw', N'C.claw', N'Lymeherbs', 0, 0, 500, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (8, N'Andrographis', N'Andrographis', N'Lymeherbs', 0, 0, 500, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (9, N'L-Lysine', N'Lysine', N'Great Earth', 0, 0, 2000, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (10, N'Quercitin with Bromelain', N'Quercitin', N'Organika', 0, 0, 500, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (11, N'Liver Hepato-Protect', N'Liver HP', N'Provita', 0, 0, 800, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (12, N'Candida Support', N'Candida Supp.', N'Now', 0, 0, 700, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (13, N'Vit D3', N'Vit D3', N'Holistic', 0, 0, 50, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (14, N'Fortifikat', N'Fortifikat', N'Terapia', 0, 0, 750, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (15, N'Magnesium Citrat', N'Magn.', N'Solaray', 0, 0, 130, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (16, N'Bio-selenium + Zinc', N'Selenium', N'PharmaNord', 0, 0, 350, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (17, N'Transfer Factor-L', N'T. Factor L', N'Researched Nutriotionals', 0, 0, 260, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (18, N'Serrapeptase', N'Serrapep.', N'NutraMedix', 0, 0, 500, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (19, N'Chlorella', N'Chlorella', N'Pukka', 0, 0, 500, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (20, N'Japanese Knotweed', N'Jap. Knot.', N'Lymeherbs', 0, 0, 500, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (21, N'Nattokinase', N'Nattok.', N'Konig Laboratories', 0, 0, 150, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (22, N'Biocidin LSF', N'Biocidin', N'Bio-Botanical Research', 0, 2, 94, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (23, N'BIoBran MGN3 (powder)', N'MGN3', N'Daiwa Pharmaceutical', 0, 0, 250, 1)
INSERT [dbo].[t_medicine_type] ([id], [name], [short_name], [producer_name], [base_form_id], [packaged_unit_dose_type_id], [packaged_unit_dose_size], [packaged_unit_dose_uom_id]) VALUES (25, N'BIoBran MGN3 (tablets)', N'MGN3', N'Daiwa Pharmaceuticals', 0, 1, 1000, 1)
SET IDENTITY_INSERT [dbo].[t_medicine_type] OFF
