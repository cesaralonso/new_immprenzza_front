import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'si_permisosDataFilter'
})
export class Si_permisosFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idsi_permisos.indexOf(query) > -1);
        }
        return array;
    }
}
