package redisclient

import (
	"context"
	"errors"
	"fmt"
	"github.com/redis/go-redis/v9"
	"time"
)

type Client struct {
	cli *redis.Client
}

func NewClient(ctx context.Context, hostPort, password string) (*Client, error) {
	cli := redis.NewClient(&redis.Options{
		Addr:     hostPort,
		Password: password,
	})

	if err := cli.Ping(ctx).Err(); err != nil {
		return nil, err
	}

	return &Client{cli: cli}, nil
}

func (c *Client) Close() {
	_ = c.cli.Close()
}

func (c *Client) Set(ctx context.Context, prefix, key, val string, exp time.Duration) error {
	return c.cli.Set(ctx, fmt.Sprintf("%s:%s", prefix, key), val, exp).Err()
}

func (c *Client) Get(ctx context.Context, prefix, key string) (string, error) {
	res, err := c.cli.Get(ctx, fmt.Sprintf("%s:%s", prefix, key)).Result()
	if err != nil {
		if errors.Is(err, redis.Nil) {
			return "", nil
		}
		return "", err
	}
	return res, nil
}
