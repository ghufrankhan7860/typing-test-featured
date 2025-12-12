package context

import (
	"github.com/ghufrankhan7860/typing-test-featured/config"
	"github.com/ghufrankhan7860/typing-test-featured/repositories"
	"github.com/ghufrankhan7860/typing-test-featured/services"
	"github.com/jackc/pgx/v5"
)

type App struct {
	Services    *services.ServiceContainer
	DB 			*pgx.Conn
	Config 		*config.ServerConfig
}

func NewApp(db *pgx.Conn, Config *config.ServerConfig) *App {
	repoContainer := repositories.NewRepositoryContainer(db)
	serviceContainer := services.NewServiceContainer(repoContainer)
	return &App {
		Services: serviceContainer,
		DB: db,
		Config: Config,
	}
}
