USE [C120_cstannahill10_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_Update]    Script Date: 11/15/2022 12:44:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


	
	ALTER Proc [dbo].[TechCompanies_Update]
								@Name nvarchar(120)
							   ,@Profile nvarchar(455)
							   ,@Summary nvarchar(355)
							   ,@Headline nvarchar(120)
							   ,@ContactInformation nvarchar(255)
							   ,@Slug nvarchar(100)
							   ,@StatusId nvarchar(7)
								,@Url nvarchar(255)
								,@TypeId int
								,@PrimaryImageId int
								,@UserId int
								,@Id int
		
as 



/*

	Declare @Id int = 4;
	Select *
	From dbo.TechCompanies
	Where Id = @Id

	Declare @Name nvarchar(120) = 'Twitter'
			,@Profile nvarchar(455) = 'Ex2. Profile'
			,@Summary nvarchar(355) = 'Ex2. Profile'
			,@Headline nvarchar(120) = 'Ex2. Headline'
			,@ContactInformation nvarchar(255) = 'Ex2. Contact Info'
			,@Slug nvarchar(100) = 'xyzab'
			,@StatusId nvarchar(7) = '1'
			,@UserId int = 1
			,@Url nvarchar(255)
			,@TypeId int
			,@PrimaryImageId int
			

		Execute dbo.Techcompanies_Update
								@Name
							   ,@Profile
							   ,@Summary
							   ,@Headline
							   ,@ContactInformation
							   ,@Slug
							   ,@StatusId
							   ,@UserId
							   ,@Url
							   ,@TypeId
							    ,@PrimaryImageId
								,@Id


	Select *
	From dbo.TechCompanies
	Where Id = @Id




*/

BEGIN

	
	Update dbo.Images
				SET [Url] = @Url
				,[TypeId] = @TypeId

				Where Id = @PrimaryImageId
	
	UPDATE [dbo].[TechCompanies]
   SET [Name] = @Name
      ,[Profile] = @Profile
      ,[Summary] = @Summary
      ,[Headline] = @Headline
      ,[ContactInformation] = @ContactInformation
      ,[Slug] = @Slug
      ,[StatusId] = @StatusId
      ,[UserId] = @UserId
		 WHERE Id = @Id

END

