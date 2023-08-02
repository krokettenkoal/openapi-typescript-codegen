export interface OperationApiKey {
    key: string;
    name: string;
    in: 'header' | 'query' | 'cookie';
}
