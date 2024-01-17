# what image to start from
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env

# location inside docker container
WORKDIR /app

# copy .cspro and restore as distinct layers
COPY "MovieDiary.sln" "MovieDiary.sln"
COPY "Application/Application.csproj" "Application/Application.csproj"
COPY "Domain/Domain.csproj" "Domain/Domain.csproj"
COPY "Infrastructure/Infrastructure.csproj" "Infrastructure/Infrastructure.csproj"
COPY "Persistence/Persistence.csproj" "Persistence/Persistence.csproj"

RUN dotnet restore "MovieDiary.sln"

# copy everything else and build
COPY . .
RUN dotnet publis -c Release -o out

# build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0


COPY --from=build-env /app/out .

ENTRYPOINT ["dotnet", "API.dll"]