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
using MedicalApp.WebUI.Code.WebSecurity.Implementation;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;

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

            //o =>
            //{
            //    o.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //    o.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //    o.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //}


            services
                .AddAuthentication()
                .AddCookie(options =>
                    {
                        options.AccessDeniedPath = new PathString("/LoginPage");
                        options.LoginPath = new PathString("/LoginPage");
                    })
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;

                    cfg.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"])),
                        RequireExpirationTime = false
                    };

                });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddCors();
            services
            .AddMvc(
                config =>
                {
                    config.Filters.Add(typeof(CustomExceptionFilter));
                })
                .AddJsonOptions(options =>
                    {
                        options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                        options.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc;
                    });

            

            // DI configuration------------------------------------------------------------------------------------------------------------
            var containerBuilder = new ContainerBuilder();

            // WebUI
            var webUIAssembly = Assembly.GetExecutingAssembly();
            containerBuilder.RegisterAssemblyTypes(webUIAssembly).Where(t => t.Name.EndsWith("Controller")).InstancePerLifetimeScope();
            containerBuilder.RegisterType<WebSecurityManager>()
               .AsSelf()
               .InstancePerLifetimeScope();


            // BLL
            Assembly bllAssembly = typeof(BLL.DomainModel.Factors.Medicine.BLOs.MedicineFactorRecord).Assembly;
            containerBuilder.RegisterAssemblyTypes(bllAssembly)
                .Where(t => t.Name.EndsWith("Engine") || t.Name.EndsWith("Service") || t.Name.EndsWith("Factory"))
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

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            //app.UseCors(
            //    options => options.WithOrigins("http://localhost:8100").AllowAnyMethod()
            //);

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
