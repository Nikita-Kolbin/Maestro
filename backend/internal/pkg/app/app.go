package app

import (
	"context"
	"fmt"
	"github.com/Nikita-Kolbin/Maestro/internal/app/api/router"
	"github.com/Nikita-Kolbin/Maestro/internal/app/config"
	"github.com/Nikita-Kolbin/Maestro/internal/app/repository"
	"github.com/Nikita-Kolbin/Maestro/internal/app/service"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/clients/minioclient"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/clients/notification"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/clients/redisclient"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/httpserver"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/logger"
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

	stg, err := minioclient.New(ctx, cfg.Minio.HostPort, cfg.Minio.Username, cfg.Minio.Password, cfg.Minio.UseSSL)
	if err != nil {
		return fmt.Errorf("init storage failed: %w", err)
	}

	cache, err := redisclient.NewClient(ctx, cfg.Redis.HostPort, cfg.Redis.Password)
	if err != nil {
		return fmt.Errorf("init cache failed: %w", err)
	}
	defer cache.Close()

	notify := notification.New(cfg.Notification.HostPort)

	srv := service.New(repo, stg, cache, notify, cfg.JWTSecret)

	r := router.New(ctx, srv, cfg.Listener.GetHostPort())

	server := httpserver.New(
		cfg.Listener.GetHostPort(), r,
		cfg.Listener.ReadTimeout,
		cfg.Listener.WriteTimeout,
		cfg.Listener.IdleTimeout,
	)

	logger.Info(ctx, "starting http server", "host_port", cfg.Listener.GetHostPort())
	if err = server.Run(); err != nil {
		return fmt.Errorf("failed run server: %w", err)
	}

	return nil
}
