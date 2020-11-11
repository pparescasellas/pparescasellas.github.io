import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {

    constructor() { }

    public getPromotions(): Promotion[] {
        return PROMOTIONS;
    }

    public getPromotion(id: string): Promotion {
        return PROMOTIONS.filter((promo) => (promo.id === id))[0];
    }

    public getFeaturedPromotion(): Promotion {
        return PROMOTIONS.filter((promotion) => promotion.featured)[0];
    }
}
