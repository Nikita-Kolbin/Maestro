package repository

func (r *Repository) AddUser(username string, chatId int) error {
	query := `
	INSERT INTO telegrams (username, chat_id) VALUES ($1, $2)
	ON CONFLICT (username) DO NOTHING;`

	_, err := r.conn.Exec(query, username, chatId)
	if err != nil {
		return err
	}

	return nil
}

func (r *Repository) GetChatId(username string) (int, error) {
	query := `SELECT chat_id FROM telegrams WHERE username = $1`

	var chatId int
	err := r.conn.Get(&chatId, query, username)
	if err != nil {
		return 0, err
	}

	return chatId, nil
}
