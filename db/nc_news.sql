\c nc_news

-- Get all of the users
-- Get all of the articles where the topic is coding
-- Get all of the comments where the votes are less than zero
-- Get all of the topics
-- Get all of the articles by user grumpy19
-- Get all of the comments that have more than 10 votes.

-- SELECT * FROM users;

-- SELECT * FROM articles
-- WHERE topic = 'coding';

-- SELECT * FROM comments
-- WHERE votes < 0;

-- SELECT * FROM topics;

-- SELECT * FROM articles
-- WHERE author = 'grumpy19';

SELECT * FROM comments
WHERE votes > 10;