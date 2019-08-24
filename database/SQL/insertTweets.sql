DO
$do$
BEGIN
IF $1 not in (SELECT id FROM tweets) THEN
  insert into tweets (id,
  created_at,
  tweet_text,
  image_status,
  image_base64,
  user_name,
  user_screen_name,
  profile_image_url, read, url) values ($1, $2, $3, $4, $5, $6, $7, $8, false, $9);
END IF;
END
$do$
