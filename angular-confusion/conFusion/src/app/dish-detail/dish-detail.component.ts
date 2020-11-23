import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';

@Component({
    selector: 'app-dish-detail',
    templateUrl: './dish-detail.component.html',
    styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

    dish: Dish;
    dishIds: string[];
    prev: string;
    next: string;
    commentForm: FormGroup;
    commentPreview: Comment;
    @ViewChild('fform') commentFormDirective;
    formErrors = {
        'author': '',
        'comment': ''
    };
    validationMessages = {
        'author': {
            'required': 'Author Name is required.',
            'minlength': 'Author Name must be at least 2 characters long.'
        },
        'comment': {
            'required': 'Comment is required.'
        }
    };

    constructor(
        private dishService: DishService,
        private route: ActivatedRoute,
        private location: Location,
        private fb: FormBuilder,
        @Inject('baseURL') public baseURL) {
        this.createForm();
    }

    ngOnInit(): void {
        this.dishService.getDishIds()
            .subscribe(dishIds => this.dishIds = dishIds);
        this.route.params
            .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
            .subscribe(dish => {
                this.dish = dish;
                this.setPrevNext(dish.id);
            });
    }

    public setPrevNext(dishId: string): void {
        const index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

    public goBack(): void {
        this.location.back();
    }

    private createForm(): void {
        this.commentForm = this.fb.group({
            author: ['', [Validators.required, Validators.minLength(2)]],
            rating: 5,
            comment: ['', Validators.required],
        });

        this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set form validation messages.
    }

    private onValueChanged(data?: any): void {
        if (!this.commentForm) { return; }
        const form = this.commentForm;
        if (form.valid) {
            // The comment preview is shown only when the information in the form is valid.
            this.commentPreview = form.value;
            return;
        }
        this.commentPreview = null;
        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }

    public onSubmit(): void {
        let comment: Comment = this.commentForm.value;
        comment.date = new Date().toISOString();
        this.dish.comments.push(comment);
        this.commentPreview = null;
        this.commentFormDirective.resetForm(); // Back to its pristine state.
        this.commentForm.reset({
            author: '',
            rating: 5,
            message: ''
        });
    }
}
