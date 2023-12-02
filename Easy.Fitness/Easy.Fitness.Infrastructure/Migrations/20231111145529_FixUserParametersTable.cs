using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Easy.Fitness.Infrastructure.Migrations
{
    public partial class FixUserParametersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserParameters_UserId",
                table: "UserParameters");

            migrationBuilder.CreateIndex(
                name: "IX_UserParameters_UserId",
                table: "UserParameters",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserParameters_UserId",
                table: "UserParameters");

            migrationBuilder.CreateIndex(
                name: "IX_UserParameters_UserId",
                table: "UserParameters",
                column: "UserId",
                unique: true);
        }
    }
}
