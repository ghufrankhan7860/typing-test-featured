package main

import (
	"log"

	"github.com/ghufrankhan7860/typing-test-featured/config"
	"github.com/ghufrankhan7860/typing-test-featured/context"
	"github.com/ghufrankhan7860/typing-test-featured/database"
	"github.com/ghufrankhan7860/typing-test-featured/routes"
)

func main(){
	cfg := config.Load()

	if err := database.Connect(cfg); err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer database.Close()

	ctx := context.NewApp(database.DB, &cfg.Server)

	routes.SetupRoutes(ctx)
	

}