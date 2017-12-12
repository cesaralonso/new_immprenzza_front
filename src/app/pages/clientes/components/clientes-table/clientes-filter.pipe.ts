import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'clientesDataFilter'
})
export class ClientesFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idclientes.indexOf(query) > -1);
        }
        return array;
    }
}
