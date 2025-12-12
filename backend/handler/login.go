package handler

import (
	"net/http"

	appCtx "github.com/ghufrankhan7860/typing-test-featured/context"
	authController "github.com/ghufrankhan7860/typing-test-featured/controller/auth"

	"github.com/gin-gonic/gin"
)

func LoginHandler(ctx *gin.Context) {
	var app *appCtx.App
	if o, ok := ctx.Get("app"); ok {
		if app, ok = o.(*appCtx.App); !ok {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
			return
		}
	}else{
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	loginCtrl := authController.NewAuthController(app)
	request, err := loginCtrl.LoginSerializer(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	response, err := loginCtrl.Login(ctx, request)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	
	ctx.JSON(http.StatusOK, response)
}

func SignupHandler(ctx *gin.Context) {
	var app *appCtx.App
	if o, ok := ctx.Get("app"); ok {
		if app, ok = o.(*appCtx.App); !ok {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
			return
		}
	} else {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	signupCtrl := authController.NewAuthController(app)
	request, err := signupCtrl.SignupSerializer(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	response, err := signupCtrl.Signup(ctx, request)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	ctx.JSON(http.StatusCreated, response)
}