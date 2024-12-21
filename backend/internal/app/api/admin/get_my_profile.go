package admin

import (
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/logger"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/middleware"
	"github.com/go-chi/render"
	"net/http"
)

// GetAdminProfile godoc
// @Summary Get my profile for admin
// @Security ApiKeyAuth
// @Tags admin
// @Accept   json
// @Produce  json
// @Success      200   {object}   model.AdminDTO
// @Failure      400   {object}   model.ErrorResponse
// @Failure      403   {object}   model.ErrorResponse
// @Failure      500   {object}   model.ErrorResponse
// @Router /admin/get-my-profile [get]
func (i *Admin) GetAdminProfile(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if !middleware.IsAdmin(ctx) {
		logger.Error(ctx, "[GetAdminProfile] user is not admin")
		render.Status(r, http.StatusForbidden)
		render.JSON(w, r, model.NewErrResp("permission denied"))
		return
	}

	adminId := middleware.GetUserId(ctx)

	admin, err := i.srv.GetAdminById(ctx, adminId)
	if err != nil {
		logger.Error(ctx, "[GetAdminProfile] failed get profile", "admin_id", adminId, "err", err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, model.NewErrResp("failed get profile"))
		return
	}

	logger.Info(ctx, "[GetAdminProfile] admin profile given", "admin_id", adminId)

	render.Status(r, http.StatusOK)
	render.JSON(w, r, model.FromAdminToDTO(admin))
}
