import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'si_modulosDataFilter'
})
export class Si_modulosFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idsi_modulos.indexOf(query) > -1);
        }
        return array;
    }
}
