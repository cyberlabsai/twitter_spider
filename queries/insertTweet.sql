
DO
$do$
BEGIN
IF ${id} not in (SELECT id FROM tweets) THEN
  insert into tweets (
    id,
    created_at,
    tweet_text
  ) values (${id}, ${createdAt}, ${tweetText});
END IF;
END
$do$
