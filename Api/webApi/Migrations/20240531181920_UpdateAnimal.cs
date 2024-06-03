using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webApi.Migrations
{
    public partial class UpdateAnimal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnimalAge",
                table: "Animal");

            migrationBuilder.DropColumn(
                name: "AnimalType",
                table: "Animal");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Animal");

            migrationBuilder.AlterColumn<int>(
                name: "PetSize",
                table: "Animal",
                type: "INT",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "FLOAT",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<byte[]>(
                name: "AnimalPic",
                table: "Animal",
                type: "LONGBLOB",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "longblob",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "Animal",
                type: "DATE",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Animal",
                type: "VARCHAR(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "Sex",
                table: "Animal",
                type: "INT",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Species",
                table: "Animal",
                type: "INT",
                maxLength: 50,
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "Animal");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Animal");

            migrationBuilder.DropColumn(
                name: "Sex",
                table: "Animal");

            migrationBuilder.DropColumn(
                name: "Species",
                table: "Animal");

            migrationBuilder.AlterColumn<float>(
                name: "PetSize",
                table: "Animal",
                type: "FLOAT",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INT");

            migrationBuilder.AlterColumn<byte[]>(
                name: "AnimalPic",
                table: "Animal",
                type: "longblob",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "LONGBLOB",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "AnimalAge",
                table: "Animal",
                type: "DATE",
                maxLength: 100,
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "AnimalType",
                table: "Animal",
                type: "VARCHAR(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Animal",
                type: "VARCHAR(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
