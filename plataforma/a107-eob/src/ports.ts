/** Compatível com clientes pg sem impor dependência na compilação TypeScript. */
export interface QueryResult<T=Record<string,unknown>> { rows: T[]; rowCount: number | null }
export interface SqlClient { query<T=Record<string,unknown>>(sql:string,values?:readonly unknown[]):Promise<QueryResult<T>>; release?():void }
export interface SqlPool { connect():Promise<SqlClient> }
