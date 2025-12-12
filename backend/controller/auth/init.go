package authController

import AppCtx "github.com/ghufrankhan7860/typing-test-featured/context"

type AuthController struct {
	app *AppCtx.App
}

func NewAuthController(app *AppCtx.App) *AuthController {
	return &AuthController{
		app: app,
	}
}

