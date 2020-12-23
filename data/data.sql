-- brew services start postgresql
-- psql postgres
CREATE DATABASE reddit_short_videos;
-- \list
-- \connect reddit_short_videos

CREATE TYPE e_role AS ENUM('user', 'admin');
CREATE TYPE e_rate AS ENUM('like', 'dislike', 'skip');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   first_name VARCHAR ( 50 ) NOT NULL,
   last_name VARCHAR ( 50 ) NOT NULL,
   email VARCHAR ( 255 ) UNIQUE NOT NULL,
   password VARCHAR ( 50 ) NOT NULL,
   role e_role DEFAULT 'user',
   created_at TIMESTAMP DEFAULT NOW(),
   last_modified TIMESTAMP DEFAULT NOW()
);

CREATE TABLE subreddits (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   name VARCHAR ( 255 ) NOT NULL,
   url VARCHAR ( 255 ) UNIQUE NOT NULL,
   created_at TIMESTAMP DEFAULT NOW(),
   last_modified TIMESTAMP DEFAULT NOW()
);

CREATE TABLE videos (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   name VARCHAR ( 255 ) NOT NULL,
   url VARCHAR ( 255 ) NOT NULL,
   created_at TIMESTAMP DEFAULT NOW(),
   last_modified TIMESTAMP DEFAULT NOW()
);

CREATE TABLE r_users_subreddits (
   user_id UUID NOT NULL,
   subreddit_id UUID NOT NULL,
   created_at TIMESTAMP DEFAULT NOW(),
   last_modified TIMESTAMP DEFAULT NOW(),
   PRIMARY KEY ( user_id, subreddit_id ),
   FOREIGN KEY ( user_id ) REFERENCES users ( id ),
   FOREIGN KEY ( subreddit_id ) REFERENCES subreddits ( id )
);

CREATE TABLE r_subreddits_videos (
   subreddit_id UUID NOT NULL,
   video_id UUID NOT NULL,
   created_at TIMESTAMP DEFAULT NOW(),
   last_modified TIMESTAMP DEFAULT NOW(),
   PRIMARY KEY ( subreddit_id, video_id ),
   FOREIGN KEY ( subreddit_id ) REFERENCES subreddits ( id ),
   FOREIGN KEY ( video_id ) REFERENCES videos ( id )
);

CREATE TABLE r_users_videos (
   user_id UUID NOT NULL,
   video_id UUID NOT NULL,
   created_at TIMESTAMP DEFAULT NOW(),
   last_modified TIMESTAMP DEFAULT NOW(),
   PRIMARY KEY ( user_id, video_id ),
   FOREIGN KEY ( user_id ) REFERENCES users ( id ),
   FOREIGN KEY ( video_id ) REFERENCES videos ( id )
);

-- \dt+

INSERT INTO users (
   first_name,
   last_name,
   email,
   password
)
VALUES
   (
      'John',
      'Doe',
      'john@gmail.com',
      '123456'
   ),
   (
      'Will',
      'Smith',
      'will@gmail.com',
      '123456'
   ),
   (
      'Alex',
      'Hirsch',
      'alex@gmail.com',
      '123456'
   )
RETURNING *;

INSERT INTO subreddits (
   name,
   url
)
VALUES
   (
      'Damn, that''s interesting!',
      'https://www.reddit.com/r/Damnthatsinteresting'
   ),
   (
      'Funny',
      'https://www.reddit.com/r/funny'
   ),
   (
      'Oddly Satisfying',
      'https://www.reddit.com/r/oddlysatisfying'
   ),
   (
      '⬆ Next Fucking Level ⬆',
      'https://www.reddit.com/r/nextfuckinglevel'
   )
RETURNING (id, name, url);

-- brew services stop postgresql
