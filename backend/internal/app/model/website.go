package model

type CreateWebsiteRequest struct {
	Alias string `json:"alias"`
}

type Website struct {
	Id         int    `db:"id"`
	AdminId    int    `db:"admin_id"`
	Alias      string `db:"alias"`
	Active     bool   `db:"active"`
	SectionIds []int  `db:"section_ids"`
}

type WebsiteDTO struct {
	Id     int    `json:"id"`
	Alias  string `json:"alias"`
	Active bool   `json:"active"`
}

type Section struct {
	Id           int    `db:"id" json:"id"`
	StyleId      int    `db:"style_id" json:"style_id"`
	WebsiteAlias string `db:"website_alias" json:"website_alias"`
	Text         string `db:"text" json:"text"`
	ImageId      string `db:"image_id" json:"image_id"`
}

type WebsiteStylesDTO struct {
	Sections []*SectionDTO `json:"sections"`
}

type SectionDTO struct {
	Id           int    `json:"id"`
	StyleId      int    `json:"style_id"`
	WebsiteAlias string `json:"website_alias"`
	Text         string `json:"text"`
	ImageId      string `json:"image_id"`
}

type SetWebsiteStyleRequest struct {
	WebsiteAlias string               `json:"website_alias"`
	Sections     []*SetSectionRequest `json:"sections"`
}

type SetSectionRequest struct {
	StyleId int    `json:"style_id"`
	Text    string `json:"text"`
	ImageId string `json:"image_id"`
}

func FromWebsiteToDTO(website *Website) *WebsiteDTO {
	return &WebsiteDTO{
		Id:     website.Id,
		Alias:  website.Alias,
		Active: website.Active,
	}
}

func FromSetWebsiteStyleRequestToSections(req *SetWebsiteStyleRequest) []*Section {
	sections := make([]*Section, 0, len(req.Sections))

	for _, s := range req.Sections {
		section := &Section{
			StyleId:      s.StyleId,
			WebsiteAlias: req.WebsiteAlias,
			Text:         s.Text,
			ImageId:      s.ImageId,
		}
		sections = append(sections, section)
	}

	return sections
}

func FromSectionsToDTO(sections []*Section) *WebsiteStylesDTO {
	sectionsDTO := make([]*SectionDTO, 0, len(sections))

	for _, s := range sections {
		sectionDTO := &SectionDTO{
			Id:           s.Id,
			StyleId:      s.StyleId,
			WebsiteAlias: s.WebsiteAlias,
			Text:         s.Text,
			ImageId:      s.ImageId,
		}
		sectionsDTO = append(sectionsDTO, sectionDTO)
	}

	return &WebsiteStylesDTO{Sections: sectionsDTO}
}
