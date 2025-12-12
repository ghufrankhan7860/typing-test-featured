package authController

import (
	"net/http"

	"github.com/ghufrankhan7860/typing-test-featured/dtos"
	"github.com/gin-gonic/gin"
)

func (a *AuthController) LoginSerializer(ctx *gin.Context) (*dtos.LoginRequest, error) {
	var req dtos.LoginRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return nil, err
	}	
	return &req, nil;
}

func (a *AuthController) Login(ctx *gin.Context, request *dtos.LoginRequest) (*dtos.AuthResponse, error) {
	response, err := a.app.Services.GetAuthService().VerifyLogin(ctx.Request.Context(), request)
	if err != nil {
		return nil, err
	}
	return response, nil
}

func (a * AuthController) SignupSerializer(ctx *gin.Context) (*dtos.SignupRequest, error) {
	var req dtos.SignupRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return nil, err
	}
	return &req, nil;
}

func (a *AuthController) Signup(ctx *gin.Context, request *dtos.SignupRequest) (*dtos.AuthResponse, error) {
	response, err := a.app.Services.GetAuthService().Signup(ctx.Request.Context(), request)
	if err != nil {
		return nil, err
	}
	return response, nil
}