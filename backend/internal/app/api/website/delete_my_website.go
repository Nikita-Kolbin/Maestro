package website

import (
	"errors"
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/logger"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/middleware"
	"github.com/go-chi/render"
	"net/http"
)

// DeleteMyWebsite godoc
// @Summary Delete my website
// @Security ApiKeyAuth
// @Tags website
// @Accept   json
// @Produce  json
// @Success      200   {object}   SuccessResp
// @Failure      403   {object}   model.ErrorResponse
// @Failure      404   {object}   model.ErrorResponse
// @Failure      500   {object}   model.ErrorResponse
// @Router /website/delete-my-website [delete]
func (i *Website) DeleteMyWebsite(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if !middleware.IsAdmin(ctx) {
		logger.Error(ctx, "[DeleteMyWebsite] user is not admin")
		render.Status(r, http.StatusForbidden)
		render.JSON(w, r, model.NewErrResp("permission denied"))
		return
	}

	adminId := middleware.GetUserId(ctx)

	err := i.srv.DeleteWebsiteByAdmin(ctx, adminId)
	if errors.Is(err, model.ErrNotFound) {
		logger.Error(ctx, "[DeleteMyWebsite] website not found", "id", adminId)
		render.Status(r, http.StatusNotFound)
		render.JSON(w, r, model.NewErrResp("website not found"))
		return
	}
	if err != nil {
		logger.Error(ctx, "[DeleteMyWebsite] failed to delete website", "err", err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, model.NewErrResp("failed to delete website"))
		return
	}

	logger.Info(ctx, "[DeleteMyWebsite] website deleted", "adminId", adminId)

	render.Status(r, http.StatusOK)
	render.JSON(w, r, SuccessResp{Success: true})
}

type SuccessResp struct {
	Success bool `json:"success"`
}
