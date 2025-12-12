package routes

import (
	"github.com/ghufrankhan7860/typing-test-featured/context"
	"github.com/ghufrankhan7860/typing-test-featured/handler"
	"github.com/ghufrankhan7860/typing-test-featured/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(ctx *context.App) {
	router := gin.Default()
	
	// Middleware to inject app context into gin.Context
	router.Use(func(c *gin.Context) {
		c.Set("app", ctx)
		c.Next()
	})
	
	v1 := router.Group("api/v1")
	{
		// Public auth routes (no JWT required)
		auth := v1.Group("/auth")
		{
			auth.POST("/login", handler.LoginHandler)
			auth.POST("/signup", handler.SignupHandler)
		}

		// Protected routes (JWT required)
		protected := v1.Group("/")
		protected.Use(middleware.JWTAuthMiddleware())
		{
			// Add your protected routes here
			protected.GET("/profile", handler.GetProfileHandler)
			protected.PUT("/profile", handler.UpdateProfileHandler)
			
			// Typing test routes (example)
			typing := protected.Group("/typing")
			{
				typing.GET("/tests", handler.GetTypingTestsHandler)
				typing.POST("/tests", handler.CreateTypingTestHandler)
				typing.GET("/tests/:id", handler.GetTypingTestHandler)
				typing.POST("/tests/:id/submit", handler.SubmitTypingTestHandler)
			}
		}
	}
	
	router.Run(ctx.Config.Port)
}