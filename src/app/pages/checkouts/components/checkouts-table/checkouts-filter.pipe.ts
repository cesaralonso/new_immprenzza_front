import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'checkoutsDataFilter'
})
export class CheckoutsFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idcheckouts.indexOf(query) > -1);
        }
        return array;
    }
}
