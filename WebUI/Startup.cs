using System;
using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using DataAccessLayer.Entities;

using DataAccessLayer.Repositories.MedicineTypeRepository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using Newtonsoft.Json.Serialization;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;

namespace WebUI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services
                .AddAuthentication(o =>
                    {
                        o.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                        o.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                        o.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    })
                .AddCookie(options =>
                    {
                        options.AccessDeniedPath = new PathString("/LoginPage");
                        options.LoginPath = new PathString("/LoginPage");
                    });



            services
                .AddMvc()
                .AddJsonOptions(options =>
                    {
                        options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                        options.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Local;
                    });





            // DI configuration------------------------------------------------------------------------------------------------------------
            var containerBuilder = new ContainerBuilder();

            // WebUI
            var webUIAssembly = Assembly.GetExecutingAssembly();
            containerBuilder.RegisterAssemblyTypes(webUIAssembly).Where(t => t.Name.EndsWith("Controller")).InstancePerLifetimeScope();

            // BLL
            Assembly bllAssembly = typeof(BLL.DomainModel.Factors.Medicine.History.BLOs.MedicineFactorRecord).Assembly;
            containerBuilder.RegisterAssemblyTypes(bllAssembly)
                .Where(t => t.Name.EndsWith("Service") || t.Name.EndsWith("Factory"))
                .AsImplementedInterfaces()
                .InstancePerDependency();

            // DAL
            Assembly dalAssembly = typeof(MedicineTypeRepository).Assembly;
            containerBuilder.RegisterAssemblyTypes(dalAssembly)
                .Where(t => t.Name.EndsWith("Repository"))
                .AsImplementedInterfaces()
                .InstancePerDependency();
            containerBuilder.RegisterType<DataEntitiesContext>()
                .InstancePerDependency();
            //-----------------------------------------------------------------------------------------------------------------------------

            containerBuilder.Populate(services);
            var container = containerBuilder.Build();
            return new AutofacServiceProvider(container);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/HomePage/Error");
            }


            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=HomePage}/{action=Index}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "HomePage", action = "Index" });
            });



        }
    }
}
