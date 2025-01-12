package api

import (
	"errors"
	"github.com/go-chi/render"
	"io"
	"log"
	"net/http"
)

type SendEmailRequest struct {
	ReceiverEmail string `json:"email"`
	Message       string `json:"message"`
}

// SendEmail godoc
// @Summary Send email
// @Tags notification
// @Accept json
// @Produce  json
// @Param input body SendEmailRequest true "notification info"
// @Success 200 {object} OkResponse
// @Router /send-email [post]
func (n *NotificationAPI) SendEmail(w http.ResponseWriter, r *http.Request) {
	var req SendEmailRequest

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

	err = n.srv.SendEmail(req.ReceiverEmail, req.Message)
	if err != nil {
		log.Printf("failed to send email: %s", err.Error())
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, ErrResponse{"failed to send email"})
		return
	}

	log.Printf("email sent: %s", req.ReceiverEmail)
	render.JSON(w, r, OkResponse{})
}
