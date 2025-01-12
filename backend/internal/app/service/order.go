package service

import (
	"context"
	"fmt"
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/logger"
)

func (s *Service) CreateOrder(ctx context.Context, customerId int, comment string) (*model.Order, error) {
	id, err := s.repo.CreateOrder(ctx, customerId, comment)
	if err != nil {
		return nil, err
	}

	order, err := s.repo.GetOrderById(ctx, id)
	if err != nil {
		return nil, err
	}

	// Уведомления
	go func() {
		ctx = context.Background()

		msg := fmt.Sprintf("Заказ %d на сумму %d рублей успешно создан", order.Id, order.TotalSum)

		customer, err := s.repo.GetCustomerById(ctx, customerId)
		if err != nil {
			logger.Error(ctx, "failed to get customer by id", "err", err)
			return
		}
		if customer.EmailNotification {
			err := s.notification.SendEmail(customer.Email, msg)
			if err != nil {
				logger.Error(ctx, "failed to send email", "err", err)
			}
		}
		if customer.TelegramNotification {
			err := s.notification.SendTelegram(customer.Telegram, msg)
			if err != nil {
				logger.Error(ctx, "failed to send telegram", "err", err)
			}
		}

		admin, err := s.repo.GetAdminByAlias(ctx, customer.WebsiteAlias)
		if err != nil {
			logger.Error(ctx, "failed to get admin by alias", "err", err)
		} else {
			if admin.EmailNotification {
				err := s.notification.SendEmail(admin.Email, msg)
				if err != nil {
					logger.Error(ctx, "failed to send email", "err", err)
				}
			}
			if admin.TelegramNotification {
				err := s.notification.SendTelegram(admin.Telegram, msg)
				if err != nil {
					logger.Error(ctx, "failed to send telegram", "err", err)
				}
			}
		}
	}()

	return order, nil
}

func (s *Service) GetOrdersByCustomerId(ctx context.Context, customerId int) ([]*model.Order, error) {
	orderIds, err := s.repo.GetOrderIdsByCustomerId(ctx, customerId)
	if err != nil {
		return nil, err
	}

	orders := make([]*model.Order, 0, len(orderIds))
	for _, id := range orderIds {
		order, err := s.repo.GetOrderById(ctx, id)
		if err != nil {
			return nil, err
		}
		orders = append(orders, order)
	}

	return orders, nil
}

func (s *Service) GetOrdersByAlias(ctx context.Context, alias string) ([]*model.Order, error) {
	orderIds, err := s.repo.GetOrderIdsByAlias(ctx, alias)
	if err != nil {
		return nil, err
	}

	orders := make([]*model.Order, 0, len(orderIds))
	for _, id := range orderIds {
		order, err := s.repo.GetOrderById(ctx, id)
		if err != nil {
			return nil, err
		}
		orders = append(orders, order)
	}

	return orders, nil
}
