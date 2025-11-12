import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../core/http/http-status.enum";

export class HealthCheckController {
  handle = (_: Request, res: Response, next: NextFunction) => {
    try {
      res.status(HttpStatus.OK).send({ status: "UP" });
    } catch (error) {
      next(error);
    }
  };
}
