namespace Web.Api.Controllers
{
    [Route("api/techcompanies")]
    [ApiController]
    public class TechCompanyApiController : ControllerBase
    {
        private ITechCompanyService _service = null;
        private IAuthenticationService<int> _authService = null;

        public TechCompanyApiController(ITechCompanyService service, IAuthenticationService<int> authService)
        {
            _service = service;
            _authService = authService;
        }
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<TechCompany>>> Pagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<TechCompany> paged = _service.Pagination(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found.");
                }
                else
                {
                    ItemResponse<Paged<TechCompany>> result = new ItemResponse<Paged<TechCompany>>();
                    result.Item = paged;
                    code = 200;
                    return StatusCode(code, result);
                }
            }
            catch (SqlException sqlEx)
            {
                code = 500;
                response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
            }
            catch (ArgumentException argEx)
            {
                code = 500;
                response = new ErrorResponse($"ArgumentException Error: {argEx.Message}");
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"General Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<TechCompany>>> SearchPaginated(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<TechCompany> paged = _service.SearchPaginated(pageIndex, pageSize, query);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found.");
                }
                else
                {
                    ItemResponse<Paged<TechCompany>> result = new ItemResponse<Paged<TechCompany>>();
                    result.Item = paged;
                    code = 200;
                    return StatusCode(code, result);
                }
            }
            catch(SqlException sqlEx)
            {
                code = 500;
                response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
            }
            catch (ArgumentException argEx)
            {
                code = 500;
                response = new ErrorResponse($"ArgumentException Error: {argEx.Message}");
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"General Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
        [HttpGet]
        public ActionResult<ItemsResponse<TechCompany>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<TechCompany> list = _service.GetAll();

                if(list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resources not found.");
                }
                else
                {
                    response = new ItemsResponse<TechCompany> { Items = list };
                }
            }
            catch (SqlException sqlEx)
            {
                code = 500;

                response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
            }
            catch (ArgumentException argEx)
            {
                code = 500;

                response = new ErrorResponse($"ArgumentException Error: {argEx.Message}");
            }
            catch (Exception ex)
            {
                code = 500;

                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    
        [HttpGet("{id:int}")]
        public ActionResult<TechCompany> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                TechCompany techCompany = _service.Get(id);
                if (techCompany == null)
                {
                    code = 404;
                    response = new ErrorResponse("Record not found.");
                }
                else
                {
                    response = new ItemResponse<TechCompany> { Item = techCompany };
                }
            }
            catch (SqlException sqlEx)
            {
                code = 500;
                response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
            }
            catch (ArgumentException argEx)
            {
                code = 500;
                response = new ErrorResponse($"ArgumentException Error: {argEx.Message}");
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(TechCompanyAddRequest request)
        {
            int userId = _authService.GetCurrentUserId();
            int code = 201;
            BaseResponse response = null;
            try
            {
                int id = _service.Add(request, userId);
                code = 201;
                response = new ItemResponse<int> { Item = id };
            }
            catch (SqlException sqlEx)
            {
                code = 500;

                response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
            }
            catch (ArgumentException argEx)
            {
                code = 500;

                response = new ErrorResponse($"ArgumentException Error: {argEx.Message}");
            }
            catch (Exception ex)
            {
                code = 500;

                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch(SqlException sqlEx)
            {
                code = 500;
                response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
            }
            catch(ArgumentException argEx)
            {
                code = 500;
                response = new ErrorResponse($"ArgumentException Error: {argEx.Message}");
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"General Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(TechCompanyUpdateRequest request)
        {
            int userId = _authService.GetCurrentUserId();
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(request, userId);
                response = new SuccessResponse();
            }
            catch (SqlException sqlEx)
            {
                code = 500;
                response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
            }
            catch (ArgumentException argEx)
            {
                code = 500;
                response = new ErrorResponse($"ArgumentException Error: {argEx.Message}");
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
            }

            return StatusCode(code, response);
        }
    }
}
