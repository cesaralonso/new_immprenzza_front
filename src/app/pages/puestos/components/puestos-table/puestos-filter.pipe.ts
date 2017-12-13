import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'puestosDataFilter'
})
export class PuestosFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idpuestos.indexOf(query) > -1);
        }
        return array;
    }
}
