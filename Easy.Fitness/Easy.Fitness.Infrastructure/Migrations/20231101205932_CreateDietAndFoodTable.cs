using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Easy.Fitness.Infrastructure.Migrations
{
    public partial class CreateDietAndFoodTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Diet",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Date = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    Calories = table.Column<double>(type: "double precision", maxLength: 30, nullable: false),
                    Fat = table.Column<double>(type: "double precision", maxLength: 30, nullable: false),
                    Carbs = table.Column<double>(type: "double precision", maxLength: 30, nullable: false),
                    Protein = table.Column<double>(type: "double precision", maxLength: 30, nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uuid", nullable: true),
                    ModifiedBy = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Diet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Diet_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Food",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Calories = table.Column<double>(type: "double precision", maxLength: 30, nullable: false),
                    Fat = table.Column<double>(type: "double precision", maxLength: 30, nullable: false),
                    Carbs = table.Column<double>(type: "double precision", maxLength: 30, nullable: false),
                    Protein = table.Column<double>(type: "double precision", maxLength: 30, nullable: false),
                    Weight = table.Column<double>(type: "double precision", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: true),
                    DietId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uuid", nullable: true),
                    ModifiedBy = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Food", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Food_Diet_DietId",
                        column: x => x.DietId,
                        principalTable: "Diet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Diet_UserId",
                table: "Diet",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Food_DietId",
                table: "Food",
                column: "DietId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Food");

            migrationBuilder.DropTable(
                name: "Diet");
        }
    }
}
