--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-06-06 18:24:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 228 (class 1255 OID 32784)
-- Name: calculate_payment(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calculate_payment() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    reservation RECORD;
    total_days INTEGER;
    total_price DOUBLE PRECISION;
BEGIN
    -- Fetch the new reservation
    SELECT * INTO reservation FROM reservations WHERE id = NEW.id;

    -- Calculate the total number of days for the reservation
    total_days := reservation.end_date - reservation.start_date + 1;

    -- Calculate the total price based on the offer price and the total number of days
    total_price := total_days * (SELECT price FROM offers WHERE id = reservation.offer_id);

    -- Insert the new payment record
    INSERT INTO payments (reservation_id, price, reservation_date, status)
    VALUES (NEW.id, total_price, NOW(), 'not paid');

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.calculate_payment() OWNER TO postgres;

--
-- TOC entry 229 (class 1255 OID 32786)
-- Name: delete_payment(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_payment() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM payments WHERE reservation_id = OLD.id;
    
    RETURN OLD;
END;
$$;


ALTER FUNCTION public.delete_payment() OWNER TO postgres;

--
-- TOC entry 227 (class 1255 OID 32768)
-- Name: delete_related_reservations(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_related_reservations() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM public.reservations WHERE offer_id = OLD.id;
    RETURN OLD;
END;
$$;


ALTER FUNCTION public.delete_related_reservations() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 24645)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    content character varying(1000) NOT NULL,
    phone character varying(15) NOT NULL,
    sent_date timestamp(6) without time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24644)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO postgres;

--
-- TOC entry 4852 (class 0 OID 0)
-- Dependencies: 223
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 216 (class 1259 OID 16414)
-- Name: offers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offers (
    id integer NOT NULL,
    engine character varying(5) NOT NULL,
    image character varying(255),
    model character varying(100) NOT NULL,
    power integer NOT NULL,
    price integer NOT NULL,
    seats integer NOT NULL,
    type character varying(50) NOT NULL
);


ALTER TABLE public.offers OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16413)
-- Name: offers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.offers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offers_id_seq OWNER TO postgres;

--
-- TOC entry 4853 (class 0 OID 0)
-- Dependencies: 215
-- Name: offers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.offers_id_seq OWNED BY public.offers.id;


--
-- TOC entry 226 (class 1259 OID 32771)
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    price double precision NOT NULL,
    reservation_date timestamp(6) without time zone NOT NULL,
    status character varying(50) NOT NULL,
    reservation_id integer NOT NULL
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 32770)
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_id_seq OWNER TO postgres;

--
-- TOC entry 4854 (class 0 OID 0)
-- Dependencies: 225
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- TOC entry 220 (class 1259 OID 24586)
-- Name: reservations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservations (
    id integer NOT NULL,
    end_date date NOT NULL,
    start_date date NOT NULL,
    offer_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.reservations OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24585)
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservations_id_seq OWNER TO postgres;

--
-- TOC entry 4855 (class 0 OID 0)
-- Dependencies: 219
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- TOC entry 222 (class 1259 OID 24629)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    content character varying(1000) NOT NULL,
    rating integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24628)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- TOC entry 4856 (class 0 OID 0)
-- Dependencies: 221
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 218 (class 1259 OID 16421)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    mail character varying(100),
    name character varying(40) NOT NULL,
    password character varying(100) NOT NULL,
    surname character varying(40) NOT NULL,
    type character varying(10) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16420)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4857 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4666 (class 2604 OID 24648)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 4662 (class 2604 OID 16417)
-- Name: offers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers ALTER COLUMN id SET DEFAULT nextval('public.offers_id_seq'::regclass);


--
-- TOC entry 4667 (class 2604 OID 32774)
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- TOC entry 4664 (class 2604 OID 24589)
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- TOC entry 4665 (class 2604 OID 24632)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 4663 (class 2604 OID 16424)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4844 (class 0 OID 24645)
-- Dependencies: 224
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, content, phone, sent_date, user_id) FROM stdin;
1	Ktos	1234567	2024-06-04 14:34:56	1
2	qwqwwq	3123123	2024-06-05 20:32:03.799	1
3	adadad	1312	2024-06-05 20:41:00.817	4
7	12121	121212	2024-06-06 16:45:37.51	4
9	Wiadomosc	121344141	2024-06-06 16:54:59.39	4
\.


--
-- TOC entry 4836 (class 0 OID 16414)
-- Dependencies: 216
-- Data for Name: offers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offers (id, engine, image, model, power, price, seats, type) FROM stdin;
1	1.5	yaris.png	Toyota Yaris	125	200	5	Hatchback
2	1.2	astra.png	Opel Astra	110	190	5	Hatchback
3	2.3	ducato.png	Fiat Ducato	148	300	3	VAN
14	5.0	mustang.png	Ford Mustang	400	500	4	Coupe
15	2.0	zafira.png	Opel Zafira	136	250	7	Minivan
16	2.0	c200.png	Mercedes C200	200	300	5	Sedan
17	3.2	highlander.png	Toyota Highlander	230	300	5	SUV
18	2.0	octavia.png	Skoda Octavia	150	250	5	Kombi
\.


--
-- TOC entry 4846 (class 0 OID 32771)
-- Dependencies: 226
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, price, reservation_date, status, reservation_id) FROM stdin;
1	570	2024-06-06 15:29:01.916739	not paid	26
3	380	2024-06-06 15:31:12.17937	not paid	28
6	400	2024-06-06 15:44:40.441081	not paid	31
11	380	2024-06-06 15:55:16.25612	not paid	36
12	190	2024-06-06 15:55:30.634603	not paid	37
14	2500	2024-06-06 16:02:11.30291	not paid	39
15	2700	2024-06-06 16:57:17.541585	not paid	40
16	380	2024-06-06 18:11:18.757162	not paid	41
\.


