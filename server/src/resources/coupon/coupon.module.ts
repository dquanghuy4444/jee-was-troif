import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, CouponSchema } from './entities/coupon.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Coupon.name, schema: CouponSchema },
        ])
    ],
    controllers: [CouponController],
    providers: [CouponService]
})
export class CouponModule { }
