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
   id,
   first_name,
   last_name,
   email,
   password
)
VALUES
   (
      'e69369a1-7f0a-48b3-b2c9-bb5654006d48',
      'John',
      'Doe',
      'john@gmail.com',
      '123456'
   ),
   (
      '1b0c0146-af40-4769-8ba8-ac11a7d37b54'
      'Will',
      'Smith',
      'will@gmail.com',
      '123456'
   ),
   (
      '685dda8d-9509-4dad-9fee-6f6f3e6df925'
      'Alex',
      'Hirsch',
      'alex@gmail.com',
      '123456'
   )
RETURNING *;

INSERT INTO subreddits (
   id,
   title,
   s_url
)
VALUES
   (
      '07a0711c-e9bc-472a-b0bb-9c04016a1408',
      'Damn, that''s interesting!',
      'https://www.reddit.com/r/Damnthatsinteresting'
   ),
   (
      'c4eea120-ea61-4e7c-8f8a-ef73fbbd846a',
      'Funny',
      'https://www.reddit.com/r/funny'
   ),
   (
      '0cabf079-9929-4aa5-8001-f8b6c57508eb',
      'Oddly Satisfying',
      'https://www.reddit.com/r/oddlysatisfying'
   ),
   (
      '4b8c11a5-5d9c-4477-a569-cb5258b1bc2e',
      '⬆ Next Fucking Level ⬆',
      'https://www.reddit.com/r/nextfuckinglevel'
   )
RETURNING *;

