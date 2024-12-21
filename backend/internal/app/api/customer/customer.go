package customer

import (
	"context"

	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
)

type Service interface {
	GetJWTSecret() string
	CreateCustomer(ctx context.Context, alias, email, password string) (int, error)
	GetCustomerIdByEmailPassword(ctx context.Context, alias, email, password string) (*model.Customer, error)
	GetWebsiteByAdminId(ctx context.Context, adminId int) (*model.Website, error)
	GetCustomersByWebsite(ctx context.Context, alias string) ([]*model.Customer, error)
	UpdateCustomerProfile(ctx context.Context, c *model.Customer) (*model.Customer, error)
	GetCustomerById(ctx context.Context, id int) (*model.Customer, error)
}

type Customer struct {
	srv Service
}

func NewAPI(srv Service) *Customer {
	return &Customer{
		srv: srv,
	}
}
