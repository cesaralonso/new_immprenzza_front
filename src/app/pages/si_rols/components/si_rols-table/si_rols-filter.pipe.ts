import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'si_rolsDataFilter'
})
export class Si_rolsFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idsi_rols.indexOf(query) > -1);
        }
        return array;
    }
}
