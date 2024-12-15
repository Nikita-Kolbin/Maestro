package website

import (
	"github.com/Nikita-Kolbin/Maestro/internal/app/model"
	"github.com/Nikita-Kolbin/Maestro/internal/pkg/logger"
	"github.com/go-chi/render"
	"net/http"
)

// GetStyle godoc
// @Summary Get website styles by alias
// @Tags website
// @Accept   json
// @Produce  json
// @Param alias query string true "website alias"
// @Success      200   {object}   model.WebsiteStylesDTO
// @Failure      400   {object}   model.ErrorResponse
// @Failure      500   {object}   model.ErrorResponse
// @Router /website/get-style [get]
func (i *Website) GetStyle(w http.ResponseWriter, r *http.Request) {
	const aliasParamKey = "alias"

	ctx := r.Context()

	alias := r.URL.Query().Get(aliasParamKey)
	if alias == "" {
		logger.Error(ctx, "[GetWebsiteStyle] empty alias")
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, model.NewErrResp("empty alias query param"))
		return
	}

	sections, err := i.srv.GetWebsiteStyle(ctx, alias)
	if err != nil {
		logger.Error(ctx, "[GetWebsiteStyle] failed to set styles", "err", err)
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, model.NewErrResp("failed to set styles"))
		return
	}

	logger.Info(ctx, "[GetWebsiteStyle] style is given", "alias", alias)

	render.Status(r, http.StatusOK)
	render.JSON(w, r, model.FromSectionsToDTO(sections))
}
