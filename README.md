# Twitter Spider
It's BrazilJS s Hackathon!!!

## Create Databases
### tweets
```
create table tweets
(
    id                bigserial not null,
    created_at        text      not null,
    tweet_text        text,
    image_status      boolean,
    image_base64      text,
    user_name         text,
    user_screen_name  text,
    profile_image_url text,
    read              boolean,
    url               text
);

alter table tweets
    owner to your_db_user;
```

### config
```
create table config
(
    hashtags text
);
```
