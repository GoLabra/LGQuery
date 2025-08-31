import { GplFilter, LGQuery } from "../dist";
import { User, Event } from "./graphqlgen";

// GET
const getQuery = LGQuery.from<User>('user')
					.orderByAscending('name')
					.select('id', 'name')
					.include('permissions', q => q.select('id', 'name'));
					
console.log('GET Query', getQuery.build());

// GET CONNECTION
const getConnectionQuery = LGQuery
  .fromConnection<User>('user')
  .orderByAscending('name')
  .select('id', 'name')
  .include('permissions', q => q.select('id', 'name'));

console.log('GET Connection Query:', getQuery.build());


// CREATE
const createQuery = LGQuery.create<User>('user', {name: 'labra'})
					.select('id');
					
console.log('CREATE Query', createQuery.build());


// UPDATE
const updateQuery = LGQuery.update<User>('user', {name: 'labra'})
							.where(GplFilter.field('id', '', '123'))
							.select('id', 'name');
					
console.log('UPDATE Query', updateQuery.build());

// DELETE
const deleteQuery = LGQuery.deleteFrom<User>('user')
					.where(GplFilter.field('id', '', '123'))
					.select('id');
					
console.log('DELETE Query', deleteQuery.build());

// GENERIC
const genericQuery = LGQuery.generic<Event>('events')
					.select('id', 'title', 'description')
					.include('registrations', q => q.select('id'))
					.where({
						start: {
							type: 'DateTime',
							required: true,
							value: "2025-09-01T00:00:00.000"
						},
						end: {
							type: 'DateTime',
							required: true,
							value: "2025-09-30T23:59:59.999"
						}
					});

console.log('GENERIC Query', genericQuery.build());