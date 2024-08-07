// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.174.0
//   protoc               v5.26.1
// source: proto/orders.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "orders";

export interface OrdersDto {
  symbol: string;
  leverage: number;
  quantity: number;
  timeframe: string;
  type: string;
  ema?: number | undefined;
  userId: string;
}

export interface OrderResponse {
  statusCode: number;
  message: string;
}

export const ORDERS_PACKAGE_NAME = "orders";

export interface OrdersServiceClient {
  createOrder(request: OrdersDto): Observable<OrderResponse>;
}

export interface OrdersServiceController {
  createOrder(request: OrdersDto): Promise<OrderResponse> | Observable<OrderResponse> | OrderResponse;
}

export function OrdersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrdersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrdersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDERS_SERVICE_NAME = "OrdersService";
