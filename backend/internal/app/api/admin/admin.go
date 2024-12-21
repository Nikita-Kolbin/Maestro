package admin

import (
	"context"

	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
)

type Service interface {
	GetJWTSecret() string
	CreateAdmin(ctx context.Context, email, password string) (int, error)
	GetAdminIdByEmailPassword(ctx context.Context, email, password string) (*model.Admin, error)
	GetAdminById(ctx context.Context, id int) (*model.Admin, error)
	UpdateAdminProfile(ctx context.Context, a *model.Admin) (*model.Admin, error)
}

type Admin struct {
	srv Service
}

func NewAPI(srv Service) *Admin {
	return &Admin{
		srv: srv,
	}
}
