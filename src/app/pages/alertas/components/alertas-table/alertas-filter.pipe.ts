import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'alertasDataFilter'
})
export class AlertasFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idalertas.indexOf(query) > -1);
        }
        return array;
    }
}
