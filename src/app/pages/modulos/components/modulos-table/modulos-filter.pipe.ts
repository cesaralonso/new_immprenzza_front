import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'modulosDataFilter'
})
export class ModulosFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idmodulos.indexOf(query) > -1);
        }
        return array;
    }
}
