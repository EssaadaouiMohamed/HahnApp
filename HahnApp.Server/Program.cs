

using Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace HahnApp.Server
{
    public class Program
{
    public async static Task Main(string[] args)
    {
        var host = CreateHostBuilder(args).Build();

        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            try
            {


                var context = services.GetRequiredService<UniContext>();
                
                    context.Database.Migrate();
                

                //var bydContext = services.GetRequiredService<IBydesignService>();
                //await bydContext.IntegrateFile(10, "PROJECTS_V0508 HackLab.xlsx");
                //return;

            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while migrating or seeding the database.");
                throw;
            }
        }

        await host.RunAsync();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}
}