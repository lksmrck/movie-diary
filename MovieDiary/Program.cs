using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces;
using Application.Services;
using System.Text.Json.Serialization;
using Application.Core;
using API.Config;

public class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.RegisterServices(builder.Configuration);

        var app = builder.Build();

        // Seed DB context before app starts
        if (args.Length == 1 && args[0].ToLower() == "seeddata")
            SeedData(app);

        void SeedData(IHost app)
        {
            var scopedFactory = app.Services.GetService<IServiceScopeFactory>();

            using (var scope = scopedFactory.CreateScope())
            {
                var service = scope.ServiceProvider.GetService<Seed>();
                service.SeedData();
            }
        }


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

        app.UseMiddleware<ExceptionHandlingMiddleware>();
        app.UseMiddleware<JwtMiddleware>();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");

        app.MapFallbackToFile("index.html"); ;



        app.Run();
    }
}