using Persistence;
using Microsoft.EntityFrameworkCore;


public class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddTransient<Seed>();

        builder.Services.AddDbContext<ApplicationDbContext>(opt =>
        {
            opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultSQLConnection"));
        });

        // Add services to the container.

        builder.Services.AddControllersWithViews();

 





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


        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");

        //using var scope = app.Services.CreateScope();

        //var services = scope.ServiceProvider;


       

        //try
        //{
        //    var context = services.GetRequiredService<ApplicationDbContext>();

        //     context.Database.MigrateAsync();
        //     Seed.SeedData(context);
        //}
        //catch (Exception ex)
        //{
        //    var logger = services.GetRequiredService <ILogger<Program>>();
        //    logger.LogError(ex, "An error occured during migration");
        //}

        app.MapFallbackToFile("index.html"); ;

        app.Run();
    }
}