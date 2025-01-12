package service

type repository interface {
	AddUser(username string, chatId int) error
	GetChatId(username string) (int, error)
}

type telegramClient interface {
	Send(chatId int, msg string) error
	GetUsernameToChatIds() (map[string]int, error)
}

type emailClient interface {
	Send(receiverEmail, msg string) error
}

type Service struct {
	repo     repository
	tgCli    telegramClient
	emailCli emailClient
}

func New(repo repository, tgCli telegramClient, emailCli emailClient) *Service {
	s := &Service{
		repo:     repo,
		tgCli:    tgCli,
		emailCli: emailCli,
	}

	s.runTelegramProcessor()

	return s
}
