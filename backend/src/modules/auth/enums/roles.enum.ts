export enum UserRole {
  ADMIN = 'administrador',
  SELLER = 'vendedor',
  SUPERVISOR = 'supervisor',
  CASHIER = 'cajero',
  CLIENT = 'cliente'
}

// Permisos disponibles en el sistema
export enum Permission {
  // Usuarios
  CREATE_USER = 'crear_usuario',
  READ_USER = 'ver_usuario',
  UPDATE_USER = 'actualizar_usuario',
  DELETE_USER = 'eliminar_usuario',
  
  // Ventas
  CREATE_SALE = 'crear_venta',
  READ_SALE = 'ver_venta',
  UPDATE_SALE = 'actualizar_venta',
  DELETE_SALE = 'eliminar_venta',
  
  // Productos
  CREATE_PRODUCT = 'crear_producto',
  READ_PRODUCT = 'ver_producto',
  UPDATE_PRODUCT = 'actualizar_producto',
  DELETE_PRODUCT = 'eliminar_producto',
  
  // Reportes
  VIEW_REPORTS = 'ver_reportes',
  EXPORT_REPORTS = 'exportar_reportes',
  
  // Configuración
  MANAGE_SETTINGS = 'gestionar_configuracion'
}