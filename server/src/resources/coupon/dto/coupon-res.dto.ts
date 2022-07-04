import { CouponStatus, CouponType } from "constant";
import { Coupon, ICouponConstraint, ICouponQuantity } from "../entities/coupon.entity";

export class CouponResponse {
    id: string;
    name: string;
    code: string;
    type: CouponType;
    quantity: ICouponQuantity;
    status: CouponStatus;
    constraints: ICouponConstraint[];
    startDate: Date;
    endDate: Date;
    description?: string;
    updatedAt: Date;
    createdAt: Date;

    constructor(item: Coupon) {
        this.id = item.id as string;
        this.name = item.name;
        this.code = item.code;
        this.type = item.type;
        this.status = item.status;
        this.quantity = item.quantity;
        this.constraints = item.constraints;
        this.startDate = item.startDate;
        this.endDate = item.endDate;
        this.updatedAt = item.updatedAt;
        this.createdAt = item.createdAt;

        if (item.description) {
            this.description = item.description;
        }
    }
}
