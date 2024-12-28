package service

import (
	"context"
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/logger"
)

func (s *Service) CreateWebsite(ctx context.Context, alias string, adminId int) (*model.Website, error) {
	haveSite, err := s.repo.AdminHaveWebsite(ctx, adminId)
	if err != nil {
		return nil, err
	}
	if haveSite {
		return nil, model.ErrAdminHaveWebsite
	}

	return s.repo.CreateWebsite(ctx, alias, adminId)
}

func (s *Service) GetWebsiteByAlias(ctx context.Context, alias string) (*model.Website, error) {
	return s.repo.GetWebsiteByAlias(ctx, alias)
}

func (s *Service) GetWebsiteByAdminId(ctx context.Context, adminId int) (*model.Website, error) {
	return s.repo.GetWebsiteByAdminId(ctx, adminId)
}

func (s *Service) SetWebsiteStyle(
	ctx context.Context,
	websiteAlias string,
	sections []*model.Section,
) ([]*model.Section, error) {

	err := s.repo.CreateSections(ctx, websiteAlias, sections)
	if err != nil {
		return nil, err
	}

	sections, err = s.repo.GetSectionsByWebsiteAlias(ctx, websiteAlias)
	if err != nil {
		return nil, err
	}

	err = s.setWebsiteStyleCache(ctx, websiteAlias, sections)
	if err != nil {
		logger.Error(ctx, "failed to set website style cache", err, err.Error())
	}

	return sections, nil
}

func (s *Service) GetWebsiteStyle(ctx context.Context, websiteAlias string) ([]*model.Section, error) {
	sections, err := s.getWebsiteStyleCache(ctx, websiteAlias)
	if err != nil {
		logger.Error(ctx, "failed to get website style from cache", err, err.Error())
	}
	if sections != nil {
		logger.Info(ctx, "get website style from cache", "alias", websiteAlias)
		return sections, nil
	}

	sections, err = s.repo.GetSectionsByWebsiteAlias(ctx, websiteAlias)
	if err != nil {
		return nil, err
	}

	err = s.setWebsiteStyleCache(ctx, websiteAlias, sections)
	if err != nil {
		logger.Error(ctx, "failed to set website style cache", err, err.Error())
	}

	return s.repo.GetSectionsByWebsiteAlias(ctx, websiteAlias)
}

func (s *Service) DeleteWebsiteByAdmin(ctx context.Context, adminId int) error {
	return s.repo.DeleteWebsiteByAdmin(ctx, adminId)
}
