-- pass: 12345678
INSERT INTO admins (email, password_hash) VALUES ('admin@mail.ru', '7c222fb2927d828af22f592134e8932480637c0d');

INSERT INTO websites (admin_id, alias, active) VALUES (1, 'new_site', TRUE);

INSERT INTO customers (website_alias, email, password_hash) VALUES
                      ('new_site', 'customer1@mail.ru', '7c222fb2927d828af22f592134e8932480637c0d'),
                      ('new_site', 'customer2@mail.ru', '7c222fb2927d828af22f592134e8932480637c0d'),
                      ('new_site', 'customer3@mail.ru', '7c222fb2927d828af22f592134e8932480637c0d');
INSERT INTO carts (id) VALUES (1), (2), (3);


INSERT INTO products (website_alias, name, description, price, image_ids, active, tags) VALUES
                     ('new_site', 'товар 1', 'описание товара 1', 100, ARRAY[]::BIGINT[], TRUE, ARRAY[]::TEXT[]),
                     ('new_site', 'товар 2', 'описание товара 2', 200, ARRAY[]::BIGINT[], TRUE, ARRAY[]::TEXT[]),
                     ('new_site', 'товар 3', 'описание товара 3', 300, ARRAY[]::BIGINT[], TRUE, ARRAY[]::TEXT[]),
                     ('new_site', 'товар 4', 'описание товара 4', 400, ARRAY[]::BIGINT[], TRUE, ARRAY[]::TEXT[]),
                     ('new_site', 'товар 5', 'описание товара 5', 500, ARRAY[]::BIGINT[], TRUE, ARRAY[]::TEXT[]);
INSERT INTO saved_products (website_alias, name, description, price, image_ids, active, tags) VALUES
                           ('new_site', 'товар 1', 'описание товара 1', 100, ARRAY[]::BIGINT[], TRUE, ARRAY[]::TEXT[]),
                           ('new_site', 'товар 2', 'описание товара 2', 200, ARRAY[]::BIGINT[], TRUE, ARRAY[]::TEXT[]),
                           ('new_site', 'товар 3', 'описание товара 3', 300, ARRAY[]::BIGINT[], TRUE, ARRAY[]::TEXT[]),
                           ('new_site', 'товар 4', 'описание товара 4', 400, ARRAY[]::BIGINT[], TRUE, ARRAY[]::TEXT[]),
                           ('new_site', 'товар 5', 'описание товара 5', 500, ARRAY[]::BIGINT[], TRUE, ARRAY[]::TEXT[]);

INSERT INTO orders (customer_id, total_sum, date_time, status, comment) VALUES
                   (1, 800, NOW(), 1, 'комментарий к 1 заказу'),
                   (1, 2300, NOW(), 1, 'комментарий ко 2 заказу'),
                   (2, 1000, NOW(), 1, 'комментарий к 3 заказу');

INSERT INTO order_items (order_id, saved_product_id, count) VALUES
                        -- Первый заказ
                        (1, 1, 3), (1, 2, 1), (1, 3, 1),
                        -- Второй заказ
                        (2, 4, 2), (2, 5, 3),
                        -- Третий заказ
                        (3, 1, 10);

