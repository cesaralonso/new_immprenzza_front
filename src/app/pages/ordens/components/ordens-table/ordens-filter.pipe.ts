import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'ordensDataFilter'
})
export class OrdensFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idordens.indexOf(query) > -1);
        }
        return array;
    }
}
