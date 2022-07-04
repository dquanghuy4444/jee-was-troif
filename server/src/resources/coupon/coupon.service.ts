import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CouponStatus, ERROR_MESSENGER_CODE_COUPON_EXISTS, ERROR_MESSENGER_LOST_ITEM, ERROR_MESSENGER_NAME_COUPON_EXISTS } from 'constant';
import { DefaultListDataResponse, IPaginationParams, PaginationDataResponse } from 'dtos/pagination.dto';
import mongoose, { Model } from 'mongoose';
import { addPropertyToMatchByFilterString } from 'utils/add-property-to-match-by-filter-string';
import { CreateCouponRequest, FilterCouponQuery, UpdateCouponRequest } from './dto/coupon-req.dto';
import { CouponResponse } from './dto/coupon-res.dto';
import { Coupon } from './entities/coupon.entity';

@Injectable()
export class CouponService {
    constructor(
        @InjectModel(Coupon.name) private couponModel: Model<Coupon>
    ) { }


    async getPerPage(paginationParams: IPaginationParams, query: FilterCouponQuery): Promise<PaginationDataResponse<CouponResponse>> {
        const { page, limit } = paginationParams;

        const { statuses } = query

        const match: mongoose.FilterQuery<Coupon> = {}

        addPropertyToMatchByFilterString(statuses, (arr: string[]) => {
            match.status = {
                $in: arr
            }
        })

        const items = await this.couponModel.find(match).sort({ created_at: -1 }).skip((page - 1) * limit).limit(limit);

        const total = await this.couponModel.count()

        return new PaginationDataResponse<CouponResponse>(items.map(item => new CouponResponse(item)), total, page, limit)
    }

    async getMyItems(): Promise<DefaultListDataResponse<CouponResponse>> {
        const now = new Date();

        const items = await this.couponModel.find({
            status: CouponStatus.ACTIVE,
            startDate: {
                $lte: now
            },
            endDate: {
                $gte: now
            },
        })

        return new DefaultListDataResponse<CouponResponse>(items.map(item => new CouponResponse(item)))
    }

    async create(request: CreateCouponRequest): Promise<CouponResponse> {
        let item = await this.couponModel.findOne({ code: request.code })
        if (item) {
            throw new BadRequestException(ERROR_MESSENGER_CODE_COUPON_EXISTS);
        }
        item = await this.couponModel.findOne({ name: request.name })
        if (item) {
            throw new BadRequestException(ERROR_MESSENGER_NAME_COUPON_EXISTS);
        }

        const info = await this.couponModel.create(request)
        return new CouponResponse(info)
    }

    async update(id: string, request: UpdateCouponRequest): Promise<CouponResponse> {
        let item = await this.couponModel.findOne({ code: request.code })
        if (item) {
            throw new BadRequestException(ERROR_MESSENGER_CODE_COUPON_EXISTS);
        }

        item = await this.couponModel.findOne({ code: request.code })
        if (item) {
            throw new BadRequestException(ERROR_MESSENGER_CODE_COUPON_EXISTS);
        }
        item = await this.couponModel.findOne({ name: request.name })
        if (item) {
            throw new BadRequestException(ERROR_MESSENGER_NAME_COUPON_EXISTS);
        }

        item = await this.couponModel.findById(id)
        if (!item) {
            throw new BadRequestException(ERROR_MESSENGER_LOST_ITEM);
        }

        await item.update(request)

        return new CouponResponse(item)
    }

    async delete(id: string): Promise<void> {
        try {
            await this.couponModel.findByIdAndUpdate(id, { status: CouponStatus.DELETED })
        } catch (error) {
            throw new BadRequestException(ERROR_MESSENGER_LOST_ITEM);
        }
    }
}
