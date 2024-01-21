using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class AddMovieRating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieRating_Movies_MovieID",
                table: "MovieRating");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieRating_Ratings_RatingID",
                table: "MovieRating");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieRating_Users_UserID",
                table: "MovieRating");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieRating",
                table: "MovieRating");

            migrationBuilder.RenameTable(
                name: "MovieRating",
                newName: "MovieRatings");

            migrationBuilder.RenameIndex(
                name: "IX_MovieRating_UserID",
                table: "MovieRatings",
                newName: "IX_MovieRatings_UserID");

            migrationBuilder.RenameIndex(
                name: "IX_MovieRating_RatingID",
                table: "MovieRatings",
                newName: "IX_MovieRatings_RatingID");

            migrationBuilder.RenameIndex(
                name: "IX_MovieRating_MovieID",
                table: "MovieRatings",
                newName: "IX_MovieRatings_MovieID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieRatings",
                table: "MovieRatings",
                columns: new[] { "MovieID", "RatingID" });

            migrationBuilder.AddForeignKey(
                name: "FK_MovieRatings_Movies_MovieID",
                table: "MovieRatings",
                column: "MovieID",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieRatings_Ratings_RatingID",
                table: "MovieRatings",
                column: "RatingID",
                principalTable: "Ratings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieRatings_Users_UserID",
                table: "MovieRatings",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieRatings_Movies_MovieID",
                table: "MovieRatings");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieRatings_Ratings_RatingID",
                table: "MovieRatings");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieRatings_Users_UserID",
                table: "MovieRatings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieRatings",
                table: "MovieRatings");

            migrationBuilder.RenameTable(
                name: "MovieRatings",
                newName: "MovieRating");

            migrationBuilder.RenameIndex(
                name: "IX_MovieRatings_UserID",
                table: "MovieRating",
                newName: "IX_MovieRating_UserID");

            migrationBuilder.RenameIndex(
                name: "IX_MovieRatings_RatingID",
                table: "MovieRating",
                newName: "IX_MovieRating_RatingID");

            migrationBuilder.RenameIndex(
                name: "IX_MovieRatings_MovieID",
                table: "MovieRating",
                newName: "IX_MovieRating_MovieID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieRating",
                table: "MovieRating",
                columns: new[] { "MovieID", "RatingID" });

            migrationBuilder.AddForeignKey(
                name: "FK_MovieRating_Movies_MovieID",
                table: "MovieRating",
                column: "MovieID",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieRating_Ratings_RatingID",
                table: "MovieRating",
                column: "RatingID",
                principalTable: "Ratings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieRating_Users_UserID",
                table: "MovieRating",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
