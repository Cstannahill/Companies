USE [C120_cstannahill10_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_SearchPaginated]    Script Date: 11/15/2022 12:43:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	
	ALTER proc [dbo].[TechCompanies_SearchPaginated] ---Set to Name Currently
							@PageIndex int
							,@PageSize int
							,@Query nvarchar(120)

as

/*
	Declare	@PageIndex int = 0
			,@PageSize int = 2
			,@Query nvarchar(120) = 'Micro'

		Execute TechCompanies_SearchPaginated
											@PageIndex
											,@PageSize
											,@Query



*/
	
	
	
	
BEGIN	
	
	Declare @Offset int = @PageIndex * @PageSize
	
	SELECT tc.[Id]
		  ,[Name]
		  ,[Profile]
		  ,[Summary]
		  ,[Headline]
		  ,[ContactInformation]
		  ,[slug]
		  ,[statusId]
		  ,i.Id
		  ,i.Url
		  ,i.TypeId
		  ,[UserId]
		  ,DateModified
		  ,DateCreated
		  ,[TotalCount] = COUNT(1) OVER()
	   FROM [dbo].[TechCompanies] as tc inner join dbo.Images as i
			on tc.PrimaryImageId = i.Id

	  WHERE (Name LIKE '%' + @Query + '%')
	  Order By tc.Id
		
		Offset @Offset Rows
	  FETCH NEXT @PageSize Rows ONLY
	  


END


