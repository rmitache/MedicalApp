import * as CLOs from 'SPA/DomainModel/clo-exports';
import * as Enums from 'SPA/DomainModel/enum-exports';

export interface IMedicineTypesSearchService {
	GetMedicineTypeByName(name: string): CLOs.MedicineTypeCLO;
	Search(searchString: string): string[];
}