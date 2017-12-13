export interface TrabajosInterface {
   idtrabajo?: number;
   cantidad?: number;
   archivo?: string;
   foto?: string;
   f_entregaesperada?: string;
   f_entregareal?: string;
   status?: string;
   especificaciones?: string;
   f_recibe?: string;
   total?: number;
   personal_idpersonal?: number;
   tipotrabajo_idtipotrabajo?: number;
   orden_idorden?: number;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}
