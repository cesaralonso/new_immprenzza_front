import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'personasDataFilter'
})
export class PersonasFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idpersonas.indexOf(query) > -1);
        }
        return array;
    }
}
