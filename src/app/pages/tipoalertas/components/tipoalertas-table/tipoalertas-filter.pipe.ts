import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'tipoalertasDataFilter'
})
export class TipoalertasFilterPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.idtipoalertas.indexOf(query) > -1);
        }
        return array;
    }
}
