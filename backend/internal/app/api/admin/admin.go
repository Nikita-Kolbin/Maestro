package admin

import "context"

type Service interface {
	GetJWTSecret() string
	CreateAdmin(ctx context.Context, email, password string) (int, error)
}

type Admin struct {
	srv Service
}

func NewAPI(srv Service) *Admin {
	return &Admin{
		srv: srv,
	}
}
