package website

import (
	"context"
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
)

type Service interface {
	CreateWebsite(ctx context.Context, alias string, adminId int) (*model.Website, error)
	GetWebsiteByAdminId(ctx context.Context, adminId int) (*model.Website, error)
	SetWebsiteStyle(ctx context.Context, websiteAlias string, sections []*model.Section) ([]*model.Section, error)
	GetWebsiteByAlias(ctx context.Context, alias string) (*model.Website, error)
	GetWebsiteStyle(ctx context.Context, websiteAlias string) ([]*model.Section, error)
	DeleteWebsiteByAdmin(ctx context.Context, adminId int) error
}

type Website struct {
	srv Service
}

func NewAPI(srv Service) *Website {
	return &Website{
		srv: srv,
	}
}
