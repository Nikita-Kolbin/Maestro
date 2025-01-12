package service

func (s *Service) SendEmail(email, msg string) error {
	return s.emailCli.Send(email, msg)
}
