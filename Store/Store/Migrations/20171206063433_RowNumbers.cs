using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace StoreDataLayer.Migrations
{
    public partial class RowNumbers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RowNumber",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RowNumber",
                table: "Orders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RowNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RowNumber",
                table: "Orders");
        }
    }
}
