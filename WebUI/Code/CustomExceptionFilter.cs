using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Net;

public class CustomExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        HttpStatusCode status = HttpStatusCode.InternalServerError;

        var exceptionType = context.Exception.GetType();
        context.ExceptionHandled = true;
    }
}