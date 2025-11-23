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
 *         supplierId:
 *           type: integer
 *           description: ID do fornecedor associado ao produto.
 *           example: 1
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
 *           description: A data de criação do registro.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: A data da última atualização do registro.
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
 *         total:
 *           type: number
 *           format: float
 *           description: O valor total do pedido.
 *           example: 150000.00
 *         status:
 *           type: string
 *           description: O status atual do pedido.
 *           enum: [pending, paid, canceled]
 *           example: "pending"
 *         orderItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: A data de criação do registro.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: A data da última atualização do registro.
 *
 *     OrderItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID do item do pedido.
 *           example: 1
 *         product:
 *           $ref: '#/components/schemas/Product'
 *
 *     CartItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID do item no carrinho.
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: A data de criação do registro.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: A data da última atualização do registro.
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
 *     CreateProductRequest:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - trade
 *         - model
 *         - specifications
 *         - thumb
 *         - year
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *        supplierId:
 *          type: integer
 *          description: ID do fornecedor associado ao produto.
 *         trade:
 *           type: string
 *         model:
 *           type: string
 *         specifications:
 *           type: array
 *           items:
 *             type: string
 *         thumb:
 *           type: string
 *           format: url
 *         year:
 *           type: string
 *           format: date
 *
 *     UpdateProductRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *        supplierId:
 *          type: integer
 *          description: ID do fornecedor associado ao produto.
 *         trade:
 *           type: string
 *         model:
 *           type: string
 *         specifications:
 *           type: array
 *           items:
 *             type: string
 *         thumb:
 *           type: string
 *           format: url
 *         year:
 *           type: string
 *           format: date
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
void 0;
