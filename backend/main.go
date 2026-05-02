package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	App := fiber.New()

	App.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello world from the fiber backend in go!")
	})

	log.Fatal(App.Listen(":3000"))
}
