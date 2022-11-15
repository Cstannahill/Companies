USE [C120_cstannahill10_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Techcompanies_Insert]    Script Date: 11/15/2022 12:42:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


	
	ALTER Proc [dbo].[Techcompanies_Insert]
								@Name nvarchar(120)
							   ,@Profile nvarchar(455)
							   ,@Summary nvarchar(355)
							   ,@Headline nvarchar(120)
							   ,@ContactInformation nvarchar(255)
							   ,@Slug nvarchar(100)
							   ,@StatusId nvarchar(7)
							   ,@UserId int
							   ,@TypeId int 
							   ,@Url nvarchar(255)
							   ,@Id int OUTPUT
	
as 



/*

	Declare @Name nvarchar(120) = 'Google'
			,@Profile nvarchar(455) = 'Ex. Profile'
			,@Summary nvarchar(355) = 'Ex. Profile'
			,@Headline nvarchar(120) = 'Ex. Headline'
			,@ContactInformation nvarchar(255) = 'Ex. Contact Info'
			,@Slug nvarchar(100) = 'xyzab'
			,@StatusId nvarchar(7) = '1'
			,@UserId int = 1
			,@ImageTypeId int = 1
			,@ImageUrl nvarchar(255) = 'https://image.architonic.com/imgArc/project-1/4/5201637/evolution-design-google-hub-architonic-009-f0-reception-02.jpg'
			,@Id int

		Execute dbo.Techcompanies_Insert
								@Name
							   ,@Profile
							   ,@Summary
							   ,@Headline
							   ,@ContactInformation
							   ,@Slug
							   ,@StatusId
							   ,@UserId
							   ,@ImageTypeId 
							   ,@ImageUrl
							   ,@Id int OUTPUT

	Select *
	From dbo.TechCompanies

	Select *
	From dbo.Images


*/

BEGIN

	
	INSERT INTO dbo.Images
				([TypeId]
				,[Url])
		
		VALUES (@TypeId
				,@Url)

	Declare	@PrimaryImageId int = SCOPE_IDENTITY()
	
	INSERT INTO [dbo].[TechCompanies]
			   ([Name]
			   ,[Profile]
			   ,[Summary]
			   ,[Headline]
			   ,[ContactInformation]
			   ,[Slug]
			   ,[StatusId]
			   ,[UserId]
			   ,[PrimaryImageId])
		 VALUES
			   (@Name
				,@Profile
				,@Summary
				,@Headline
				,@ContactInformation
				,@Slug
				,@StatusId
			    ,@UserId
			    ,@PrimaryImageId)

			Set @Id  = SCOPE_IDENTITY()

END

