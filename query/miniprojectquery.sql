CREATE TABLE users (
	user_id serial primary key,
	user_name varchar (255) NOT NULL,
	user_email varchar(255) UNIQUE NOT NULL,
	user_password varchar(255) NOT NULL,
	user_salt varchar(255),
	user_birthdate date,
	user_gender varchar(10),
	user_avatar varchar(255),
	user_avatar_path varchar(255),
	user_type varchar(10)
)

CREATE TABLE movies (
	movie_id serial primary key,
	movie_title varchar(255) NOT NULL,
	movie_episode integer,
	movie_director varchar(255),
	movie_studio varchar(255),
	movie_tv_status varchar(10),
	movie_duration varchar(15),
	movie_release boolean,
	movie_country varchar(255),
	movie_genre varchar(255),
	movie_rating numeric, 
	movie_network varchar(50),
	movie_trailer varchar(255),
	movie_views integer,
	movie_price numeric,
	movie_image varchar(255),
	movie_image_path varchar(255)
)

create table casts ( 
	cast_id serial primary key,
	cast_name varchar(255) not null,
	cast_year_date varchar(5),
	cast_image varchar(255),
	cast_image_size varchar(255),
	cast_image_type varchar(255)
)

drop table if exists comments
create table comments (
	comment_id serial primary key,
	comment_text varchar,
	comment_created_on date default current_date,
	comment_rating integer,
	comment_user_id integer,
	comment_movie_id integer
)

drop table if exists carts
create table carts (
	cart_id serial primary key,
	cart_created_on date default current_date,
	cart_status varchar(15),
	cart_user_id integer
)

insert into carts(cart_status, cart_user_id)
values(
	'open',
	1
)
select * from carts

insert into users(user_name, user_email, user_password, user_salt, user_birthdate, user_type, user_gender)
values(
	'rafi',
	'rafi@mail.com',
	'rafi123',
	'1232123',
	'12-12-2000',
	'admin',
	'male'
)
select * from users

drop table if exists line_items
create table line_items(
	line_item_id serial primary key,
	line_item_qty integer,
	line_item_status varchar(15),
	line_item_movie_id integer,
	line_item_cart_id integer,
	line_item_order_name varchar(25),
	unique(line_item_movie_id, line_item_cart_id)
)

insert into movies(movie_title)
values('test movie 3')
select * from movies

insert into carts(cart_status, cart_user_id)
values('close', 1)
select * from carts

insert into line_items(line_item_qty, line_item_status, line_item_movie_id, line_item_cart_id)
values(1, 'checkout', 2, 1)
select * from line_items

create sequence orders_order_name_seq
drop table if exists orders
create table orders (
	order_name varchar(25) primary key default concat('ORD', to_char(current_date, 'yyyymmdd'), '-', to_char(nextval('orders_order_name_seq'), '0000')),
	order_created_on timestamp default LOCALTIMESTAMP(0),
	order_subtotal numeric,
	order_discount numeric,
	order_tax numeric,
	order_total_due numeric,
	order_total_qty integer,
	order_pay_trx_num varchar(100),
	order_city varchar(255),
	order_address varchar(255),
	order_status varchar(15),
	order_user_id integer
)

drop table orders

insert into orders(order_subtotal, order_discount, order_tax, order_total_due, order_user_id)
values(
	12,
	0.1,
	0.01,
	150000,
	1
)
select * from orders

create sequence test_seq
drop sequence test_seq

create table test (
	test_id varchar(25) default concat('ORD', to_char(current_date, 'yyyymmdd'), '-', to_char(nextval('test_seq'), '0000')),
	test_value varchar(255)
)

drop table test

insert into test(test_value)
values('abcdefghijk')
select * from test


SELECT LOCALTIMESTAMP(0);

select * from users
order by user_id asc
select from users
where user_id = 5

select * from movies
order by movie_id asc

select * from orders
select to_char(nextval('orders_order_name_seq'),'0000')

select * from casts

delete from casts where cast_id = 13
returning true

update casts set 
cast_name = 'Lisa'
where cast_id = 13

delete from users where user_id < 25
returning *
select * from users

delete from movies where movie_id = 4
returning *
select * from movies

select currval('orders_order_name_seq')

select current_date

select * from carts
delete from carts where cart_id > 1
returning *
select * from line_items

select * from users
select * from movies
update users
set user_type = 'ADMIN'
where user_id = 1

update movies
set movie_image_path = '/app/server/assets/images/mock-images/The-hobbit-the-battle-of-the-five-armies.jpg'
where movie_id = 12
delete from movies
