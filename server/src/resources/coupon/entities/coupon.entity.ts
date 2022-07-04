import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CouponStatus, CouponType } from 'constant';
import { Document } from 'mongoose';

export interface ICouponConstraintValue {
    number: number;
    isPercentage: boolean;
    maxValueReduce?: number
}

export interface ICouponConstraint {
    minValue: number;
    maxValue: number;
    value: ICouponConstraintValue
}

export interface ICouponQuantity {
    number?: number;
    isLimited: boolean;
}

@Schema({ timestamps: true })
export class Coupon extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    code: string

    @Prop({ required: true })
    type: CouponType

    @Prop({ required: true, type: Object })
    quantity: ICouponQuantity

    @Prop({ required: true })
    startDate: Date

    @Prop({ required: true })
    endDate: Date

    @Prop({ required: true })
    constraints: ICouponConstraint[]

    @Prop({ required: true, default: CouponStatus.ACTIVE })
    status: CouponStatus

    @Prop()
    description?: string

    @Prop()
    updatedAt: Date;

    @Prop()
    createdAt: Date;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);


