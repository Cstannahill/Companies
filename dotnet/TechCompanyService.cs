namespace Services
{
    public class TechCompanyService : ITechCompanyService
    {
        IDataProvider _data = null;

        public TechCompanyService(IDataProvider data)
        {
            _data = data;
        }

        public Paged<TechCompany> Pagination(int pageIndex, int pageSize)
        {
            string procName = "dbo.TechCompanies_SelectPagination";
            Paged<TechCompany> pagedList = null;
            List<TechCompany> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
            (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            },
            (reader, recordSetIndex) =>
            {
                int startingIndex = 0;
                TechCompany techCompany = MapSingleTechCompany(reader, ref startingIndex);
                techCompany.ActiveJobs = reader.DeserializeObject<List<Job>>(startingIndex++);
                totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<TechCompany>();
                }
                list.Add(techCompany);
            }
            );
            if(list != null)
            {
                pagedList = new Paged<TechCompany>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<TechCompany> SearchPaginated(int pageIndex, int pageSize, string query)
        {
            string procName = "dbo.TechCompanies_SearchPaginated";
            Paged<TechCompany> pagedList = null;
            List<TechCompany> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@Query", query);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    TechCompany techCompany = MapSingleTechCompany(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex);

                    if (list == null)
                    {
                        list = new List<TechCompany>();
                    }
                    list.Add(techCompany);
                }
                );
            if(list != null)
            {
                pagedList = new Paged<TechCompany>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public TechCompany Get(int id)
        {
            string procName = "dbo.TechCompanies_SelectById";
            TechCompany techCompany = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                techCompany = MapSingleTechCompany(reader, ref startingIndex);
            });
            return techCompany;
        }

        public List<TechCompany> GetAll()
        {
            List<TechCompany> list = null;
            string procName = "[dbo].[TechCompanies_SelectAll]";

            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                Job activeJob = new Job();
                int startingIndex = 0;
                TechCompany techCompany = MapSingleTechCompany(reader, ref startingIndex);
                techCompany.ActiveJobs = reader.DeserializeObject<List<Job>>(startingIndex);

                if (list == null)
                {
                    list = new List<TechCompany>();
                }
                list.Add(techCompany);
            });
                return list;
        }
        public int Add(TechCompanyAddRequest request, int userId)
        {
            int id = 0;
            string procName = "[dbo].[TechCompanies_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(request, col);
                col.AddWithValue("@UserId", userId);

                SqlParameter IdOut = new SqlParameter("@Id", SqlDbType.Int);
                IdOut.Direction = ParameterDirection.Output;
                col.Add(IdOut);
            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }
        public void Update(TechCompanyUpdateRequest request, int userId)
        {
            string procName = "[dbo].[TechCompanies_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(request, col);
                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@Id", request.Id);
                col.AddWithValue("@PrimaryImageId", request.PrimaryImage.Id);
            },
            returnParameters: null);
        }
        public void Delete(int id)
        {
            string procName = "[dbo].[TechCompanies_Delete]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            },
            returnParameters: null);
        }
        private static void AddCommonParams(TechCompanyAddRequest request, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", request.Name);
            col.AddWithValue("@Profile", request.Profile);
            col.AddWithValue("@Summary", request.Summary);
            col.AddWithValue("@Headline", request.Headline);
            col.AddWithValue("@ContactInformation", request.ContactInformation);
            col.AddWithValue("@Slug", request.Slug);
            col.AddWithValue("@StatusId", request.StatusId);
            col.AddWithValue("@Url", request.PrimaryImage.Url);
            col.AddWithValue("@TypeId", request.PrimaryImage.TypeId);
            
        }
        private static TechCompany MapSingleTechCompany(IDataReader reader, ref int startingIndex)
        {
            TechCompany techCompany = new TechCompany();
            techCompany.PrimaryImage = new Image();

            techCompany.Id = reader.GetSafeInt32(startingIndex++);
            techCompany.Name = reader.GetSafeString(startingIndex++);
            techCompany.Profile = reader.GetSafeString(startingIndex++);
            techCompany.Summary = reader.GetSafeString(startingIndex++);
            techCompany.Headline = reader.GetSafeString(startingIndex++);
            techCompany.ContactInformation = reader.GetSafeString(startingIndex++);
            techCompany.Slug = reader.GetSafeString(startingIndex++);
            techCompany.StatusId = reader.GetSafeInt32(startingIndex++);
            techCompany.PrimaryImage.Id = reader.GetSafeInt32(startingIndex++);
            techCompany.PrimaryImage.Url = reader.GetSafeString(startingIndex++);
            techCompany.PrimaryImage.TypeId = reader.GetSafeInt32(startingIndex++);
            techCompany.UserId = reader.GetSafeInt32(startingIndex++);
            techCompany.DateModified = reader.GetSafeDateTime(startingIndex++);
            techCompany.DateCreated = reader.GetSafeDateTime(startingIndex++);
            return techCompany;

        }
    }
}
