package config

import (
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	Database DatabaseConfig
	Server ServerConfig
}

type DatabaseConfig struct {
	User string
	Password string
	Host string
	Port uint16
	Database string
}

type ServerConfig struct {
	Port string
}

func Load() *Config{
	viper.SetConfigFile(".env")
	viper.SetConfigType("env")
	viper.AutomaticEnv()

	viper.SetDefault("DB_USER", "postgres")
	viper.SetDefault("DB_PASSWORD","")
	viper.SetDefault("DB_HOST", "localhost")
	viper.SetDefault("DB_PORT", 5432)
	viper.SetDefault("DB_NAME", "typing_tester")
	viper.SetDefault("SERVER_PORT", ":8080")

	if err := viper.ReadInConfig(); err != nil {
		log.Println("No .env file found, using defaults and environment variables")
	}

	return &Config{
		Database: DatabaseConfig{
			User : viper.GetString("DB_USER"),
			Password: viper.GetString("DB_PASSWORD"),
			Host:     viper.GetString("DB_HOST"),
			Port:     uint16(viper.GetInt("DB_PORT")),
			Database: viper.GetString("DB_NAME"),
		},
		Server : ServerConfig{
			Port: viper.GetString("SERVER_PORT"),
		},
	}
}