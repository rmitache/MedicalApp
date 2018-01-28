using System;
using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using DataAccessLayer.Entities;
using BLL;
using DataAccessLayer.Repositories.MedicineTypesRepository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using Newtonsoft.Json.Serialization;
using WebUI.Controllers;

namespace WebUI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        //services.addtr
        //        Classes.FromAssemblyNamed("Infare.FE4.BLL")
        //      .IncludeNonPublicTypes()
        //      .InNamespace("Infare.FE4.BLL", true)
        //      .WithServiceDefaultInterfaces()
        //      .LifestyleTransient(),


        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc()
                .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());


            // DI configuration------------------------------------------------------------------------------------------------------------
            var containerBuilder = new ContainerBuilder();

            // WebUI
            var webUIAssembly = Assembly.GetExecutingAssembly();
            containerBuilder.RegisterAssemblyTypes(webUIAssembly).Where(t => t.Name.EndsWith("Controller")).InstancePerLifetimeScope();

            // BLL
            Assembly bllAssembly = typeof(BLL.DomainModel.Factors.Medicine.BLOs.MedicineFactorRecord).Assembly;
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
            //containerBuilder.RegisterType<MedicineTypeRepository>()
            //    .As<IMedicineTypeRepository>()
            //    .InstancePerDependency()
            //    .PropertiesAutowired();
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
