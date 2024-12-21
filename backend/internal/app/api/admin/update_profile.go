package admin

import (
	"errors"
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/logger"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/middleware"
	"github.com/go-chi/render"
	"io"
	"net/http"
)

// UpdateAdminProfile godoc
// @Summary Update admin profile
// @Security ApiKeyAuth
// @Tags admin
// @Accept   json
// @Produce  json
// @Param input body model.UpdateAdminProfileRequest true "admin new profile info"
// @Success      200   {object}   model.AdminDTO
// @Failure      400   {object}   model.ErrorResponse
// @Failure      403   {object}   model.ErrorResponse
// @Failure      500   {object}   model.ErrorResponse
// @Router /admin/update-profile [patch]
func (i *Admin) UpdateAdminProfile(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if !middleware.IsAdmin(ctx) {
		logger.Error(ctx, "[UpdateAdminProfile] user is not admin")
		render.Status(r, http.StatusForbidden)
		render.JSON(w, r, model.NewErrResp("permission denied"))
		return
	}

	adminId := middleware.GetUserId(ctx)

	var req model.UpdateAdminProfileRequest

	err := render.DecodeJSON(r.Body, &req)
	if errors.Is(err, io.EOF) {
		logger.Error(ctx, "[UpdateAdminProfile] request body is empty")
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, model.NewErrResp("empty request"))
		return
	}
	if err != nil {
		logger.Error(ctx, "[UpdateAdminProfile] failed to decode request body", "err", err)
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, model.NewErrResp("failed to decode request"))
		return
	}

	admin := model.FromUpdateProfileRequestToAdmin(&req)
	admin.Id = adminId

	admin, err = i.srv.UpdateAdminProfile(ctx, admin)
	if err != nil {
		logger.Error(ctx, "[UpdateAdminProfile] failed update profile", "customer_id", adminId, "err", err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, model.NewErrResp("failed update profile"))
		return
	}

	logger.Info(ctx, "[UpdateAdminProfile] admin profile updated", "customer_id", adminId)

	render.Status(r, http.StatusOK)
	render.JSON(w, r, model.FromAdminToDTO(admin))
}
