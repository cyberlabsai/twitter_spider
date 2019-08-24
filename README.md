# Twitter Spider
It's BrazilJS s Hackathon!!!

## Create Databases
```
create table tweets
(
    id                bigserial not null,
    created_at        text      not null,
    tweet_text        text,
    image             boolean,
    image_url         text,
    user_name         text,
    user_screen_name  text,
    profile_image_url text,
    flag              boolean,
    url               text
);
alter table tweets
    owner to your_db_user;
```
