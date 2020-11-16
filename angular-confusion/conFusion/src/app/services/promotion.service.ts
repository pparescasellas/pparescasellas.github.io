import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {

    constructor() { }

    public getPromotions(): Promise<Promotion[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(PROMOTIONS), 2000);
        });
    }

    public getPromotion(id: string): Promise<Promotion> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
        });
    }

    public getFeaturedPromotion(): Promise<Promotion> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
        });
    }
}
