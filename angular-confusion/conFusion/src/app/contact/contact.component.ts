import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    feedbackForm: FormGroup;
    feedback: Feedback;
    contactType = ContactType;
    @ViewChild('fform') feedbackFormDirective;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit(): void {
    }

    private createForm(): void {
        this.feedbackForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            telnum: [0, Validators.required],
            email: ['', Validators.required],
            agree: false,
            contacttype: ContactType[0],
            message: ''
        });
    }

    public onSubmit(): void {
        this.feedback = this.feedbackForm.value;
        console.log(this.feedback);
        this.feedbackForm.reset({
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contacttype: ContactType[0],
            message: ''
        });
        this.feedbackFormDirective.resetForm(); // Back to its pristine state.
    }
}
