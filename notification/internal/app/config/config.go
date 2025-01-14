package config

import (
	"os"
	"time"

	"github.com/caarlos0/env/v10"
	"github.com/joho/godotenv"
)

const ENVInDocker = "IN_DOCKER"

type Config struct {
	Env string `env:"JWT_SECRET" envDefault:"dev"`

	Listener ListenerConfig `envPrefix:"LISTENER_"`
	Postgres PostgresConfig `envPrefix:"POSTGRES_"`
	Telegram TelegramConfig `envPrefix:"TG_"`
	Email    EmailConfig    `envPrefix:"EMAIL_"`
}

type ListenerConfig struct {
	Host         string        `env:"HOST" envDefault:"0.0.0.0"`
	Port         int32         `env:"PORT" envDefault:"8083"`
	ReadTimeout  time.Duration `env:"READ_TIMEOUT" envDefault:"5m"`
	WriteTimeout time.Duration `env:"WRITE_TIMEOUT" envDefault:"1m"`
	IdleTimeout  time.Duration `env:"IDLE_TIMEOUT" envDefault:"5s"`
}

type PostgresConfig struct {
	HostPort          string        `env:"HOST_PORT,required"`
	Username          string        `env:"USER,required"`
	Password          string        `env:"PASSWORD,required"`
	DBName            string        `env:"DB_NAME" envDefault:"maestro"`
	DBMaxConn         int           `env:"DB_MAX_CONN" envDefault:"10"`
	DBMaxConnLifeTime time.Duration `env:"DB_MAX_CONN_LIFE_TIME" envDefault:"5m"`
	DBMaxConnIdleTime time.Duration `env:"DB_MAX_CONN_IDLE_TIME" envDefault:"1m"`
	DBTimeout         time.Duration `env:"DB_TIMEOUT" envDefault:"5s"`
}

type TelegramConfig struct {
	Token string `env:"TOKEN,required"`
}

type EmailConfig struct {
	Email    string `env:"ADDRESS,required"`
	Password string `env:"PASSWORD,required"`
	SMTPHost string `env:"SMTP_HOST,required"`
	SMTPPort string `env:"SMTP_PORT" envDefault:"25"`
}

func New() (*Config, error) {
	cfg := &Config{}

	if os.Getenv(ENVInDocker) == "" {
		if err := godotenv.Load("./local.env"); err != nil {
			return nil, err
		}
	}

	if err := env.Parse(cfg); err != nil {
		return nil, err
	}

	return cfg, nil
}
