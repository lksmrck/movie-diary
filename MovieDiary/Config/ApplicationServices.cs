using API.Services;
using Application.Core;
using Application.Interfaces;
using Application.Services;
using Domain.Users;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Text;
using static Azure.Core.HttpHeader;

namespace API.Config
{
    public static class ApplicationServices
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<ApplicationDbContext>(opt =>
            {
                opt/*.UseLazyLoadingProxies()*/.UseSqlServer(config.GetConnectionString("DefaultSQLConnection"), b =>
                {
                    b.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
                });
            });

            services.AddIdentity<AppUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddScoped<DbContext, ApplicationDbContext>();

            services.AddScoped<IMoviesService, MoviesService>();
            services.AddScoped<ICommentsService, CommentsService>();
            services.AddScoped<IUsersService, UsersService>();
            services.AddScoped<TokenService>();

            services.AddTransient<Seed>();
            services.AddControllersWithViews()
             .AddNewtonsoftJson(options =>
              options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            //builder.Services.AddEndpointsApiExplorer();
            //builder.Services.AddSwaggerGen();

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            var key = config.GetValue<string>("ApiSettings:Secret");

            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(opt =>
            {
                opt.RequireHttpsMetadata = false;
                opt.SaveToken = true;
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });




            services.AddCors(options =>
            {
                options.AddPolicy("ReactAppPolicy", builder =>
                {
                    builder
                        .WithOrigins("https://localhost:44460") // Replace with your React app's URL
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });



            //FluentValidation
            //services.AddControllers().AddFluentValidation(fv =>
            //{
            //    fv.RegisterValidatorsFromAssemblyContaining<Program>();
            //});

            //Register services of other projects
            //Notes.Validation.Config.ServicesConfig.RegisterServices(services);

            return services;
        }
    }
}
