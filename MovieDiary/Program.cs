using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces;
using Application.Services;
using System.Text.Json.Serialization;

public class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);



        builder.Services.AddDbContext<ApplicationDbContext>(opt =>
        {
            opt/*.UseLazyLoadingProxies()*/.UseSqlServer(builder.Configuration.GetConnectionString("DefaultSQLConnection"), b =>
            {
                b.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
            });
        });



        // Add services to the container.
        builder.Services.AddScoped<IMoviesService, MoviesService>();
        builder.Services.AddScoped<ICommentsService, CommentsService>();


        builder.Services.AddTransient<Seed>();
        builder.Services.AddControllersWithViews()
         .AddNewtonsoftJson(options =>
          options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
        );

        //builder.Services.AddEndpointsApiExplorer();
        //builder.Services.AddSwaggerGen();





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
            //app.UseSwagger();
            //app.UseSwaggerUI(c => {
            //    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V2");
            //});
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();


        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");



        app.MapFallbackToFile("index.html"); ;

        app.Run();
    }
}