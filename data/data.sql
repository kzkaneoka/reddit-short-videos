-- brew services start postgresql
-- psql postgres
CREATE DATABASE reddit_short_videos;
-- \list
-- \connect reddit_short_videos

CREATE TYPE e_role AS ENUM('user', 'admin');
CREATE TYPE e_rate AS ENUM('like', 'okay', 'dislike', 'skip');
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
   title VARCHAR ( 255 ) NOT NULL,
   s_url VARCHAR ( 255 ) UNIQUE NOT NULL,
   created_at TIMESTAMP DEFAULT NOW(),
   last_modified TIMESTAMP DEFAULT NOW()
);

CREATE TABLE videos (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   title VARCHAR ( 255 ) NOT NULL,
   v_url VARCHAR ( 255 ) NOT NULL,
   r_url VARCHAR ( 255 ) NOT NULL,
   subreddit_id UUID NOT NULL,
   posted_at TIMESTAMP NOT NULL,
   created_at TIMESTAMP DEFAULT NOW(),
   last_modified TIMESTAMP DEFAULT NOW(),
   FOREIGN KEY ( subreddit_id ) REFERENCES subreddits ( id )
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

CREATE TABLE r_users_videos (
   user_id UUID NOT NULL,
   video_id UUID NOT NULL,
   rate e_rate NOT NULL,
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
   title,
   s_url
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
RETURNING *;

--                   id                  |           title           |                     s_url                     |         created_at         |       last_modified        
-- --------------------------------------+---------------------------+-----------------------------------------------+----------------------------+----------------------------
--  07a0711c-e9bc-472a-b0bb-9c04016a1408 | Damn, that's interesting! | https://www.reddit.com/r/Damnthatsinteresting | 2020-12-26 15:56:13.546286 | 2020-12-26 15:56:13.546286
--  c4eea120-ea61-4e7c-8f8a-ef73fbbd846a | Funny                     | https://www.reddit.com/r/funny                | 2020-12-26 15:56:13.546286 | 2020-12-26 15:56:13.546286
--  0cabf079-9929-4aa5-8001-f8b6c57508eb | Oddly Satisfying          | https://www.reddit.com/r/oddlysatisfying      | 2020-12-26 15:56:13.546286 | 2020-12-26 15:56:13.546286
--  4b8c11a5-5d9c-4477-a569-cb5258b1bc2e | ⬆ Next Fucking Level ⬆    | https://www.reddit.com/r/nextfuckinglevel     | 2020-12-26 15:56:13.546286 | 2020-12-26 15:56:13.546286

INSERT INTO videos (
   title,
   v_url,
   r_url,
   subreddit_id,
   posted_at
)
VALUES (
   ''
)


-- brew services stop postgresql
