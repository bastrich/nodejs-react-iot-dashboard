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
    ip inet NOT NULL,
    mac macaddr NOT NULL,
    active boolean NOT NULL,
    management_attributes jsonb NOT NULL,
    monitoring_attributes jsonb NOT NULL
);