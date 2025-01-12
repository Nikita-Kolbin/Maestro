package api

import (
	"errors"
	"github.com/go-chi/render"
	"io"
	"log"
	"net/http"
)

type SendTelegramRequest struct {
	Username string `json:"username"`
	Message  string `json:"message"`
}

// SendTelegram godoc
// @Summary Send email
// @Tags notification
// @Accept json
// @Produce  json
// @Param input body SendTelegramRequest true "notification info"
// @Success 200 {object} OkResponse
// @Router /send-telegram [post]
func (n *NotificationAPI) SendTelegram(w http.ResponseWriter, r *http.Request) {
	var req SendTelegramRequest

	err := render.DecodeJSON(r.Body, &req)
	if errors.Is(err, io.EOF) {
		log.Println("request body is empty")
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, ErrResponse{"empty request"})
		return
	}
	if err != nil {
		log.Printf("failed to decode request body: %s", err.Error())
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, ErrResponse{"failed to decode request"})
		return
	}

	err = n.srv.SendTelegram(req.Username, req.Message)
	if err != nil {
		log.Printf("failed to send telegram: %s", err.Error())
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, ErrResponse{"failed to send telegram"})
		return
	}

	log.Printf("telegram sent: %s", req.Username)
	render.JSON(w, r, OkResponse{})
}