INSERT INTO videos (
   id,
   title,
   v_url,
   r_url,
   subreddit_id
)
VALUES
   (
      '6ec81767-7f9d-43c8-abc6-a436a1a33209',
      'Somebody made a VR world of an 18th-century Swiss village, and it''s amazing',
      'https://videos/reddit-short-videos.com/unsightlywelloffbrant.mp4',
      'https://www.reddit.com/r/Damnthatsinteresting/comments/kjzv1k/somebody_made_a_vr_world_of_an_18thcentury_swiss/',
      '07a0711c-e9bc-472a-b0bb-9c04016a1408'
   ),
   (
      '85917a5c-c36d-4b05-885d-3a3a886236db',
      'Launch from a missile silo',
      'https://videos/reddit-short-videos.com/pf5t2nceke761.mp4',
      'https://www.reddit.com/r/Damnthatsinteresting/comments/kk6j3r/launch_from_a_missile_silo/',
      '07a0711c-e9bc-472a-b0bb-9c04016a1408'
   ),
   (
      'df47f909-1538-43d7-a04e-f37aacadc3b5',
      'the story of "The Flippist"',
      'https://videos/reddit-short-videos.com/pofyu50yjh761.mp4',
      'https://www.reddit.com/r/Damnthatsinteresting/comments/kkewno/the_story_of_the_flippist/',
      '07a0711c-e9bc-472a-b0bb-9c04016a1408'
   ),
   (
      '11d93662-a65f-4965-bca6-184f657aa2a8',
      'Mysterious foam floats on Dudergofka river in Russia prompts investigation',
      'https://videos/reddit-short-videos.com/cnbkasvkjc761.mp4',
      'https://www.reddit.com/r/Damnthatsinteresting/comments/kk05vz/mysterious_foam_floats_on_dudergofka_river_in/',
      '07a0711c-e9bc-472a-b0bb-9c04016a1408'
   ),
   (
      '85566fc1-2f8b-4aad-bfc8-63d3b79711f1',
      'One of the longest rally of 2019 FIVB world cup',
      'https://videos/reddit-short-videos.com/0dgn2glr5b761.mp4',
      'https://www.reddit.com/r/Damnthatsinteresting/comments/kjwu16/one_of_the_longest_rally_of_2019_fivb_world_cup/',
      '07a0711c-e9bc-472a-b0bb-9c04016a1408'
   ),
   (
      '49611879-0c68-46b7-948d-b5e4f47af1b5',
      'If they say there were also good things in 2020',
      'https://videos/reddit-short-videos.com/ermcyffycf761.mp4',
      'https://www.reddit.com/r/funny/comments/kk8xtv/if_they_say_there_were_also_good_things_in_2020/',
      'c4eea120-ea61-4e7c-8f8a-ef73fbbd846a'
   ),
   (
      '0d9b6c2c-8c94-4907-931f-91dc7ada1c86',
      'Says it all really',
      'https://videos/reddit-short-videos.com/819mey68ae761.mp4',
      'https://www.reddit.com/r/funny/comments/kk5nie/says_it_all_really/',
      'c4eea120-ea61-4e7c-8f8a-ef73fbbd846a'
   ),
   (
      '8609c73b-5874-446b-9cb3-746586349526',
      '9 month old prodigy',
      'https://videos/reddit-short-videos.com/wivwdzkjeg761.mp4',
      'https://www.reddit.com/r/funny/comments/kkbzgk/9_month_old_prodigy/',
      'c4eea120-ea61-4e7c-8f8a-ef73fbbd846a'
   ),
   (
      'e1e9b99b-9e0d-4bf5-bb64-50b8a9a9fdef',
      'Cat and owner vibe out to Hotline Bling',
      'https://videos/reddit-short-videos.com/7g6gyfdhad761.mp4',
      'https://www.reddit.com/r/funny/comments/kk2iak/cat_and_owner_vibe_out_to_hotline_bling/',
      'c4eea120-ea61-4e7c-8f8a-ef73fbbd846a'
   ),
   (
      '5afef243-6041-4e20-b8a6-fc4dce3adc81',
      'A happy guard',
      'https://videos/reddit-short-videos.com/pm3ow4euub761.mp4',
      'https://www.reddit.com/r/funny/comments/kjybyd/a_happy_guard/',
      'c4eea120-ea61-4e7c-8f8a-ef73fbbd846a'
   ),
   (
      '5bd00e00-0f2b-45d8-be03-7f19fc638808',
      'Bird taking off on a moving car',
      'https://videos/reddit-short-videos.com/4zlegiqjjf761.mp4',
      'https://www.reddit.com/r/oddlysatisfying/comments/kk9hdj/bird_taking_off_on_a_moving_car/',
      '0cabf079-9929-4aa5-8001-f8b6c57508eb'
   ),
   (
      '6a008620-7620-4c67-a7cd-2adb0ecf412a',
      'Feeding magnets to magnetic silly putty',
      'https://videos/reddit-short-videos.com/7ym0gq2k8e761.mp4',
      'https://www.reddit.com/r/oddlysatisfying/comments/kk5ifu/feeding_magnets_to_magnetic_silly_putty/',
      '0cabf079-9929-4aa5-8001-f8b6c57508eb'
   ),
   (
      'b43971d6-5f5d-4adb-af0e-1941ab4f4025',
      'Not a drop spilled',
      'https://videos/reddit-short-videos.com/l9x0b1x7lf761.mp4',
      'https://www.reddit.com/r/oddlysatisfying/comments/kk9mh9/not_a_drop_spilled/',
      '0cabf079-9929-4aa5-8001-f8b6c57508eb'
   ),
   (
      '3e18c7ec-9c1c-4528-a356-4cfb90b554c1',
      'Jeep see saw with balls of steel precariously satisfied',
      'https://videos/reddit-short-videos.com/pgaemezhke761.mp4',
      'https://www.reddit.com/r/oddlysatisfying/comments/kk8z7s/jeep_see_saw_with_balls_of_steel_precariously/',
      '0cabf079-9929-4aa5-8001-f8b6c57508eb'
   ),
   (
      '996c0f96-78ea-4be9-849b-e7c1a2e3c717',
      'So smooth and elegant!',
      'https://videos/reddit-short-videos.com/8kf26q11yg761.mp4',
      'https://www.reddit.com/r/oddlysatisfying/comments/kke7rn/so_smooth_and_elegant/',
      '0cabf079-9929-4aa5-8001-f8b6c57508eb'
   ),
   (
      'dc556cb5-d2fa-4074-ac25-8128be33cc62',
      'Super smooth moves',
      'https://videos/reddit-short-videos.com/59dbtr42af761.mp4',
      'https://www.reddit.com/r/nextfuckinglevel/comments/kk8orc/super_smooth_moves/',
      '4b8c11a5-5d9c-4477-a569-cb5258b1bc2e'
   ),
   (
      '03ba41bd-73dc-4ce4-9d57-2160c2c6fff8',
      'Incredible athleticism shown by this player',
      'https://videos/reddit-short-videos.com/4e8iixrz0h761.mp4',
      'https://www.reddit.com/r/nextfuckinglevel/comments/kkdnup/cutting_a_foamy_roll_of_thin_thread/',
      '4b8c11a5-5d9c-4477-a569-cb5258b1bc2e'
   ),
   (
      '604e361d-7c14-4afe-9198-14aa07567bd4',
      'Godlike bowling.',
      'https://videos/reddit-short-videos.com/oxz4jua8rd761.mp4',
      'https://www.reddit.com/r/nextfuckinglevel/comments/kk40cn/godlike_bowling/',
      '4b8c11a5-5d9c-4477-a569-cb5258b1bc2e'
   ),
   (
      '9040231e-0184-459b-841e-5b65aea3f81d',
      'Talented guy from Russia plays ‘Imperial March’ on a coffee stirrer',
      'https://videos/reddit-short-videos.com/cmfb689scg761.mp4',
      'https://www.reddit.com/r/nextfuckinglevel/comments/kkbudl/talented_guy_from_russia_plays_imperial_march_on/',
      '4b8c11a5-5d9c-4477-a569-cb5258b1bc2e'
   ),
   (
      '36ca4bb6-48ff-4ddf-87f8-9d0c6c40f950',
      'Greatest pizza delivery guy in history',
      'https://videos/reddit-short-videos.com/yqyo8i7uqg761.mp4',
      'https://www.reddit.com/r/nextfuckinglevel/comments/kkcx4n/greatest_pizza_delivery_guy_in_history/',
      '4b8c11a5-5d9c-4477-a569-cb5258b1bc2e'
   )
RETURNING *;

-- brew services stop postgresql
