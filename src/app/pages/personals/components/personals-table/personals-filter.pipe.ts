import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'personalsDataFilter'
})
export class PersonalsFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idpersonals.indexOf(query) > -1);
        }
        return array;
    }
}
