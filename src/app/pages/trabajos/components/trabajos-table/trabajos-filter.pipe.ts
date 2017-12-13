import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'trabajosDataFilter'
})
export class TrabajosFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idtrabajos.indexOf(query) > -1);
        }
        return array;
    }
}
