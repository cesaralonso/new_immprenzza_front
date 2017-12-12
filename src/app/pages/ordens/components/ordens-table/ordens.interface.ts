export interface OrdensInterface {
   idorden?: number;
   factura?: boolean;
   fecha?: string;
   status_avance?: string;
   status_pago?: string;
   subtotal?: number;
   total?: number;
   iva?: number;
   deuda?: number;
   f_limite?: string;
   cliente_idcliente?: number;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}
