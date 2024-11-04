package service

import (
	"context"
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
)

type repository interface {
	CreateAdmin(ctx context.Context, email, password string) (int, error)
	GetAdminIdByEmailPassword(ctx context.Context, email, passwordHash string) (*model.Admin, error)

	CreateWebsite(ctx context.Context, alias string, adminId int) error
	AdminHaveWebsite(ctx context.Context, adminID int) (bool, error)
}

type Service struct {
	jwtSecret string
	repo      repository
}

func New(repo repository, jwtSecret string) *Service {
	return &Service{
		repo: repo,
	}
}
