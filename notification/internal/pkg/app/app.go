package app

import (
	"context"
	"fmt"
	_ "github.com/Nikita-Kolbin/Maestro/notification/docs"
	"github.com/Nikita-Kolbin/Maestro/notification/internal/app/api"
	"github.com/Nikita-Kolbin/Maestro/notification/internal/app/config"
	"github.com/Nikita-Kolbin/Maestro/notification/internal/app/repository"
	"github.com/Nikita-Kolbin/Maestro/notification/internal/app/service"
	"github.com/Nikita-Kolbin/Maestro/notification/internal/pkg/clients/email"
	"github.com/Nikita-Kolbin/Maestro/notification/internal/pkg/clients/telegram"
	"github.com/go-chi/chi/v5"
	httpSwagger "github.com/swaggo/http-swagger"
	"log"
	"log/slog"
	"net/http"
)

func Run(ctx context.Context) error {
	cfg, err := config.New()
	if err != nil {
		return fmt.Errorf("init config failed: %w", err)
	}

	repo, err := repository.New(ctx, &cfg.Postgres)
	if err != nil {
		return fmt.Errorf("init reposytory failed: %w", err)
	}
	defer repo.Close(ctx)

	tgClient := telegram.New(cfg.Telegram.Token)

	emailClient := email.New(cfg.Email.Email, cfg.Email.Password, cfg.Email.SMTPHost, cfg.Email.SMTPPort)

	srv := service.New(repo, tgClient, emailClient)

	notificationAPI := api.New(srv)

	router := chi.NewRouter()

	router.Post("/api/send-email", notificationAPI.SendEmail)
	router.Post("/api/send-telegram", notificationAPI.SendTelegram)

	serverAddress := fmt.Sprintf("%s:%d", cfg.Listener.Host, cfg.Listener.Port)
	router.Get("/swagger/*", httpSwagger.Handler(
		httpSwagger.URL(serverAddress+"/swagger/doc.json"),
	))

	server := &http.Server{
		Addr:    serverAddress,
		Handler: router,
	}

	log.Println("start server")
	if err := server.ListenAndServe(); err != nil {
		log.Println("failed to start server:", slog.String("err", err.Error()))
	}

	return nil
}
