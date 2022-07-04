import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsDefined, IsEnum, IsInt, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, Length, ValidateNested } from "class-validator";
import { CouponStatus, CouponType } from "constant";

export class CreateCouponQuantityRequest {
    @IsOptional()
    @IsInt()
    number?: number;

    @IsNotEmpty()
    @IsBoolean()
    isLimited: boolean;
}

export class CreateCouponConstraintValueRequest {
    @IsNotEmpty()
    @IsInt()
    number: number;

    @IsNotEmpty()
    @IsBoolean()
    isPercentage: boolean;

    @IsOptional()
    @IsInt()
    maxValueReduce?: number
}

export class CreateCouponConstraintRequest {
    @IsNotEmpty()
    @IsInt()
    minValue: number;

    @IsNotEmpty()
    @IsInt()
    maxValue: number;

    @IsNotEmpty()
    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateCouponConstraintValueRequest)
    value: CreateCouponConstraintValueRequest
}

export class CreateCouponRequest {
    @IsNotEmpty()
    @Length(1, 255)
    name: string;

    @IsNotEmpty()
    @Length(1, 255)
    code: string;

    @IsNotEmpty()
    @IsEnum(CouponType)
    type: CouponType;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCouponConstraintRequest)
    constraints: CreateCouponConstraintRequest[];

    @IsNotEmpty()
    @IsDateString()
    startDate: Date;

    @IsNotEmpty()
    @IsDateString()
    endDate: Date;

    @IsNotEmpty()
    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateCouponQuantityRequest)
    quantity: CreateCouponQuantityRequest;

    @IsOptional()
    @IsEnum(CouponStatus)
    status?: CouponStatus
}

export class UpdateCouponRequest {
    @IsOptional()
    @Length(1, 255)
    name: string;

    @IsOptional()
    @Length(1, 255)
    code: string;

    @IsOptional()
    @IsEnum(CouponType)
    type: CouponType;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCouponConstraintRequest)
    constraints: CreateCouponConstraintRequest[];

    @IsOptional()
    @IsDateString()
    startDate: Date;

    @IsOptional()
    @IsDateString()
    endDate: Date;

    @IsOptional()
    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateCouponQuantityRequest)
    quantity: CreateCouponQuantityRequest;

    @IsOptional()
    @IsEnum(CouponStatus)
    status?: CouponStatus
}


export class FilterCouponQuery {
    @IsOptional()
    statuses?: string
}
