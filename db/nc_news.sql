\c nc_news_test
SELECT * FROM topics LEFT JOIN articles ON topics.slug = articles.topic WHERE slug ILIKE 'cats'