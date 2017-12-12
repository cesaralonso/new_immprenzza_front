import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'si_usersDataFilter'
})
export class Si_usersFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idsi_users.indexOf(query) > -1);
        }
        return array;
    }
}
