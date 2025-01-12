package api

type Service interface {
	SendTelegram(username, msg string) error
	SendEmail(email, msg string) error
}

type NotificationAPI struct {
	srv Service
}

func New(srv Service) *NotificationAPI {
	return &NotificationAPI{srv}
}

type ErrResponse struct {
	Error string `json:"error"`
}

type OkResponse struct{}
