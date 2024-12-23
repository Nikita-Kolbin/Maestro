package service

import (
	"context"
	"encoding/json"
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
	"time"
)

const (
	websiteStyleKey = "website"
	websiteStyleTTL = 24 * time.Hour
)

func (s *Service) setWebsiteStyleCache(ctx context.Context, websiteAlias string, sections []*model.Section) error {
	data, err := json.Marshal(sections)
	if err != nil {
		return err
	}

	return s.cache.Set(ctx, websiteStyleKey, websiteAlias, string(data), websiteStyleTTL)
}

func (s *Service) getWebsiteStyleCache(ctx context.Context, websiteAlias string) ([]*model.Section, error) {
	strRes, err := s.cache.Get(ctx, websiteStyleKey, websiteAlias)
	if err != nil {
		return nil, err
	}
	if strRes == "" {
		return nil, nil
	}

	var res []*model.Section
	err = json.Unmarshal([]byte(strRes), &res)
	if err != nil {
		return nil, err
	}

	return res, nil
}
