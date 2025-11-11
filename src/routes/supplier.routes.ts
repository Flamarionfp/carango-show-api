import { Router } from "express";
import {
  makeCreateSupplierController,
  makeDeleteSupplierController,
  makeGetSupplierController,
  makeListSupplierController,
  makeUpdateSupplierController,
} from "../controllers/suppliers";
import { checkRoleMiddleware } from "../middlewares/check-role-middleware";
import { makeAuthMiddleware } from "../middlewares/auth-middleware";

const supplierRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Gerenciamento de fornecedores
 */

const configureSupplierRoutes = async () => {
  const authMiddleware = await makeAuthMiddleware();
  supplierRouter.use(authMiddleware.handle);

  const createSupplierController = await makeCreateSupplierController();

  /**
   * @swagger
   * /supplier:
   *   post:
   *     summary: Cria um novo fornecedor (Apenas Admins)
   *     tags: [Suppliers]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateSupplierRequest'
   *     responses:
   *       201:
   *         description: Fornecedor criado com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Supplier'
   *       400:
   *         description: Dados inválidos ou fornecedor já existente.
   *       403:
   *         description: Acesso negado.
   */
  supplierRouter.post(
    "/",
    checkRoleMiddleware.admin,
    createSupplierController.handle
  );

  const listSuppliersController = await makeListSupplierController();

  /**
   * @swagger
   * /supplier:
   *   get:
   *     summary: Lista todos os fornecedores (com paginação)
   *     tags: [Suppliers]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           example: 1
   *         description: Número da página
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           example: 10
   *         description: Quantidade de itens por página
   *     responses:
   *       200:
   *         description: Lista paginada de fornecedores
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PaginatedSuppliers'
   */
  supplierRouter.get("/", listSuppliersController.handle);

  const getSupplierController = await makeGetSupplierController();

  /**
   * @swagger
   * /supplier/{id}:
   *   get:
   *     summary: Busca um fornecedor pelo ID
   *     tags: [Suppliers]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do fornecedor.
   *     responses:
   *       200:
   *         description: Detalhes do fornecedor.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Supplier'
   *       404:
   *         description: Fornecedor não encontrado.
   */
  supplierRouter.get("/:id", getSupplierController.handle);

  const updateSupplierController = await makeUpdateSupplierController();

  /**
   * @swagger
   * /supplier/{id}:
   *   put:
   *     summary: Atualiza um fornecedor (Apenas Admins)
   *     tags: [Suppliers]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do fornecedor a ser atualizado.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateSupplierRequest'
   *     responses:
   *       200:
   *         description: Fornecedor atualizado com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Supplier'
   *       400:
   *         description: Dados inválidos.
   *       403:
   *         description: Acesso negado.
   *       404:
   *         description: Fornecedor não encontrado.
   */
  supplierRouter.put(
    "/:id",
    checkRoleMiddleware.admin,
    updateSupplierController.handle
  );

  const deleteSupplierController = await makeDeleteSupplierController();

  /**
   * @swagger
   * /supplier/{id}:
   *   delete:
   *     summary: Deleta um fornecedor (Apenas Admins)
   *     tags: [Suppliers]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do fornecedor a ser deletado.
   *     responses:
   *       204:
   *         description: Fornecedor deletado com sucesso.
   *       403:
   *         description: Acesso negado.
   *       404:
   *         description: Fornecedor não encontrado.
   */
  supplierRouter.delete(
    "/:id",
    checkRoleMiddleware.admin,
    deleteSupplierController.handle
  );
};

configureSupplierRoutes();

export default supplierRouter;
