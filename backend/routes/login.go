package Routes

import (
	"github.com/gofiber/fiber/v2"
	database "github.com/seu-usuario/vura-backend/db"
	"github.com/seu-usuario/vura-backend/models"
	"golang.org/x/crypto/bcrypt"
)

func InitLogin(app *fiber.App) {
	app.Post("/login", func(c *fiber.Ctx) error {
		// get id
		var user models.User
		err := c.BodyParser(&user)

		// err handling
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": "invalid json file",
			})
		}

		// get db info
		var userInfo models.User
		dbErr := database.DB.First(&userInfo, user.ID)
		if dbErr.Error != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": "error fetching backend data",
			})
		}

		// checks
		if bcrypt.CompareHashAndPassword([]byte(userInfo.Password), []byte(user.Password)) != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": "wrong password",
			})
		}
		if userInfo.Email != user.Email {
			return c.Status(400).JSON(fiber.Map{
				"error": "wrong email",
			})
		}

		return c.Status(200).JSON(userInfo)
	})
}
