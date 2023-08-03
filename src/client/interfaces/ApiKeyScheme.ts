export interface ApiKeyScheme {
    key: string;
    name: string;
    in: 'header' | 'query' | 'cookie';
}
