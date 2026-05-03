package Routes

import (
	"github.com/gofiber/fiber/v2"
	database "github.com/seu-usuario/vura-backend/db"
	"github.com/seu-usuario/vura-backend/models"
)

func InitLogin(app *fiber.App) {
	app.Post("/login", func(c *fiber.Ctx) error {
		// get body
		var user models.User
		err := c.BodyParser(&user)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": "invalid json file",
			})
		}

		// checks
		

		return c.Status(200).JSON(user)
	})
}
