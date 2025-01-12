package telegram

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"path"
	"strconv"
)

const (
	tgBotHost         = "api.telegram.org"
	sendMessageMethod = "sendMessage"
	getUpdatesMethod  = "getUpdates"
	limit             = 100
)

type Client struct {
	offset     int
	host       string
	basePath   string
	httpClient http.Client
}

func New(token string) *Client {
	return &Client{
		host:       tgBotHost,
		basePath:   newBasePath(token),
		httpClient: http.Client{},
	}
}

func (c *Client) Send(chatId int, msg string) error {
	q := url.Values{}
	q.Add("chat_id", strconv.Itoa(chatId))
	q.Add("text", msg)

	if _, err := c.doRequest(sendMessageMethod, q); err != nil {
		return fmt.Errorf("can't send message: %w", err)
	}

	return nil
}

func (c *Client) GetUsernameToChatIds() (map[string]int, error) {
	q := url.Values{}
	q.Add("offset", strconv.Itoa(c.offset))
	q.Add("limit", strconv.Itoa(limit))

	data, err := c.doRequest(getUpdatesMethod, q)
	if err != nil {
		return nil, fmt.Errorf("can't get updates: %w", err)
	}

	var resp UpdatesResponse

	if json.Unmarshal(data, &resp) != nil {
		return nil, fmt.Errorf("can't get updates: %w", err)
	}

	updates := resp.Result
	res := make(map[string]int)
	for _, update := range updates {
		if update.Message == nil {
			continue
		}
		res[update.Message.From.Username] = update.Message.Chat.ID
	}

	if len(updates) > 0 {
		c.offset = updates[len(updates)-1].ID + 1
	}

	return res, nil
}

func newBasePath(token string) string {
	return "bot" + token
}

func (c *Client) doRequest(method string, query url.Values) ([]byte, error) {
	u := url.URL{
		Scheme:   "https",
		Host:     c.host,
		Path:     path.Join(c.basePath, method),
		RawQuery: query.Encode(),
	}

	resp, err := c.httpClient.Get(u.String())
	if err != nil {
		return nil, fmt.Errorf("can't do request: %w", err)
	}
	defer func() { _ = resp.Body.Close() }()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("can't do request: %w", err)
	}

	strResp := string(body)
	_ = strResp

	return body, nil
}
