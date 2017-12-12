import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'permisosDataFilter'
})
export class PermisosFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idpermisos.indexOf(query) > -1);
        }
        return array;
    }
}
