package order

import (
	"context"
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
)

type Service interface {
	CreateOrder(ctx context.Context, customerId int, comment string) (*model.Order, error)
	GetOrdersByCustomerId(ctx context.Context, customerId int) ([]*model.Order, error)
	GetOrdersByAlias(ctx context.Context, alias string) ([]*model.Order, error)
	GetWebsiteByAdminId(ctx context.Context, adminId int) (*model.Website, error)
}

type Order struct {
	srv Service
}

func NewAPI(srv Service) *Order {
	return &Order{
		srv: srv,
	}
}
