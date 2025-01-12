package notification

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

type Client struct {
	hostPort   string
	httpClient *http.Client
}

type EmailMessage struct {
	Email   string `json:"email"`
	Message string `json:"message"`
}

type TelegramMessage struct {
	Username string `json:"username"`
	Message  string `json:"message"`
}

func New(address string) *Client {
	return &Client{
		hostPort:   address,
		httpClient: &http.Client{},
	}
}

func (c *Client) SendEmail(email, msg string) error {
	url := "http://" + c.hostPort + "/api/send-email"
	message := EmailMessage{
		Email:   email,
		Message: msg,
	}

	body, err := json.Marshal(message)
	if err != nil {
		return fmt.Errorf("could not marshal email message: %w", err)
	}

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(body))
	if err != nil {
		return fmt.Errorf("could not create request: %w", err)
	}

	_, err = c.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("could not send email: %w", err)
	}

	return nil
}

func (c *Client) SendTelegram(username, msg string) error {
	url := "http://" + c.hostPort + "/api/send-telegram"
	message := TelegramMessage{
		Username: username,
		Message:  msg,
	}

	body, err := json.Marshal(message)
	if err != nil {
		return fmt.Errorf("could not marshal telegram message: %w", err)
	}

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(body))
	if err != nil {
		return fmt.Errorf("could not create request: %w", err)
	}

	_, err = c.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("could not send telegram: %w", err)
	}

	return nil
}
