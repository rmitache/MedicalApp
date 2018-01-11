import * as Comparers from 'SPA/Core/Helpers/Comparers/comparers';

export class List<T> {

    // Private fields
    protected innerArray: Array<T>;

    // Constructor
    constructor() {
        this.innerArray = [];
    }

    // Public methods
    public ReplaceInnerArray(innerArray: T[]): void {
        this.innerArray = innerArray;
    }
    public Length(): number {
        return this.innerArray.length;
    }
    public ToArray(): T[] {
        return this.innerArray;
    }
    public Add(clo: T): void {
        this.innerArray.push(clo);
    }
    public Insert(clo: T): void {
        this.innerArray.unshift(clo);
    }
    public RemoveAt(index: number): void {
        this.innerArray.splice(index, 1);
    }
    public ReplaceAt(clo: T, index: number) {
        this.innerArray.splice(index, 1, clo);
    }
    public GetAt(index: number): T {
        return this.innerArray[index];
    }
    public Clear(): void {
        this.innerArray = [];
    }
    public IsEmpty(): boolean {
        return this.Length() < 1;
    }
    public Remove(clo: T, comparer?: Comparers.IEqualityComparer<T>): void {

        let index: number = this.FindIndex(clo, comparer);
        if (index !== -1) {
            this.innerArray.splice(index, 1);
        }
    }
    public FindIndex(clo: T, comparer?: Comparers.IEqualityComparer<T>): number {
        let index: number;
        if (comparer) {
            // Check by using a defined comparer
            index = this.innerArray.findIndex((innerCLO) => {
                return comparer.Equals(clo, innerCLO);
            });
        }
        else {
            // Check by instance
            index = this.innerArray.findIndex((innerCLO) => {
                return innerCLO === clo;
            });
        }

        return index;
    }
}