import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'rolsDataFilter'
})
export class RolsFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idrols.indexOf(query) > -1);
        }
        return array;
    }
}
