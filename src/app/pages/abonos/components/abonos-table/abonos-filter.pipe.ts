import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'abonosDataFilter'
})
export class AbonosFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idabonos.indexOf(query) > -1);
        }
        return array;
    }
}
