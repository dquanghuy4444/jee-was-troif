import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { ROUTER_COUPON } from 'configs/router';
import { CouponService } from './coupon.service';
import { Roles } from 'decorators/roles.decorator';
import { Role } from 'constant';
import { DefaultListDataResponse, IPaginationParams, PaginationDataResponse } from 'dtos/pagination.dto';
import { CreateCouponRequest, FilterCouponQuery, UpdateCouponRequest } from './dto/coupon-req.dto';
import { CouponResponse } from './dto/coupon-res.dto';
import { Pagination } from 'decorators/pagination.decorator';

@Controller(ROUTER_COUPON)
export class CouponController {
    constructor(private readonly couponService: CouponService) { }

    @Roles(Role.ADMIN)
    @Get()
    getPerPage(@Pagination() paginationParams: IPaginationParams, @Query() query: FilterCouponQuery): Promise<PaginationDataResponse<CouponResponse>> {
        return this.couponService.getPerPage(paginationParams, query);
    }

    @Roles(Role.ADMIN, Role.USER)
    @Get("me")
    getMyItems(): Promise<DefaultListDataResponse<CouponResponse>> {
        return this.couponService.getMyItems();
    }

    @Roles(Role.ADMIN)
    @Post()
    create(@Body() request: CreateCouponRequest): Promise<CouponResponse> {
        return this.couponService.create(request);
    }

    @Roles(Role.ADMIN)
    @Put(":id")
    update(@Param("id") id: string, @Body() request: UpdateCouponRequest): Promise<CouponResponse> {
        return this.couponService.update(id, request);
    }

    @Roles(Role.ADMIN)
    @Delete(":id")
    delete(@Param("id") id: string): Promise<void> {
        return this.couponService.delete(id);
    }
}
