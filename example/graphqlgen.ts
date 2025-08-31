// Example data model
import { Maybe } from "../dist";

export type Permission = {
	id: string;
	name: string;
	role: {
		id: string;
		name: string;
	};
};

export type User = {
	id: string;
	name: string;
	permissions?: Maybe<Permission[]>;
	testProp: string;
};

export type EventRegistrations = {
	id: string;
};

export type Event = {
	id: string;
	title: string;
	description?: string;
	registrations?: Maybe<EventRegistrations[]>;
};

