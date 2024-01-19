using HahnApp.Application.Extensions;
using HahnApp.Infrastructure.Extensions;
using HahnApp.Server.Extensions;
using HahnApp.Server.Middlewares;
using Hangfire;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System.IO;
using HahnApp.Server.Filters;
using HahnApp.Server.Managers.Preferences;
using Microsoft.Extensions.Localization;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Hosting;
using System.Threading;

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

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddForwarding(_configuration);
            services.AddLocalization(options =>
            {
                options.ResourcesPath = "Resources";
            });
            services.AddCurrentUserService();
            services.AddSerialization();
            services.AddDatabase(_configuration);
            services.AddServerStorage(); //TODO - should implement ServerStorageProvider to work correctly!
            services.AddScoped<ServerPreferenceManager>();
            services.AddServerLocalization();
            services.AddIdentity();
            services.AddJwtAuthentication(services.GetApplicationSettings(_configuration));
            services.AddSignalR();
            services.AddApplicationLayer();
            services.AddApplicationServices();
            services.AddRepositories();
            services.AddExtendedAttributesUnitOfWork();
            services.AddSharedInfrastructure(_configuration);
            services.RegisterSwagger();
            services.AddInfrastructureMappings();
            services.AddHangfire(x => x.UseSqlServerStorage(_configuration.GetConnectionString("DefaultConnection")));
            services.AddHangfireServer();
            services.AddControllers().AddValidators();
            services.AddExtendedAttributesValidators();
            services.AddExtendedAttributesHandlers();
            services.AddRazorPages();
            services.AddApiVersioning(config =>
            {
                config.DefaultApiVersion = new ApiVersion(1, 0);
                config.AssumeDefaultVersionWhenUnspecified = true;
                config.ReportApiVersions = true;
            });
            services.AddLazyCache();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IStringLocalizer<Startup> localizer)
        {
            app.UseForwarding(_configuration);
            app.UseExceptionHandling(env);
            app.UseHttpsRedirection();
            app.UseMiddleware<ErrorHandlerMiddleware>();
            /*app.UseSpa(spa =>
            {
                // Assuming 'Client/Client' is the relative path from the ASP.NET Core project to the Angular app
                spa.Options.SourcePath = "../Client/Client";

                if (env.IsDevelopment())
                {
                    // Adjust the command to navigate to the Angular app's directory
                    string angularClientPath = Path.GetFullPath(Path.Combine(env.ContentRootPath, "../Client/Client"));
                    string strCmdText = $@"/C cd ""{angularClientPath}"" & npm start";
                    System.Diagnostics.Process.Start("CMD.exe", strCmdText);
                    Thread.Sleep(7000); // Wait for the Angular server to start
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200"); // Proxy requests to Angular CLI server
                }
            });*/
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Files")),
                RequestPath = new PathString("/Files")
            });
            app.UseRequestLocalizationByCulture();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints();
            app.ConfigureSwagger();
            app.Initialize(_configuration);
        }
    }
}