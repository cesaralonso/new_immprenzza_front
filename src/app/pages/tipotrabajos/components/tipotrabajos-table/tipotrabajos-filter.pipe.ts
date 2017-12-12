import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'tipotrabajosDataFilter'
})
export class TipotrabajosFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idtipotrabajos.indexOf(query) > -1);
        }
        return array;
    }
}
