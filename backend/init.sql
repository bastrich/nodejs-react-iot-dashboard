CREATE TYPE device_type AS ENUM(
    'BULB',
    'RADIATOR',
    'TV',
    'FRIDGE',
    'KETTLE'
);

CREATE TABLE devices (
    id bigserial PRIMARY KEY,
    name text NOT NULL,
    type device_type NOT NULL,
    ip inet,
    mac macaddr8,
    active boolean NOT NULL,
    attributes jsonb
);