using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public class IsSameUser : IAuthorizationRequirement
    {
    }

    // Check, že URL params ({userId}) == userId z tokenu v requestu
    public class IsSameUserHandler : AuthorizationHandler<IsSameUser>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsSameUserHandler(ApplicationDbContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsSameUser requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Task.CompletedTask;

            var userIdFromUrl = _httpContextAccessor.HttpContext?.Request.RouteValues
              .SingleOrDefault(x => x.Key == "userId").Value?.ToString();

            if (userId == userIdFromUrl) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
