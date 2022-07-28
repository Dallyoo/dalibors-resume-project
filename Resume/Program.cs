using Microsoft.AspNetCore.Http.Connections;
using Resume.Middlewares;
using Resume.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpContextAccessor();

// Localization
builder.Services.AddLocalization(options =>
{
    options.ResourcesPath = "Resources";
});

builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var supportedCultures = new[]
    {
        "cs-CZ",
        "en-US"
    };

    options.SetDefaultCulture("cs-CZ");
    options.AddSupportedUICultures(supportedCultures);
    options.AddSupportedCultures(supportedCultures);
    options.FallBackToParentUICultures = true;
    /*
    options
        .RequestCultureProviders
        .Remove(typeof(AcceptLanguageHeaderRequestCultureProvider));
    */

});

builder.Services.AddScoped<RequestLocalizationCookiesMiddleware>();

// Logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Add services to the container.
var mvcBuilder = builder.Services
    .AddRazorPages()
    .AddViewLocalization();

// Server side Blazor
builder.Services.AddServerSideBlazor(options =>
{
    // Set timeout for JSInterop for one minute
    options.JSInteropDefaultCallTimeout = TimeSpan.FromMinutes(1);
    options.DetailedErrors = true;
})
    .AddHubOptions(options =>
    {
        options.ClientTimeoutInterval = TimeSpan.FromMinutes(5);
        options.KeepAliveInterval = TimeSpan.FromSeconds(15);
        options.HandshakeTimeout = TimeSpan.FromMinutes(10);
    });

#if DEBUG
if (builder.Environment.IsDevelopment())
{
    mvcBuilder.AddRazorRuntimeCompilation();
}
#endif

// Razor templating service from BlazorComponentLibrary
builder.Services.AddRazorTemplating();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
// Localization
app.UseRequestLocalization();
// Will remember to write the cookie 
app.UseRequestLocalizationCookies();
app.UseRouting();
app.MapRazorPages();
app.MapBlazorHub(options =>
{
    // Use LongPolling as default for BlazorHub,
    // because our provider does not provide enough resources
    // to run websockets optimally under IIS
    options.Transports = HttpTransportType.WebSockets | HttpTransportType.LongPolling;
    options.WebSockets.CloseTimeout = TimeSpan.FromSeconds(30);
    options.LongPolling.PollTimeout = TimeSpan.FromSeconds(30);
});

app.Run();
