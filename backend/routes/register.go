package Routes

import (
	"github.com/gofiber/fiber/v2"
	database "github.com/seu-usuario/vura-backend/db"
	"github.com/seu-usuario/vura-backend/models"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(s string) string {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(s), 10)
	if err != nil {
		return ""
	}
	return string(hashedPassword)
}

func InitRegister(app *fiber.App) {
	app.Post("/register", func(c *fiber.Ctx) error {
		// get body
		var user models.User
		err := c.BodyParser(&user)

		if len(user.Password) < 6 || len(user.Password) > 50 {
			return c.Status(400).JSON(fiber.Map{
				"error": "password must be between 6 and 50 characters",
			})
		}
		if len(user.Username) < 4 || len(user.Username) > 30 {
			return c.Status(400).JSON(fiber.Map{
				"error": "username must be between 4 an 30 characters",
			})
		}

		// err handling
		if err != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": "invalid body!",
			})
		}

		// hash user password
		user.Password = HashPassword(user.Password)

		result := database.DB.Create(&user)
		if result.Error != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": result.Error,
			})
		}
		return c.Status(200).JSON(user)
	})
}
