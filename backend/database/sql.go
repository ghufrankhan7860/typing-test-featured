package database

import (
	"context"
	"log"

	"github.com/ghufrankhan7860/typing-test-featured/config"
	"github.com/jackc/pgx/v5"
)

var DB *pgx.Conn

func Connect(cfg *config.Config) error 	{
	ctx := context.Background()

	connCfg, err := pgx.ParseConfig("")
	if err != nil {
		return err
	}

	connCfg.User = cfg.Database.User
	connCfg.Password = cfg.Database.Password
	connCfg.Host = cfg.Database.Host
	connCfg.Port = cfg.Database.Port
	connCfg.Database = cfg.Database.Database

	DB, err = pgx.ConnectConfig(ctx, connCfg)
	if err != nil {
		return err
	}

	log.Println("DB Connected successfully")
	return nil

}

func Close(){
	if DB != nil {
		DB.Close(context.Background())
	}
}