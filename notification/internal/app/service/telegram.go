package service

import (
	"errors"
	"log"
	"time"
)

func (s *Service) SendTelegram(username, msg string) error {
	if len(username) == 0 {
		return errors.New("empty username")
	}

	if username[0] == '@' {
		username = username[1:]
	}

	chatId, err := s.repo.GetChatId(username)
	if err != nil {
		return err
	}

	return s.tgCli.Send(chatId, msg)
}

func (s *Service) processTelegramUsers() {
	uToC, err := s.tgCli.GetUsernameToChatIds()
	if err != nil {
		log.Printf("can't fetch tg messages: %s", err)
	}

	for username, chatId := range uToC {
		err = s.repo.AddUser(username, chatId)
		if err != nil {
			log.Printf("can't add tg users to repo: %s", err)
			continue
		}
		log.Printf("user: %s, chatId: %d added", username, chatId)
	}
}

func (s *Service) runTelegramProcessor() {
	go func() {
		for {
			s.processTelegramUsers()
			time.Sleep(time.Second)
		}
	}()
}
