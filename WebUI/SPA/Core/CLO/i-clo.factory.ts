import * as DataStructures from 'SPA/Core/Helpers/DataStructures/data-structures';
import { BaseCLO } from 'SPA/Core/CLO/base.clo';

export interface IType<T> extends Function {
    prototype: T;
}
export interface ICLOFactory<T> {
    // Conversion to CLO
    Convert_ToCLO(blo: Object): T;
    Convert_ToCloList(bloArray: Object[]): DataStructures.List<T>;

    // Conversion to BLO - not necessary as it is handled automatically by simply calling 


    // Creation
    Create_DefaultCLO(): T;
    //Create_FromParams(...params: any[]): T;

    // Cloning
    Clone_CLOAsNewBLO(clo: T): T
    //Clone_CloList(cloList: T[]): DataStructures.List<T>;
}

