import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'egresoconceptosDataFilter'
})
export class EgresoconceptosFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idegresoconceptos.indexOf(query) > -1);
        }
        return array;
    }
}
