import { pascalCase } from "change-case";
import { EntityBaseType, FieldRequest, GplFilter, ILGQuery, Maybe, ObjectKeys, Unarray } from "./types";
import { LGSelectInclude } from "./LGSelectInclude";
import IQueryBuilderOptions from "gql-query-builder/build/IQueryBuilderOptions";
import Fields from "gql-query-builder/build/Fields";
import * as gqlBuilder from 'gql-query-builder'
import pluralize from "pluralize";
import VariableOptions from "gql-query-builder/build/VariableOptions";

export class LGGeneric<T extends EntityBaseType> implements ILGQuery {

	public readonly isMutation = true;

	private readonly _field: string;
	private readonly _select: FieldRequest<T>[] = [];
	private readonly _filter?: VariableOptions;

	private constructor(operation: string, fields: FieldRequest<T>[], filter?: VariableOptions) {
		this._field = operation;
		this._select = fields;
		this._filter = filter;
	}

	public getOperationName = (): string => {
		return this._field;
	}


	public select = (...fields: FieldRequest<T>[]) => {
		return new LGGeneric<T>(this._field, [...this._select, ...fields]);
	};

	public where = (filter: VariableOptions) => {
		return new LGGeneric<T>(this._field, this._select, filter);
	};

	public include<K extends keyof T>(
		key: K extends keyof T ? T[K] extends Maybe<object> ? K : never : never,
		builder: (query: LGSelectInclude<NonNullable<Unarray<T[K]>>>) => LGSelectInclude<NonNullable<Unarray<T[K]>>>
	): LGGeneric<T> {
		const nestedFields = builder(LGSelectInclude.from<NonNullable<Unarray<T[K]>>>(key as string));
		return new LGGeneric(this._field, [...this._select, nestedFields], this._filter);
	}
		
	public buildOptions = (): IQueryBuilderOptions => {

		const operation = this.getOperationName();

		// compute fields
		const fields = this._select.reduce((acc, field) => {
			if(field instanceof LGSelectInclude){
				return acc.concat(field.getField());
			}
			if(typeof field === 'string'){
				acc.push(field);
			}
			return acc;
		}, [] as Fields);

		const queryOptions = {
			operation,
			fields,
			variables: this._filter
		};

		return queryOptions;
	}

	public build = (): { query: string, variables: Record<string, any> } => {
		const queryOptions = this.buildOptions();
		return gqlBuilder.query(queryOptions);
	}

	public clone = (): LGGeneric<T> => {
		return new LGGeneric<T>(this._field, [...this._select], {...this._filter ?? {}});
	}

	public getResultData = (response: any) => {
		if(!response){
			return null;
		}
		
		const fieldName = this.getOperationName();
		return response[fieldName];
	}

	public static from = <T extends EntityBaseType = any>(entityName: string) => {
		return new LGGeneric<T>(entityName, []);
	};
}