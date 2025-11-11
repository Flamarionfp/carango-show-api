/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID do produto.
 *           example: 1
 *         name:
 *           type: string
 *           description: O nome do produto.
 *           example: "Carro XYZ"
 *         price:
 *           type: number
 *           format: float
 *           description: O preço do produto.
 *           example: 50000.00
 *         trade:
 *           type: string
 *           description: A marca do produto.
 *           example: "Marca Famosa"
 *         model:
 *           type: string
 *           description: O modelo do produto.
 *           example: "Modelo 2024"
 *         specifications:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de especificações do produto.
 *           example: ["Motor 2.0", "4 portas", "Ar condicionado"]
 *         thumb:
 *           type: string
 *           format: url
 *           description: URL da imagem de thumbnail do produto.
 *           example: "http://example.com/thumb.jpg"
 *         year:
 *           type: string
 *           format: date
 *           description: O ano de fabricação do produto.
 *           example: "2024-01-01"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: A data de criação do registro.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: A data da última atualização do registro.
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID do usuário.
 *           example: 1
 *         name:
 *           type: string
 *           description: O nome do usuário.
 *           example: "João da Silva"
 *         email:
 *           type: string
 *           format: email
 *           description: O email do usuário.
 *           example: "joao.silva@example.com"
 *         role:
 *           type: string
 *           enum: [admin, customer]
 *           description: O papel do usuário no sistema.
 *           example: "customer"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     UserResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID do pedido.
 *           example: 101
 *         userId:
 *           type: integer
 *           description: O ID do usuário que fez o pedido.
 *           example: 1
 *         totalAmount:
 *           type: number
 *           format: float
 *           description: O valor total do pedido.
 *           example: 150000.00
 *         status:
 *           type: string
 *           description: O status atual do pedido.
 *           example: "pending"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     OrderItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID do item do pedido.
 *         productId:
 *           type: integer
 *           description: O ID do produto associado.
 *         productName:
 *           type: string
 *           description: O nome do produto no momento da compra.
 *         price:
 *           type: number
 *           format: float
 *           description: O preço do produto no momento da compra.
 *         productTrade:
 *           type: string
 *         productModel:
 *           type: string
 *         productYear:
 *           type: string
 *         productSpecifications:
 *           type: array
 *           items:
 *             type: string
 *         productThumb:
 *           type: string
 *           format: url
 *
 *     CartItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     AuthRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Token JWT para autenticação.
 *
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         role:
 *           type: string
 *           enum: [admin, customer]
 *
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         role:
 *           type: string
 *           enum: [admin, customer]
 *
 *     Pagination:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 *         total:
 *           type: integer
 *           example: 42
 *
 *     PaginatedOrders:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
 *         pagination:
 *           $ref: '#/components/schemas/Pagination'
 *
 *     PaginatedProducts:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         pagination:
 *           $ref: '#/components/schemas/Pagination'
 *
 *     Supplier:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: O ID do fornecedor.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           description: O nome do fornecedor.
 *           example: "Fornecedor XYZ"
 *         email:
 *           type: string
 *           format: email
 *           description: O email do fornecedor.
 *           example: "contato@fornecedor.com"
 *         phone:
 *           type: string
 *           description: O telefone do fornecedor.
 *           example: "(11) 98765-4321"
 *
 *     CreateSupplierRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *
 *     UpdateSupplierRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *
 *     PaginatedSuppliers:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Supplier'
 *         pagination:
 *           $ref: '#/components/schemas/Pagination'
 *
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-api-key
 */
