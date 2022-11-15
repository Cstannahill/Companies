namespace Models.Domain.TechCompanies
{
    public class TechCompany
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Profile { get; set; }
        public string Summary { get; set; }
        public string Headline { get; set; }
        public string ContactInformation { get; set; }
        public string Slug { get; set; }
        public int StatusId { get; set; }
        public Image PrimaryImage { get; set; }
        public int UserId { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime DateCreated { get; set; }

        public List<Job> ActiveJobs { get; set; }

    }
}
