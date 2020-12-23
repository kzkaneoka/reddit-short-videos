-- brew services start postgresql
-- psql postgres
CREATE DATABASE reddit_videos;
-- \q
-- psql reddit_videos

CREATE TYPE e_role AS ENUM('user', 'admin');
CREATE TYPE e_rate AS ENUM('like', 'dislike', 'skip');

CREATE TABLE users (
   id UUID PRIMARY KEY,
   first_name VARCHAR ( 50 ) NOT NULL,
   last_name VARCHAR ( 50 ) NOT NULL,
   email VARCHAR ( 255 ) UNIQUE NOT NULL,
   password VARCHAR ( 50 ) NOT NULL,
   role e_role DEFAULT 'user',
   created_at TIMESTAMP NOT NULL,
   last_modified TIMESTAMP
);

CREATE TABLE subreddits (
   id UUID PRIMARY KEY,
   name VARCHAR ( 255 ) NOT NULL,
   url VARCHAR ( 255 ) UNIQUE NOT NULL,
   created_at TIMESTAMP NOT NULL,
   last_modified TIMESTAMP
);

CREATE TABLE videos (
   id UUID PRIMARY KEY,
   name VARCHAR ( 255 ) NOT NULL,
   url VARCHAR ( 255 ) NOT NULL,
   created_at TIMESTAMP NOT NULL,
   last_modified TIMESTAMP
);

CREATE TABLE r_users_subreddits (
   user_id UUID NOT NULL,
   subreddit_id UUID NOT NULL,
   created_at TIMESTAMP NOT NULL,
   last_modified TIMESTAMP,
   PRIMARY KEY ( user_id, subreddit_id ),
   FOREIGN KEY ( user_id ) REFERENCES users ( id ),
   FOREIGN KEY ( subreddit_id ) REFERENCES subreddits ( id )
);

CREATE TABLE r_subreddits_videos (
   subreddit_id UUID NOT NULL,
   video_id UUID NOT NULL,
   created_at TIMESTAMP NOT NULL,
   last_modified TIMESTAMP,
   PRIMARY KEY ( subreddit_id, video_id ),
   FOREIGN KEY ( subreddit_id ) REFERENCES subreddits ( id ),
   FOREIGN KEY ( video_id ) REFERENCES videos ( id )
);

CREATE TABLE r_subreddits_videos (
   subreddit_id UUID NOT NULL,
   video_id UUID NOT NULL,
   created_at TIMESTAMP NOT NULL,
   last_modified TIMESTAMP,
   PRIMARY KEY ( subreddit_id, video_id ),
   FOREIGN KEY ( subreddit_id ) REFERENCES subreddits ( id ),
   FOREIGN KEY ( video_id ) REFERENCES videos ( id )
);

CREATE TABLE r_users_videos (
   user_id UUID NOT NULL,
   video_id UUID NOT NULL,
   created_at TIMESTAMP NOT NULL,
   last_modified TIMESTAMP,
   PRIMARY KEY ( user_id, video_id ),
   FOREIGN KEY ( user_id ) REFERENCES users ( id ),
   FOREIGN KEY ( video_id ) REFERENCES videos ( id )
);
