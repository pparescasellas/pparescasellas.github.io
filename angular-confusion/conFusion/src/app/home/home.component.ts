import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    dish: Dish;
    promotion: Promotion;
    leader: Leader;

    constructor(private dishService: DishService, private promotionService: PromotionService, private leaderService: LeaderService) { }

    ngOnInit(): void {
        this.dishService.getFeaturedDish().subscribe((featuredDish) => this.dish = featuredDish);
        this.promotionService.getFeaturedPromotion().subscribe((featuredPromotion) => this.promotion = featuredPromotion);
        this.leaderService.getFeaturedLeader().subscribe((featuredLeader) => this.leader = featuredLeader);
    }
}
