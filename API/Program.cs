using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces;
using Application.Services;
using System.Text.Json.Serialization;
using Application.Core;
using API.Config;
using Domain.Users;
using Microsoft.AspNetCore.Identity;

public class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.RegisterServices(builder.Configuration);

        var app = builder.Build();


        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();
        app.UseCors("ReactAppPolicy"); // Apply the CORS policy

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.UseMiddleware<ExceptionHandlingMiddleware>();
        app.UseMiddleware<JwtMiddleware>();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");

        // when no controller route is hit, use the fallback controller
        app.MapFallbackToController("Index", "Fallback");
        //app.MapFallbackToFile("index.html"); ;

        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        try
        {
            var context = services.GetRequiredService<ApplicationDbContext>();
            var userManager = services.GetRequiredService<UserManager<AppUser>>();
            await context.Database.MigrateAsync();

            await Seed.SeedData(context, userManager);
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occured during migration");
        }


        app.Run();
    }
}