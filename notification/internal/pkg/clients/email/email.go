package email

import (
	"fmt"
	"net/smtp"
)

type Client struct {
	email    string
	password string
	smtpHost string
	smtpPort string
	smtpAddr string
}

func New(email, password, smtpHost, smtpPort string) *Client {
	return &Client{
		email:    email,
		password: password,
		smtpHost: smtpHost,
		smtpPort: smtpPort,
	}
}

func (c *Client) Send(receiverEmail, msg string) error {
	to := []string{receiverEmail}

	message := []byte(msg)

	auth := smtp.PlainAuth("", c.email, c.password, c.smtpHost)

	err := smtp.SendMail(c.smtpHost+":"+c.smtpPort, auth, c.email, to, message)
	if err != nil {
		return fmt.Errorf("can't send email: %w", err)
	}

	return nil
}
