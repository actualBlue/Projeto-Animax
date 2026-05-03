package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	database "github.com/seu-usuario/vura-backend/db"
	Routes "github.com/seu-usuario/vura-backend/routes"
)

func main() {
	// init db
	database.ConnectDB()

	// init fiber
	App := fiber.New()
	App.Use(cors.New())

	// set routes
	setRoutes(App)

	// port
	log.Fatal(App.Listen(":4000"))
}

func setRoutes(app *fiber.App) {
	// login routes
	Routes.InitLogin(app)
	Routes.InitRegister(app)
}
