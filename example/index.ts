import { GplFilter, LGQuery } from "../dist";
import { User } from "./graphqlgen";

// GET
const getQuery = LGQuery.from<User>('user')
					.orderByAscending('name')
					.select('id', 'name')
					.include('permissions', q => q.select('id', 'name'));
					
console.log('GET Query', getQuery.build());


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