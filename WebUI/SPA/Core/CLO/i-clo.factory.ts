import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';

export interface IType<T> extends Function {
    prototype: T;
}
export interface ICLOFactory<T> {
    // Conversion to CLO
    Convert_ToCLO(blo: Object): T;
    Convert_ToCloList(bloArray: Object[]): DataStructures.List<T>;

    // Creation
    Create_DefaultCLO(): T;
    //Create_FromParams(...params: any[]): T;

    // Cloning
    //Clone_CLO(clo: T): T
    //Clone_CloList(cloList: T[]): DataStructures.List<T>;
}