--
-- TOC entry 4840 (class 0 OID 24586)
-- Dependencies: 220
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservations (id, end_date, start_date, offer_id, user_id) FROM stdin;
11	2024-06-20	2024-06-11	3	4
21	2024-06-30	2024-06-29	3	4
25	2024-07-18	2024-07-10	2	1
26	2024-06-20	2024-06-18	2	4
28	2024-06-16	2024-06-15	2	4
31	2024-06-20	2024-06-19	1	4
36	2024-06-25	2024-06-24	2	4
37	2024-06-30	2024-06-30	2	4
39	2024-06-28	2024-06-19	18	1
40	2024-06-27	2024-06-19	17	4
41	2024-06-12	2024-06-11	2	4
\.


--
-- TOC entry 4842 (class 0 OID 24629)
-- Dependencies: 222
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, content, rating, user_id) FROM stdin;
\.


--
-- TOC entry 4838 (class 0 OID 16421)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, mail, name, password, surname, type) FROM stdin;
1	admin@admin.com	Admin	$2a$10$CblZi.rvssvSbZ5XuuM1qeeSXdsgcGRcgFPFW1qBLmdss1E6sEa/G	Admin	admin
3	mike123@example.com	Mike	$2a$10$42Ox2c/32MEo89gbh19z0uOJgSSZcDnbG3evRQppfnT3oVSROTbUu	Tyson	user
2	user@mail.com	John	$2a$10$owLEd6s7G/xpmtp1Gmtgxe1UNTI6ocI9cBZlPyZmlbu0CIoOCv46m	Doe	user
4	max@mail.com	Maksymilian	$2a$10$uazn2Y2vjHYiqZ5J5VGYZeJEbW1AiPuCRjOien597d5T99yM1XuZe	Toczek	user
5		Maksymilian	$2a$10$BuuBMMOx8GRT3SPn3ULsEOm3IurClx/lNluIkpCrcux7lr6wMR2Ae	Toczek	user
6	ktos@mail.com	Ktos	$2a$10$NuJuNIbl/oSlMT.Xd39.K.DpKakv5RXXaG1rA0zAlYaUNlGOD7kk.	Ktos	user
7	jd@mail.com	John	$2a$10$..eg6rhOKL2rlbk582DPKOvwHR6Bjqb0iQfzERhA3AlMhLmpFDbgS	Doe	user
\.


--
-- TOC entry 4858 (class 0 OID 0)
-- Dependencies: 223
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 9, true);


--
-- TOC entry 4859 (class 0 OID 0)
-- Dependencies: 215
-- Name: offers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offers_id_seq', 18, true);


--
-- TOC entry 4860 (class 0 OID 0)
-- Dependencies: 225
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 16, true);


--
-- TOC entry 4861 (class 0 OID 0)
-- Dependencies: 219
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_id_seq', 41, true);


--
-- TOC entry 4862 (class 0 OID 0)
-- Dependencies: 221
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- TOC entry 4863 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- TOC entry 4679 (class 2606 OID 24652)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 4669 (class 2606 OID 16419)
-- Name: offers offers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (id);


--
-- TOC entry 4681 (class 2606 OID 32776)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- TOC entry 4673 (class 2606 OID 24591)
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- TOC entry 4675 (class 2606 OID 24636)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 4677 (class 2606 OID 24638)
-- Name: reviews uk_1rd6lic349nmvj7qio2pmghj4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT uk_1rd6lic349nmvj7qio2pmghj4 UNIQUE (user_id);


--
-- TOC entry 4683 (class 2606 OID 32778)
-- Name: payments uk_e7qdxh4fch1yfisduker8j6w2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT uk_e7qdxh4fch1yfisduker8j6w2 UNIQUE (reservation_id);


--
-- TOC entry 4671 (class 2606 OID 16426)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4690 (class 2620 OID 32785)
-- Name: reservations after_reservation_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER after_reservation_insert AFTER INSERT ON public.reservations FOR EACH ROW EXECUTE FUNCTION public.calculate_payment();


--
-- TOC entry 4689 (class 2620 OID 32769)
-- Name: offers before_delete_offer; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER before_delete_offer BEFORE DELETE ON public.offers FOR EACH ROW EXECUTE FUNCTION public.delete_related_reservations();


--
-- TOC entry 4691 (class 2620 OID 32789)
-- Name: reservations before_reservation_delete; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER before_reservation_delete BEFORE DELETE ON public.reservations FOR EACH ROW EXECUTE FUNCTION public.delete_payment();


--
-- TOC entry 4684 (class 2606 OID 24613)
-- Name: reservations FKbqc054ubmoqj00bl3mey759qx; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT "FKbqc054ubmoqj00bl3mey759qx" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4685 (class 2606 OID 24608)
-- Name: reservations FKdhxofinnuhprx19ia27ndypsw; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT "FKdhxofinnuhprx19ia27ndypsw" FOREIGN KEY (offer_id) REFERENCES public.offers(id);


--
-- TOC entry 4687 (class 2606 OID 24653)
-- Name: messages FKl6j7jv1mp1pj8luhf4130t17l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "FKl6j7jv1mp1pj8luhf4130t17l" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4688 (class 2606 OID 32779)
-- Name: payments FKlx0wkk2bcx96x914fwbusayvq; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "FKlx0wkk2bcx96x914fwbusayvq" FOREIGN KEY (reservation_id) REFERENCES public.reservations(id);


--
-- TOC entry 4686 (class 2606 OID 24639)
-- Name: reviews FKryv9ovxoh6df2nlc5a5uog2ve; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "FKryv9ovxoh6df2nlc5a5uog2ve" FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2024-06-06 18:24:49

--
-- PostgreSQL database dump complete
--

