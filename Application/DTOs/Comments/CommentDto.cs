using Application.DTOs.Movies;

namespace Application.DTOs.Comments
{
    public record CommentDto
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public DateTime DateOfComment { get; set; }
        public Guid MovieID { get; set; }
        public ShortMovie Movie { get; set; }
    }
}
