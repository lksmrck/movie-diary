﻿using API.Services;
using Application.Core;
using Application.Interfaces;
using Application.Services;
using Domain.Movies;
using Domain.Users;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Text;

namespace API.Config
{
    public static class ApplicationServices
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<ApplicationDbContext>(opt =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                string connStr;

                if (env == "Development")
                {
                    // Use connection string from file.
                    connStr = config.GetConnectionString("DefaultSqlConnection");
                }
                else
                {
                    // Use connection string provided at runtime by Flyio.
                    connStr = Environment.GetEnvironmentVariable("PostgresConnString");
                }

                opt.UseNpgsql(connStr, b =>
                {
                    b.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
                 });
             });

            services.AddIdentity<AppUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddScoped<DbContext, ApplicationDbContext>();

            services.AddScoped<IMoviesService, MoviesService>();
            services.AddScoped<ICommentsService, CommentsService>();
            services.AddScoped<IRatingsService, RatingsService>();
            services.AddScoped<ICategoriesService, CategoriesService>();
            services.AddScoped<IUsersService, UsersService>();
            services.AddScoped<IStatisticsService, StatisticsService>();
            services.AddScoped<TokenService>();
            services.AddHttpContextAccessor();

            services.AddTransient<Seed>();

            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            });

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            var key = config.GetValue<string>("TokenKey");

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
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero // remove default 5min window, které bylo i když je v CreateToken nastavena délka kratší
                };
            });

            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsSameUser", policy =>
                {
                    policy.Requirements.Add(new IsSameUser());
                });
            });


            services.AddTransient<IAuthorizationHandler, IsSameUserHandler>();

            services.AddCors(options =>
            {
                options.AddPolicy("ReactAppPolicy", builder =>
                {
                    builder
                        .WithOrigins("https://localhost:44460") // Replace with your React app's URL
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .AllowAnyMethod()
                        .WithExposedHeaders("WWW-Authenticate");
                });
            });

            return services;
        }
    }
}
