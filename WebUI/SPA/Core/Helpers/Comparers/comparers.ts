export interface IEqualityComparer<T> {
    Equals(x: T, y: T): boolean;
}
