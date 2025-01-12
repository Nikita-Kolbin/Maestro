package main

import (
	"context"
	"github.com/Nikita-Kolbin/Maestro/notification/internal/pkg/app"
	"log"
)

// @title           Notification
// @version         1.0

// @host      localhost:8083
// @BasePath  /api

func main() {
	ctx := context.Background()
	if err := app.Run(ctx); err != nil {
		log.Printf("run service failed, err: %s", err)
	}
}
