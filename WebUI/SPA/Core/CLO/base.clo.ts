export abstract class BaseCLO {
    public GetTypeName(): string {
        return this.constructor.name;
    }
}