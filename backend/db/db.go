package database

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/seu-usuario/vura-backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	// load .env
	godotenv.Load()
	dsn := os.Getenv("DB_URL")

	// load db
	Database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("ERROR: ", err)
	} else {
		fmt.Println("SUCESS: at connecting db")
	}

	DB = Database

	SyncErr := DB.AutoMigrate(&models.User{})
	if SyncErr != nil {
		fmt.Println("Error syncronizing db: ", SyncErr)
	}
}
