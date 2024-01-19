using Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;

namespace HahnApp.Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private readonly IConfiguration _configuration;

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940

        internal IApplicationBuilder Initialize(this IApplicationBuilder app, Microsoft.Extensions.Configuration.IConfiguration _configuration)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();

            var initializers = serviceScope.ServiceProvider.GetServices<IAppInitialiser>();

            foreach (var initializer in initializers)
            {
                initializer.Initialize();
            }
            var oAppConfig = serviceScope.ServiceProvider.GetService<IOptions<AppConfiguration>>().Value;

            return app;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddSignalR();
            services
               .AddSingleton<IAuthorizationPolicyProvider>()
               .AddScoped<IAuthorizationHandler>()
               .AddIdentity<IdentityUser<int>, IdentityRole<int>>(options =>
               {
                   options.Password.RequiredLength = 6;
                   options.Password.RequireDigit = false;
                   options.Password.RequireLowercase = false;
                   options.Password.RequireNonAlphanumeric = false;
                   options.Password.RequireUppercase = false;
                   options.User.RequireUniqueEmail = true;
               })
               .AddEntityFrameworkStores<UniContext>()
               .AddDefaultTokenProviders();
            services.AddControllers();
            services.AddHttpClient();
            services.Configure<FormOptions>(options =>
            {
                options.MultipartBodyLengthLimit = long.MaxValue;
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IStringLocalizer<Startup> localizer)
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", typeof(Program).Assembly.GetName().Name);
                options.RoutePrefix = "swagger";
                options.DisplayRequestDuration();
            });
            app.UseCors();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Files")),
                RequestPath = new PathString("/Files")
            });
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.Initialize(_configuration);
        }
    }
}
